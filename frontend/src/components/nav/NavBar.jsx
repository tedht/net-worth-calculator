import { useContext, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import Cookies from 'js-cookie';

import { AppBar, Toolbar, Typography, Box, IconButton, Button, useTheme } from '@mui/material';
import MenuIcon   from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon  from '@mui/icons-material/Login';


import GlobalContext from '../../context/globalContext';
import Axios         from '../../services/axiosInstance';

import MenuBar            from './MenuBar';
import NavBarButton       from './NavBarButton';
import LoginModal         from '../modals/auth/LoginModal';
import CreateAccountModal from '../modals/auth/CreateAccountModal';

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
					 dateOfBirth: data.data.data.dateOfBirth,
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
			handleOpenCreateAccount={handleOpenCreateAccount}
		/>
		<CreateAccountModal
			open={openCreateAccountModal} 
			handleCloseCreateAccount={handleCloseCreateAccount}
			handleOpenLogin={handleOpenLogin}
		/>

		<AppBar sx={appBarStyle}>
			<Toolbar sx={toolBarStyle}>
				{/* MenuBar Button */ }
				<IconButton onClick={handleOpenMenuBar} sx={{ display: { xs: 'block', lg: 'none' } }}>
					<MenuIcon sx={{ color: theme.palette.contrastText.main }}/>
				</IconButton>
					
				{/* Logo + Language Button*/}
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
					<Typography variant='logo'>Net Worth Calculator</Typography>
					<Button 
						variant='contained'
						color='primary'
						onClick={()=>{}} 
						sx={{ display: { xs: 'none', md: 'flex' }, boxShadow: 0, borderRadius: 100}}
					>
					En
					</Button>
				</Box>

				{/* NavBar Buttons*/}
				<Box sx={navBarButtonsStyle}>
					<NavBarButton text='Home'   link='/'/>
					<NavBarButton text='Stats'  link='/stats'/>
					<NavBarButton text='Search' link='/search'/>
				</Box>

				{/* Account */}
				{user ? (
				<Button 
					variant='contained'
					color='primary'
					sx={{ display: { xs: 'none', sm: 'flex' }, boxShadow: 0 }}
					startIcon={<LogoutIcon />} 
					onClick={handleLogout} 
				>
					Logout
				</Button>
				) : (
				<>
				<Button 
					variant='contained'
					color='primary'
					sx={{ display: { xs: 'none', sm: 'flex' }, boxShadow: 0 }}
					startIcon={<LoginIcon />}
					onClick={handleOpenLogin} 
				> 
					Login
				</Button>
				<IconButton onClick={handleOpenLogin} sx={{ display: { xs: 'block', sm: 'none' }}}>
					<LoginIcon color='secondary' />
				</IconButton>
				</>
				)}

			</Toolbar>	
		</AppBar>
		</>
	);
}	

export default NavBar;