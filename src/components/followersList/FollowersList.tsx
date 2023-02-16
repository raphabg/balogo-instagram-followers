import { Box } from '@mui/material';
import styles from './FollowersList.module.scss';
import { useUsersQuery } from '../../app/InstagramPrivateAPI';
import { Follower } from '../follower/Follower';
import { MenuItemT } from '../../constants';

type Props = {
	selected: MenuItemT;
};

export const FollowersList = ({ selected }: Props) => {
	const { data, error, isLoading, isSuccess, isFetching } = useUsersQuery(selected);

	return (
		<Box display={'flex'} flexDirection={'column'} className={styles.followersList}>
			{isFetching
				? 'Fetching...'
				: isLoading
				? 'Loading...'
				: isSuccess
				? data.map((x, i) => <Follower userName={x.userName} key={x.userName}></Follower>)
				: 'Error.'}
		</Box>
	);
};
