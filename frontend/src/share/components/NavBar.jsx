import { useContext, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { AppBar, Toolbar, Typography, Box, IconButton, Button } from "@mui/material";
import { useTheme } from '@mui/material';

import Cookies from 'js-cookie';

import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

import GlobalContext from '../context/GlobalContext';
import Axios from '../AxiosInstance';

import MenuBar from './MenuBar';
import NavBarButton from './NavBarButton';
import LoginModal from './auth/LoginModal';
import CreateAccountModal from './auth/CreateAccountModal'

const NavBar = () => {
	const { user, setUser, setEntries } = useContext(GlobalContext);
	const [startFetch,             setStartFetch            ] = useState(false);
	const [openMenuBar,            setOpenMenuBar           ] = useState(false);
	const [openLoginModal,         setOpenLoginModal        ] = useState(false);
	const [openCreateAccountModal, setOpenCreateAccountModal] = useState(false);

	const handleOpenMenuBar        = () => setOpenMenuBar(true);
	const handleCloseMenuBar       = () => setOpenMenuBar(false);

	const handleOpenLogin          = () => setOpenLoginModal(true);
	const handleCloseLogin         = () => setOpenLoginModal(false);

	const handleOpenCreateAccount  = () => setOpenCreateAccountModal(true);
	const handleCloseCreateAccount = () => setOpenCreateAccountModal(false);

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

	// Style
	const theme = useTheme();

	const appBarStyle = {
		backgroundColor: theme.palette.primary.main,
		position: 'static',
		boxShadow: theme.shadows[10],
	};
	
	const toolBarStyle = {
		height: '100%', 
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		position: 'relative'
	};

	const navBarButtonsStyle = {
		display: { xs: 'none', lg: 'flex' },
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)'
	}

	return (
		<>
		<MenuBar open={openMenuBar} handleCloseMenuBar={handleCloseMenuBar}/>
		<LoginModal
			open={openLoginModal} 
			handleCloseLogin={handleCloseLogin} 
			handleOpenCreateAccount={handleOpenCreateAccount}/>
		<CreateAccountModal
			open={openCreateAccountModal} 
			handleCloseCreateAccount={handleCloseCreateAccount}
			handleOpenLogin={handleOpenLogin}/>

		<AppBar sx={appBarStyle}>
			<Toolbar sx={toolBarStyle}>
				{/* MenuBar Button */ }
				<IconButton onClick={handleOpenMenuBar} sx={{ display: { xs: 'block', lg: 'none' } }}>
					<MenuIcon sx={{ color: theme.palette.contrastText.main }}/>
				</IconButton>
					
				{/* Logo + Language Button*/}
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
					<Typography variant="logo">Net Worth Calculator</Typography>
					<Button onClick={()=>{}} color="inherit" sx={{ mx: 1, display: { xs: 'none', lg: 'block' } }}>En</Button>
				</Box>

				{/* NavBar Buttons*/}
				<Box sx={navBarButtonsStyle}>
					<NavBarButton name='Home'   link='/'/>
					<NavBarButton name='Stats'  link='/stats'/>
					<NavBarButton name='Search' link='/Search'/>
				</Box>

				{/* Account */}
				{user ? (
				<Button startIcon={<LogoutIcon />} onClick={handleLogout} color="inherit">
					Logout
				</Button>
				) : (
				<>
				<Button startIcon={<LoginIcon />} onClick={handleOpenLogin} color="inherit" sx={{ display: { xs: 'none', lg: 'flex' } }}> 
					Login
				</Button>
				<IconButton onClick={handleOpenMenuBar} sx={{ display: { xs: 'block', lg: 'none' } }}>
					<LoginIcon sx={{ color: theme.palette.contrastText.main }} />
				</IconButton>
				</>
				)}

			</Toolbar>	
		</AppBar>
		</>
	);
}	

export default NavBar;