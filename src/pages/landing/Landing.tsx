import { Paper } from '@mui/material';
import styles from './Landing.module.scss';
import { Login } from '../../features/login/Login';
import { Header } from '../../components/header/Header';

export const Landing = () => {
	return (
		<Paper elevation={1} className={styles.landingFormMenu}>
			<Header />
			<Login />
		</Paper>
	);
};
