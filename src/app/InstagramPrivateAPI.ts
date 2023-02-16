import { MenuItemT } from './../constants';
import { LoginData, APILoginSuccessResponse, FollowerT } from './../interfaces';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCurrentDomain } from './helpers';
import Cookies from 'universal-cookie';
import { RootState } from './store';
import { Strings } from '../constants';

// Define a service using a base URL and expected endpoints
const baseQuery = fetchBaseQuery({ baseUrl: getCurrentDomain() + '/api' });

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
	args,
	api,
	extraOptions
) => {
	const cookies = new Cookies();
	const sid = cookies.get(Strings.sid);

	if (typeof args !== 'string') {
		(args as any).body.sid = sid;
	}

	let result = await baseQuery(args, api, extraOptions);

	if (result.error && result.error.status === 401) {
		const state = api.getState() as RootState;
		const refreshResult = await baseQuery(
			{ url: '/login', method: 'POST', body: { data: state.login.loginData } },
			api,
			extraOptions
		);

		const response = refreshResult.data as APILoginSuccessResponse;
		if (response?.sid) {
			const cookies = new Cookies();
			cookies.set(Strings.sid, response.sid, { secure: true, sameSite: true, maxAge: 2592000 });

			(args as any).body.sid = response.sid;

			result = await baseQuery(args, api, extraOptions);
		} else {
			console.log('action');
			api.dispatch({ type: Strings.Reset });
		}
	}
	return result;
};

export const InstagramPrivateAPI = createApi({
	reducerPath: 'InstagramPrivateAPI',
	baseQuery: baseQueryWithReauth,
	keepUnusedDataFor: 300,
	endpoints: builder => ({
		login: builder.query<APILoginSuccessResponse, LoginData | undefined>({
			query: data => {
				return { url: '/login', method: 'POST', body: { data: data } };
			},
		}),
		users: builder.query<FollowerT[], MenuItemT>({
			query: data => {
				return { url: '/followers', method: 'POST', body: { type: data } };
			},
			transformResponse: (res: any) => res.data,
		}),
	}),
});

export const { useLoginQuery, useLazyLoginQuery, useUsersQuery } = InstagramPrivateAPI;
