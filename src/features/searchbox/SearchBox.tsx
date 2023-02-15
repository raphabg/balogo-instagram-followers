import { Box, TextField } from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import styles from './SearchBos.module.scss';

import { selectSearchText, updateSearchBoxText } from './SearchBoxSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export const SearchBox = () => {
	const dispatch = useAppDispatch();
	const searchText = useAppSelector(selectSearchText);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.value);
		dispatch(updateSearchBoxText(event.target.value));
	};

	return (
		<Box display='flex' flexDirection={'column'}>
			<Box display='flex' alignItems='flex-end' className={styles.searchBox}>
				<SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
				<TextField
					id='search'
					label='Search Followers'
					variant='standard'
					fullWidth
					value={searchText}
					onChange={handleChange}
				/>
			</Box>
		</Box>
	);
};
