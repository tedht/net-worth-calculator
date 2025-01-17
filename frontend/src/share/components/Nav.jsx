import { useContext, useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import "@fontsource/roboto";
import GlobalContext from '../context/GlobalContext';
import MenuBar from './MenuBar';
import { useQuery } from 'react-query';
import Cookies from 'js-cookie';
import Axios from '../AxiosInstance';

const navbarStyle = {
		background:"#060739",
		position: "static",
		height: "64px"
}

function Nav() {
	const { user, setUser, setEntries } = useContext(GlobalContext);
	const [openMenuBar, setOpenMenuBar] = useState(false);
	const [startFetch, setStartFetch] = useState(false);

	const handleOpenMenuBar = () => setOpenMenuBar(true);
	const handleCloseMenuBar = () => setOpenMenuBar(false);

	const handleLogout = () => {
		setUser();
		setEntries([]);
		Cookies.remove('UserToken');
	};

	const fetchUser = async () => {
		const userToken = Cookies.get('UserToken');
		return await Axios.get('/me', {
			headers: { 
				Authorization: `Bearer ${userToken}`,
			},
		});
	};
	
	useEffect(() => {
		const userToken = Cookies.get('UserToken');
		setStartFetch(!(userToken == null || userToken == 'undefined'));
	}, [user]);

	useQuery('user', fetchUser, {
		onSuccess: (data) => {
			if(data.data.success){
				setUser({
					 firstname: data.data.data.firstname,
					 lastname: data.data.data.lastname,
					 email: data.data.data.email,
					 dateofbirth: data.data.data.dateofbirth,
					 id: data.data.data.id,
				});
			}
		},
		onError: (error) => {
			console.log(error);
		},
		enabled: startFetch,
	});

	return (
		<>
		<MenuBar open={openMenuBar} handleCloseMenuBar={handleCloseMenuBar}/>
		<AppBar sx={navbarStyle}>
			<Toolbar sx={{height: "100%", display: "flex", justifyContent: "space-between"}}>
				<IconButton onClick={handleOpenMenuBar}>
					<MenuIcon sx={{ color: "#FFFFFF", fontSize: '180%' }}/>
				</IconButton>
				<Typography variant="h1">My Net Worth</Typography>
				{(user) ? 
				(<IconButton onClick={handleLogout}>
					<LogoutIcon sx={{ color: "#FFFFFF", fontSize: '180%' }}/>
				</IconButton>) :
				(<IconButton disabled>
					<LogoutIcon sx={{ color: "transparent", fontSize: '180%' }}/>
				</IconButton>)}
			</Toolbar>
		</AppBar>
		</>
	);
}
	
export default Nav;