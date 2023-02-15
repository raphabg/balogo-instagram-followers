import { Box, Grid, Paper, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import styles from './Header.module.scss';

import InstagramIcon from '@mui/icons-material/Instagram';

export const Header = () => {
	const theme = useTheme();

	return (
		<Box
			display={'flex'}
			className={styles.landingFormMenuHeader}
			style={{ backgroundColor: theme.palette.primary.main }}
		>
			<Stack direction='column'>
				<InstagramIcon
					fontSize='large'
					style={{
						color: theme.palette.primary.contrastText,
						marginRight: '8px',
					}}
				/>
			</Stack>
			<Stack direction='column' justifyContent='center' paddingTop={'1px'}>
				<Typography variant='h6' align={'center'} color={theme.palette.primary.contrastText}>
					Balogo Instagram Followers
				</Typography>
			</Stack>
		</Box>
	);
};
