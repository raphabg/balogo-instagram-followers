import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface SearchBoxState {
	searchText: string;
}

const initialState: SearchBoxState = {
	searchText: '',
};

export const SearchBoxSlice = createSlice({
	name: 'searchBox',
	initialState: initialState,
	reducers: {
		clearSearchBoxText: state => {
			state.searchText = '';
		},
		updateSearchBoxText: (state, action: PayloadAction<string>) => {
			state.searchText = action.payload;
		},
	},
});

export const { clearSearchBoxText, updateSearchBoxText } = SearchBoxSlice.actions;

export const selectSearchText = (state: RootState) => state.searchBox.searchText;

export default SearchBoxSlice.reducer;
