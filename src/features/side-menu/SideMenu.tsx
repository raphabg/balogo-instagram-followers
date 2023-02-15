import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Box, useTheme } from '@mui/material';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import GroupIcon from '@mui/icons-material/Group';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import styles from './SideMenu.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeMenu, selectSelected } from './SideMenuSlice';
import { MenuItemT } from '../../constants';

export default function SideMenu() {
	const theme = useTheme();
	const dispatch = useAppDispatch();
	const selected = useAppSelector(selectSelected);

	const [menuItens] = React.useState([
		{
			icon: <DoDisturbIcon fontSize='small' />,
			text: MenuItemT.Lost,
		},
		{
			icon: <CancelScheduleSendIcon fontSize='small' />,
			text: MenuItemT.NotFollowingBack,
		},
		{
			icon: <MultipleStopIcon fontSize='small' />,
			text: MenuItemT.Mutual,
		},
		{
			icon: <KeyboardDoubleArrowRightIcon fontSize='small' />,
			text: MenuItemT.Following,
		},
		{
			icon: <GroupIcon fontSize='small' />,
			text: MenuItemT.Followers,
		},
	]);

	return (
		<Box display={'flex'} flexDirection={'row'} className={styles.leftMenu}>
			<Paper sx={{ width: '100%' }} elevation={1}>
				<MenuList>
					{menuItens.map(x => {
						return (
							<div key={x.text}>
								<MenuItem
									className={selected === x.text ? '' : styles.unselected}
									onClick={() => {
										dispatch(changeMenu(x.text));
									}}
								>
									<Box display={'flex'} flexGrow={1}>
										<ListItemIcon style={selected === x.text ? { color: theme.palette.primary.dark } : {}}>
											{x.icon}
										</ListItemIcon>
										<Box>
											<ListItemText>{x.text}</ListItemText>
										</Box>
									</Box>
								</MenuItem>
								<Divider />
							</div>
						);
					})}
				</MenuList>
			</Paper>
		</Box>
	);
}
