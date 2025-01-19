import { useState, useContext } from "react";
import { Modal, Card, CardContent, Box, Typography, IconButton, TextField, Button } from "@mui/material";
import GlobalContext from '../../context/GlobalContext';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { useMutation } from 'react-query';
import Axios from "../../AxiosInstance";

const modalCardStyle = {
	position: 'absolute',
	top: '2%',
	left: '50%',
	transform: 'translate(-50%, 0%)',
	width: { xs: '90%', md: '60%'},
	background: '#F5F5F5',
	border: 2,
	borderRadius: 9,
	p: 0,
}

const exitButtonStyle = {
	color: "#FFFFFF",
	fontSize: '180%',
	'&:hover': {
		color: '#5F60AC',
		boxShadow: 'none',
	},
}

const loginButtonStyle = {
	fontSize: "28px",
	width: "30%",
	height: "70px",
	color: "#FFFFFF",
	backgroundColor: "#060739",
	border: "#060739",
	borderRadius: 4,
	textAlign: "center",
	padding: "10",
	boxShadow: 2,
	'&:hover': {
		backgroundColor: '#5F60AC',
		borderColor: '#5F60AC',
		boxShadow: 2,
	},
}

const createAccountButtonStyle = {
	height: "50px",
	border: 2,
	color: "#060739",
	backgroundColor: "#FFFFFF",
	borderRadius: 4,
	textAlign: "center",
	padding: "10",
	boxShadow: 1,
	'&:hover': {
		backgroundColor: '#5F60AC',
		color: "#FFFFFF",
		borderColor: '#5F60AC',
		boxShadow: 'none',
	},
}

function LoginModal({ open = false, handleCloseLogin = () => {}, handleOpenCreateAccount = () => {} }){
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');
	
	const { setUser } = useContext(GlobalContext);

	const loginMutation = useMutation(() =>
	Axios.post('/login', {
		email,
		password,
	}),
	{
		onSuccess: (data) => {
			if(data.data.success){
				setUser({
					 firstname: data.data.user.firstname,
					 lastname: data.data.user.lastname,
					 email: data.data.user.email,
					 dateofbirth: data.data.user.dateofbirth,
					 id: data.data.user.id,
				});
				resetAndClose();
			} else {
				if(data.data.message === "User not found") setEmailError(data.data.message);
				else if(data.data.message === "Incorrect password") {
					setPasswordError(data.data.message);
					setPassword('');
				}
			}
		},
		onError: (error) => {
			console.log(error);
		},
	}
);

	const resetAndClose = () => {
		resetInputs();
		resetErrors();
		handleCloseLogin();
	}

	const resetInputs = () => {
		setEmail('');
		setPassword('');
	}

	const resetErrors = () => {
		setEmailError('');
		setPasswordError('')
	}

	const handleSubmit = async () => {
		if(!validateForm()) return;
		loginMutation.mutate();
	};
	
	const validateForm = () => {
		let isValid = true;
		resetErrors();

		if (!email) {
			setEmailError('Email is required');
			isValid = false;
		} else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
			setEmailError('Invalid email format');
			isValid = false;
		}
		if (!password) {
			setPasswordError('Password is required');
			isValid = false;
		}
		return isValid;
	};

	return (
		<Modal 
			open={open}
			onClose={resetAndClose}>
			<Card sx={modalCardStyle}>
				<CardContent sx={{ p: 0 }}>
					<Box borderBottom={2} sx={{ p: 1, bgcolor: '#060739', display: 'flex', justifyContent: 'space-between' }}>
						<Typography variant="h1" sx={{ color: '#FFFFFF',ml: '20px' }}>
							Login
						</Typography>

						<IconButton sx={{ p: 0, mr: '20px' }} onClick={resetAndClose}>
							<CloseRoundedIcon sx={exitButtonStyle} />
						</IconButton>
					</Box>
					<Box sx={{p: 2, gap: 2, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
						<TextField							
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							fullWidth
							error={emailError !== ''}
							helperText={emailError}
							label="Email"
							placeholder="Type your email"/>
						<TextField							
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							fullWidth
							error={passwordError !== ''}
							helperText={passwordError}
							type="password"
							label="Password"
							placeholder="Type your password"/>
						<Button 
							sx={loginButtonStyle}
							onClick={handleSubmit}>
							Login
						</Button>
						<Button 
							sx={createAccountButtonStyle}
							onClick={() => {handleCloseLogin(); handleOpenCreateAccount()}}>
							Create Account
						</Button>
					</Box>
				</CardContent>
			</Card>
		</Modal>
	);
}

export default LoginModal;