import React from 'react';
import { Avatar, Box, Paper, Typography, useTheme } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import styles from './Follower.module.scss';

type Props = {
	userName: string;
};

export const Follower = ({ userName }: Props) => {
	const theme = useTheme();

	return (
		<Paper elevation={2} sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
			<Box display='flex' alignItems={'center'} sx={{ padding: '4px 12px 4px 12px' }}>
				<Avatar sx={{ marginRight: '12px' }}>
					<ImageIcon />
				</Avatar>
				<Box display='flex' flexDirection={'column'}>
					<Typography variant='body1'>{userName} </Typography>

					<Typography variant='caption'> Raphael Balogo</Typography>
				</Box>
			</Box>
		</Paper>
	);
};
