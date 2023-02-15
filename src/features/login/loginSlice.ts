import { InstagramPrivateAPI } from './../../app/InstagramPrivateAPI';
import { APIErrors, status, Strings } from './../../constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { APILoginTfaNeededResponse, LoginData } from '../../interfaces';
import Cookies from 'universal-cookie';

export interface LandingState {
	isLoggedIn: boolean;
	loginStatus: status;
	tfaNeeded: boolean;
	loginData: LoginData;
	helpText: { value: string };
}

const initialState: LandingState = {
	isLoggedIn: false,
	loginStatus: status.Idle,
	tfaNeeded: false,
	loginData: {
		username: '',
		password: '',
		tfaCode: '',
	},
	helpText: {
		value: '',
	},
};

export const LoginSlice = createSlice({
	name: 'login',
	initialState: initialState,
	reducers: {
		setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
			state.isLoggedIn = action.payload;
		},
		updateLoginData: (state, action: PayloadAction<{ id: string; value: string }>) => {
			(state.loginData as { [key: string]: string })[action.payload.id] = action.payload.value;
		},
	},
	extraReducers: builder => {
		builder
			.addMatcher(InstagramPrivateAPI.endpoints.login.matchFulfilled, (state, action) => {
				if (action.payload.data) {
					const cookies = new Cookies();
					cookies.set(Strings.sid, action.payload.sid);

					state.isLoggedIn = true;
					state.loginData.tfaCode = '';
				}
			})
			.addMatcher(InstagramPrivateAPI.endpoints.login.matchRejected, (state, action) => {
				const payloadData = action.payload?.data as APILoginTfaNeededResponse;

				if (payloadData?.errorCode === APIErrors.TfaNeeded) {
					const data = payloadData.data;

					const helperText = `Two factor authentication is enabled for your account, please provide the code ${
						data.totp_two_factor_on ? 'presented on your TFA app' : 'sent to your phone number'
					}.`;

					state.helpText.value = helperText;
					state.tfaNeeded = true;
				} else {
					const helperText = 'Unexpected error, try again later.';

					state.helpText.value = helperText;
				}
			});
	},
});

export const { updateLoginData, setIsLoggedIn } = LoginSlice.actions;

export const selectLogInData = (state: RootState) => state.login.loginData;
export const selectIsLoggedIn = (state: RootState) => state.login.isLoggedIn;
export const selectLoginStatus = (state: RootState) => state.login.loginStatus;
export const selectHelpText = (state: RootState) => state.login.helpText;
export const selectTfaNeeded = (state: RootState) => state.login.tfaNeeded;

export default LoginSlice.reducer;
