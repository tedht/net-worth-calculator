import { Modal, IconButton, AppBar, Toolbar, CardContent, Card } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from "@emotion/react";
import MenuBarButton from "./MenuBarButton";

const MenuBar = ({ 
	open = false, 
	handleCloseMenuBar = () => {} 
}) => {

	const theme = useTheme();

	const appBarStyle = {
		backgroundColor: theme.palette.primary.main,
		position: 'static',
		boxShadow: theme.shadows[10],
	};
	
	const toolBarStyle = {
		height: '100%', 
		backgroundColor: theme.palette.primary.main,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		position: 'relative'
	};

	
	const menuBarStyle = {
		width: { xs: "60%", md: "35%"},
		height: "100%",
		p: 0,
		m: 0,
		backgroundColor: theme.palette.primary.main,
	};

	return (
		<Modal 
			open={open}
			onClose={handleCloseMenuBar}>
			<Card sx={menuBarStyle}>
				<CardContent sx={{ p: 0, width: '100%' }}>
				<AppBar sx={appBarStyle}>
					<Toolbar sx={toolBarStyle}>
							
					<IconButton onClick={handleCloseMenuBar}>
						<MenuIcon sx={{ color: theme.palette.contrastText.main }}/>
					</IconButton>

					<IconButton onClick={handleCloseMenuBar}>
						<CloseRoundedIcon sx={{ color: theme.palette.contrastText.main }} />
					</IconButton>

					</Toolbar>
				</AppBar>
				<MenuBarButton text='Home'   link='/'/>
				<MenuBarButton text='Stats'  link='/stats'/>
				<MenuBarButton text='Search' link='/search'/>
				</CardContent>
			</Card>
		</Modal>
	);
}
export default MenuBar;