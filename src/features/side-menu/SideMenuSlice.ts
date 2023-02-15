import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { MenuItemT } from '../../constants';

export interface SideMenuState {
	selected: MenuItemT;
}

const initialState: SideMenuState = {
	selected: MenuItemT.Lost,
};

export const SideMenuSlice = createSlice({
	name: 'iconMenu',
	initialState,
	reducers: {
		changeMenu: (state, action: PayloadAction<MenuItemT>) => {
			state.selected = action.payload;
		},
	},
});

export const { changeMenu } = SideMenuSlice.actions;

export const selectSelected = (state: RootState) => state.sideMenu.selected;

export default SideMenuSlice.reducer;
