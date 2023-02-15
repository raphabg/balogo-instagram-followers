import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import styles from './Login.module.scss';
import { AccountCircle } from '@mui/icons-material';
import KeyIcon from '@mui/icons-material/Key';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectHelpText, selectLogInData, selectTfaNeeded, updateLoginData } from './loginSlice';
import { useLazyLoginQuery } from '../../app/InstagramPrivateAPI';
import React from 'react';
import PinIcon from '@mui/icons-material/Pin';

export const Login = () => {
	const dispatch = useAppDispatch();
	const theme = useTheme();

	const loginData = useAppSelector(selectLogInData);
	const helpText = useAppSelector(selectHelpText);
	const tfaNeeded = useAppSelector(selectTfaNeeded);

	const [loginTrigger, loginResult] = useLazyLoginQuery();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updateLoginData({ id: event.target.id, value: event.target.value }));
	};

	return (
		<Box display={'flex'} flexGrow={1} className={styles.login} flexDirection={'column'}>
			<Box display='flex' alignItems='flex-end' flexGrow={1} padding={1}>
				<AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
				<TextField
					id='username'
					label='Username'
					variant='standard'
					disabled={tfaNeeded}
					fullWidth
					value={loginData.username}
					onChange={handleChange}
					autoComplete={'username'}
				/>
			</Box>

			<Box display='flex' alignItems='flex-end' flexGrow={1} padding={1}>
				<KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
				<TextField
					id='password'
					label='Password'
					variant='standard'
					disabled={tfaNeeded}
					type='password'
					fullWidth
					value={loginData.password}
					onChange={handleChange}
					autoComplete={'password'}
				/>
			</Box>

			{tfaNeeded && (
				<Box display='flex' alignItems='flex-end' flexGrow={1} padding={1}>
					<PinIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
					<TextField
						id='tfaCode'
						label='TFA Code'
						variant='standard'
						value={loginData.tfaCode}
						onChange={handleChange}
					/>
				</Box>
			)}

			<Box display={'flex'} flexGrow={1} justifyContent={'flex-end'} padding={1} paddingBottom={0}>
				{helpText.value !== '' && (
					<Box display='flex' alignItems='center'>
						<Typography variant='caption' color={theme.palette.primary.dark}>
							{helpText.value}
						</Typography>
					</Box>
				)}
				<Button
					variant='text'
					color='secondary'
					style={{ marginTop: 'auto', marginLeft: 'auto' }}
					disabled={loginResult.isLoading}
					onClick={() => {
						loginTrigger(loginData);
					}}
				>
					LOGIN
				</Button>
			</Box>
		</Box>
	);
};
