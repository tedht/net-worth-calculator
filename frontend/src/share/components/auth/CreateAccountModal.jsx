import { useState, useContext } from "react";
import { Modal, Card, CardContent, Box, Typography, IconButton, TextField, Button, Checkbox, FormControl, FormHelperText } from "@mui/material";
import GlobalContext from '../../context/GlobalContext';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { useMutation } from 'react-query';
import Axios from "../../AxiosInstance";

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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

const createAccountButtonStyle = {
	fontSize: "20px",
	width: "30%",
	height: "70px",
	border: 2,
	color: "#060739",
	backgroundColor: "#FFFFFF",
	borderRadius: 4,
	textAlign: "center",
	padding: "10",
	boxShadow: 2,
	'&:hover': {
		backgroundColor: '#5F60AC',
		borderColor: '#5F60AC',
		color: "#FFFFFF",
		boxShadow: 2,
	},
}

function CreateAccountModal({ 
	open = false, 
	handleCloseCreateAccount = () => {},
	handleOpenLogin = () => {}
}){
	const [firstname, setFirstname] = useState('');
	const [firstnameError, setFirstnameError] = useState('');
	const [lastname, setLastname] = useState('');
	const [lastnameError, setLastnameError] = useState('');
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [rePassword, setRePassword] = useState('');
	const [rePasswordError, setRePasswordError] = useState('');
	const [inputDateOfBirth, setInputDateOfBirth] = useState(dayjs());
	const [dateOfBirth, setDateOfBirth] = useState(dayjs().format('YYYY-MM-DD'));
	const [checked, setChecked] = useState(false);
	const [checkedError, setCheckedError] = useState('');

	const handleNewDateOfBirth = (event) => {
		setInputDateOfBirth(event);
		setDateOfBirth(event.format('YYYY-MM-DD'));
		console.log();
	}

	const handleCheck = (event) => {
		setChecked(event.target.checked);
	};

	const resetAndClose = () => {
		resetInputs();
		resetErrors();
		handleCloseCreateAccount();
	}

	const resetInputs = () => {
		setFirstname('');
		setLastname('');
		setEmail('');
		setInputDateOfBirth(dayjs());
		setDateOfBirth(dayjs().format('YYYY-MM-DD'));
		setPassword('');
		setRePassword('');
		setChecked(false);
	}

	const resetErrors = () => {
		setFirstnameError('');
		setLastnameError('');
		setEmailError('');
		setPasswordError('');
		setRePasswordError('');
		setCheckedError('');
	}

	const handleSubmit = async () => {
		if(!validateForm()) return;
		createAccountMutation.mutate();
	};
	
	const validateForm = () => {
		let isValid = true;
		resetErrors();

		if (!firstname) {
			setFirstnameError('First name is required');
			isValid = false;
		}
		if (!lastname) {
			setLastnameError('Last name is required');
			isValid = false;
		}
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
		} else if(!/^(?=.*?[A-Z]+)(?=.*?[a-z]+)(?=.*?[0-9]+).{8,}$/g.test(password)){
			setPasswordError('Password must have at least 8 characters, 1 uppercase, 1 lowercase and a number');
			setPassword('');
			setRePassword('');
			isValid = false;
		}
		if (!rePassword) {
			setRePasswordError('Confirm password is required');
			isValid = false;
		} 
		if (password !== rePassword) {
			setPasswordError('Passwords do not match');
			setRePasswordError('Passwords do not match');
			setRePassword('');
			setPassword('');
			isValid = false;
		}
		if(!checked){
			setCheckedError('User agreement to the privacy policy is required')
			isValid = false;
		}		
		return isValid;
	};

	const handleError = (data) => {
		console.log("error");
		console.log(data);
	}

	const createAccountMutation = useMutation(() =>
		Axios.post('/users', {
			firstname,
			lastname,
			dateOfBirth,
			email,
			password,
			hgjh
		}),
		{
			onSuccess: (data) =>{
				if(data.data.success){
					resetAndClose();
					handleOpenLogin();
				} else if(data.data.error && data.data.error.substring(0,15) === "Duplicate entry"){
					setEmailError('Email has already been used')
				} else {
					handleError(data);
				}
			},
			onError: (error) => {
				console.log(error);
				if (error.response) {
					console.error(error.response.data);
				}
				setPassword('');
				setRePassword('');
			},
		}
	);


	return (
		<Modal 
			open={open}
			onClose={resetAndClose}
			sx={{overflow: 'scroll'}}>
			<Card sx={modalCardStyle}>
				<CardContent sx={{ p: 0 }}>
					<Box 
						borderBottom={2} 
						sx={{ 
							p: 1, 
							bgcolor: '#060739', 
							display: 'flex', 
							justifyContent: 'space-between' }}>
						<Typography variant="h1" sx={{ color: '#FFFFFF',ml: '20px' }}>
							Create Account
						</Typography>

						<IconButton sx={{ p: 0, mr: '20px' }} onClick={resetAndClose}>
							<CloseRoundedIcon sx={exitButtonStyle} />
						</IconButton>
					</Box>
					<Box sx={{
						p: 2, 
						gap: 2, 
						display: 'flex', 
						flexDirection: 'column', 
						alignItems: 'center'}}>
						<TextField							
							value={firstname}
							onChange={(e) => setFirstname(e.target.value)}
							fullWidth
							error={firstnameError !== ''}
							helperText={firstnameError}
							label="First name"
							placeholder="Type your first name"/>
							<TextField							
							value={lastname}
							onChange={(e) => setLastname(e.target.value)}
							fullWidth
							error={lastnameError !== ''}
							helperText={lastnameError}
							label="Last name"
							placeholder="Type your last name"/>
						<TextField							
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							fullWidth
							error={emailError !== ''}
							helperText={emailError}
							label="Email"
							placeholder="Type your email"/>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DemoContainer components={['DatePicker', 'DatePicker']}>
								<DatePicker
									label="Date of birth"
									value={inputDateOfBirth}
									onChange={(e) => handleNewDateOfBirth(e)}/>
							</DemoContainer>
						</LocalizationProvider>
						<TextField							
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							fullWidth
							error={passwordError !== ''}
							helperText={passwordError}
							type="password"
							label="Password"
							placeholder="Type your password"/>
						<TextField							
							value={rePassword}
							onChange={(e) => setRePassword(e.target.value)}
							fullWidth
							error={rePasswordError !== ''}
							helperText={rePasswordError}
							type="password"
							label="Confirm password"
							placeholder="Type your password"/>
							<FormControl error={!!checkedError}>
								<Box display={'flex'}>
								<Checkbox	 
									checked={checked}
									onChange={handleCheck}/>
								<Typography variant="body1" alignItems={'center'} display={'flex'}>
									I have read and agree to the privacy policy of this website.
								</Typography>
								</Box>
								<FormHelperText>
									{(!!checkedError) ? checkedError : ''}
								</FormHelperText>
							</FormControl>
						<Button 
							sx={createAccountButtonStyle}
							onClick={handleSubmit}>
							Create Account
						</Button>
					</Box>
				</CardContent>
			</Card>
		</Modal>
	);
}

export default CreateAccountModal;