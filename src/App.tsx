import { Landing } from './pages/landing/Landing';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { lightGreen, pink } from '@mui/material/colors';
import background from './img/bkgimg.jpg';
import styles from './App.module.scss';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectIsLoggedIn, setIsLoggedIn } from './features/login/loginSlice';
import { Main } from './pages/main/Main';
import Cookies from 'universal-cookie';
import React from 'react';
import { Strings } from './constants';

export const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		background: {
			default: 'rgb(10,10,10)',
		},
		primary: lightGreen,
		secondary: pink,
	},
	typography: {
		allVariants: {
			fontFamily: 'Bahnschrift, "Segoe UI", Frutiger, "Frutiger Linotype"',
		},
	},
	shape: {
		borderRadius: 0,
	},
});

export const App = () => {
	const isLoggedIn = useAppSelector(selectIsLoggedIn);
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		const cookies = new Cookies();
		const sid = cookies.get(Strings.sid);

		if (sid) {
			dispatch(setIsLoggedIn(true));
		}
	}, []);

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />

			{isLoggedIn ? <Main /> : <Landing />}
			<div className={styles.background} style={{ backgroundImage: `url(${background})` }}></div>
		</ThemeProvider>
	);
};

export default App;
