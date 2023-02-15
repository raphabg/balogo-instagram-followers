import React from 'react';
import { Follower } from '../follower/Follower';
import { Box } from '@mui/material';
import styles from './FollowersList.module.scss';
import { FollowerT } from '../../interfaces';

type Props = {
	followers: string[];
};

export const FollowersList = ({ followers }: Props) => {
	return (
		<Box display={'flex'} flexDirection={'column'} className={styles.followersList}>
			{followers.map((x, i) => (
				<Follower userName={x} key={x + i} />
			))}
		</Box>
	);
};
