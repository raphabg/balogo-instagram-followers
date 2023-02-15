import { InstagramPrivateAPI } from './InstagramPrivateAPI';
import {
	configureStore,
	ThunkAction,
	Action,
	combineReducers,
	PayloadAction,
	Reducer,
	AnyAction,
} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loginReducer from '../features/login/loginSlice';
import searchBoxReducer from '../features/searchbox/SearchBoxSlice';
import sideMenuReducer from '../features/side-menu/SideMenuSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { Strings } from '../constants';
import Cookies from 'universal-cookie';

const combinedReducer = combineReducers({
	counter: counterReducer,
	login: loginReducer,
	searchBox: searchBoxReducer,
	sideMenu: sideMenuReducer,
	[InstagramPrivateAPI.reducerPath]: InstagramPrivateAPI.reducer,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
	if (action.type === Strings.Reset) {
		state = {} as RootState;

		const cookies = new Cookies();
		cookies.remove(Strings.sid);
	}
	return combinedReducer(state, action);
};

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(InstagramPrivateAPI.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
