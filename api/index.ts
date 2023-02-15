import { APIErrors } from './../src/constants';
import { Express } from 'express';
import { APILoginTfaNeededResponse, FollowersAPIRequest, LoginAPIRequest } from './../src/interfaces';
import { Feed, IgApiClient, IgLoginTwoFactorRequiredError } from 'instagram-private-api';
import Bluebird from 'bluebird';
const { v4 } = require('uuid');
const express = require('express');

const app: Express = express();
app.use(express.json());

const ig = new IgApiClient();
ig.state.generateDevice(!process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'dev' : 'prod');

app.post('/api/login', async (req, res) => {
	const body = req.body as LoginAPIRequest;

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
		.catch(e => console.error('Login error', e, e.stack));

	if ((login as any).errorCode) {
		res.status(503).json(login);
	} else {
		res.json({ data: login, sid: await saveState() });
	}
});

app.post('/api/followers', async (req, res) => {
	const body = req.body as FollowersAPIRequest;
	res.status(401).json();
	// // await ig.state.deserialize(body.state);

	// const followersFeed = ig.feed.accountFollowers(ig.state.cookieUserId);
	// const followers = await getAllItemsFromFeed(followersFeed);

	// res.status(501).json({ data: followers });
});

async function getAllItemsFromFeed<T>(feed: Feed<any, T>): Promise<T[]> {
	let items: any = [];
	do {
		items = items.concat(await feed.items());
	} while (feed.isMoreAvailable());
	return items;
}

async function saveState(id?: string) {
	if (!id) id = v4();

	const serialized = await ig.state.serialize();
	delete serialized.constants;

	//TODO SAVE ON MONGODB

	return id;
}

async function retrieveState(id: string) {
	//TODO GET FROM MONGODB
}

module.exports = app;
