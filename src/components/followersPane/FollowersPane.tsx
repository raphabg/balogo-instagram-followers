import { Box, useTheme } from '@mui/material';
import React from 'react';
import styles from './FollowersPane.module.scss';
import { SearchBox } from '../../features/searchbox/SearchBox';
import { Followers } from '../../features/followers/Followers';

export const FollowersPane = () => {
	const theme = useTheme();

	return (
		<Box
			display={'flex'}
			flexDirection={'column'}
			flexGrow={1}
			style={{ backgroundColor: `rgba(0,0,0,.7)` }}
			className={styles.followersPane}
		>
			<SearchBox />
			<Followers />
		</Box>
	);
};
