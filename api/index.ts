import { APIErrors, status } from './../src/constants';
import { Express } from 'express';
import { APILoginTfaNeededResponse, FollowersAPIRequest, LoginAPIRequest } from './../src/interfaces';
import { Feed, IgApiClient, IgLoginTwoFactorRequiredError } from 'instagram-private-api';
import Bluebird from 'bluebird';
import express from 'express';
import { MongoClient, ServerApiVersion, ObjectId, WithId, Document } from 'mongodb';

const app: Express = express();
app.use(express.json());

const ig = new IgApiClient();
ig.state.generateDevice(!process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'dev' : 'prod');

app.post('/api/login', async (req, res) => {
	const body = req.body as LoginAPIRequest;

	if (body.sid) {
		const state = await retrieveState(new ObjectId(body.sid));
		await ig.state.deserialize(state?.state);
	}

	const login = await Bluebird.try(() => ig.account.login(body.data.username, body.data.password))
		.catch(IgLoginTwoFactorRequiredError, async err => {
			const { username, totp_two_factor_on, two_factor_identifier } = err.response.body.two_factor_info;

			if (body.data.tfaCode === '') {
				const errorRes: APILoginTfaNeededResponse = {
					errorCode: APIErrors.TfaNeeded,
					data: {
						username: username,
						totp_two_factor_on: totp_two_factor_on,
						two_factor_identifier: two_factor_identifier,
					},
				};

				return errorRes;
			}

			const verificationMethod = totp_two_factor_on ? '0' : '1';
			return ig.account.twoFactorLogin({
				username,
				verificationCode: body.data.tfaCode,
				twoFactorIdentifier: two_factor_identifier,
				verificationMethod, // '1' = SMS (default), '0' = TOTP (google auth for example)
				trustThisDevice: '1', // Can be omitted as '1' is used by default
			});
		})
		.catch(e => {
			console.error('Login error', e, e?.stack);
			res.status(401).json();
		});

	if ((login as any).errorCode) {
		res.status(503).json(login);
	} else {
		res.json({ data: login, sid: await saveState() });
	}
});

app.post('/api/followers', async (req, res) => {
	try {
		const body = req.body as FollowersAPIRequest;

		const state = await retrieveState(new ObjectId(body.sid));
		await ig.state.deserialize(state?.state);

		const followersFeed = ig.feed.accountFollowers(ig.state.cookieUserId);
		const followers = await getAllItemsFromFeed(followersFeed);

		saveState(new ObjectId(body.sid));
		res.json({ data: followers });
	} catch (e: any) {
		console.error('Error fetching followers', e, e?.stack);
		res.status(401).json();
	}
});

app.post('/api/following', async (req, res) => {
	try {
		const body = req.body as FollowersAPIRequest;

		const state = await retrieveState(new ObjectId(body.sid));
		await ig.state.deserialize(state?.state);

		const followingFeed = ig.feed.accountFollowing(ig.state.cookieUserId);
		const followers = await getAllItemsFromFeed(followingFeed);

		saveState(new ObjectId(body.sid));
		res.json({ data: followers });
	} catch (e: any) {
		console.error('Error fetching followers', e, e?.stack);
		res.status(401).json();
	}
});

async function getAllItemsFromFeed<T>(feed: Feed<any, T>): Promise<T[]> {
	let items: any = [];

	while (feed.isMoreAvailable()) {
		const batch = await feed.items();

		items = items.concat(batch);
	}

	return items;
}

async function saveState(id?: ObjectId) {
	if (!id) {
		id = new ObjectId();
	}

	const serialized = await ig.state.serialize();
	delete serialized.constants;

	const client = connect();
	await client.connect();

	const collection = client.db('IAPI').collection('state');
	await collection.insertOne({ _id: id, state: serialized });
	await client.close();

	return id.toString();
}

async function retrieveState(id: ObjectId): Promise<WithId<Document> | null> {
	const client = connect();
	await client.connect();

	const collection = client.db('IAPI').collection('state');
	const obj = await collection.findOne({ _id: id });
	await client.close();

	return obj;
}

const connect = () => {
	const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/?retryWrites=true&w=majority`;

	const client = new MongoClient(uri, {
		serverApi: ServerApiVersion.v1,
	});

	return client;
};

module.exports = app;
