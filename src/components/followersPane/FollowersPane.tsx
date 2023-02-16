import { Box } from '@mui/material';
import styles from './FollowersPane.module.scss';
import { SearchBox } from '../../features/searchbox/SearchBox';
import { FollowersList } from '../followersList/FollowersList';
import { useAppSelector } from '../../app/hooks';
import { selectSelected } from '../../features/side-menu/SideMenuSlice';

export const FollowersPane = () => {
	const selected = useAppSelector(selectSelected);

	return (
		<Box
			display={'flex'}
			flexDirection={'column'}
			flexGrow={1}
			style={{ backgroundColor: `rgba(0,0,0,.7)` }}
			className={styles.followersPane}
		>
			<SearchBox />
			<FollowersList selected={selected} />
		</Box>
	);
};
