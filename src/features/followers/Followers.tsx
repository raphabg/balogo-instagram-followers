import React from 'react';
import { FollowersList } from '../../components/followersList/FollowersList';
import { useFollowersQuery } from '../../app/InstagramPrivateAPI';
import Cookies from 'universal-cookie';
import { Strings } from '../../constants';

export const Followers = () => {
	const cookies = new Cookies();

	const followers = useFollowersQuery(undefined);

	return (
		<FollowersList
			followers={[
				'raphabg_',
				'anamodolo',
				'neymar',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
				'mc pipokinha',
			]}
		/>
	);
};
