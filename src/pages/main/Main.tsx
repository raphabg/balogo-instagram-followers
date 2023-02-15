import { Box } from '@mui/material';
import React from 'react';
import SideMenu from '../../features/side-menu/SideMenu';
import { Header } from '../../components/header/Header';
import { FollowersPane } from '../../components/followersPane/FollowersPane';

export const Main = () => {
	return (
		<React.Fragment>
			<Box display={'flex'} flexDirection={'column'} flexGrow={1}>
				<Header />

				<Box display={'flex'} flexDirection={'row'} flexGrow={1} minHeight={0} maxHeight={'100%'}>
					<SideMenu />

					<FollowersPane />
				</Box>
			</Box>
		</React.Fragment>
	);
};
