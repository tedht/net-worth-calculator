import { useState, useContext } from "react";
import { Modal, Card, CardContent, Box, Typography, IconButton, TextField, Button, Checkbox, FormControl, FormHelperText } from "@mui/material";
import GlobalContext from '../../GlobalContext';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useTheme } from '@mui/material';

import { useMutation } from 'react-query';
import Axios from "../../AxiosInstance";

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const CreateAccountModal = ({ 
	open = false, 
	handleCloseCreateAccount = () => {},
	handleOpenLogin = () => {}
}) => {
	const [firstname,        setFirstname]        = useState('');
	const [firstnameError,   setFirstnameError]   = useState('');
	const [lastname,         setLastname]         = useState('');
	const [lastnameError,    setLastnameError]    = useState('');
	const [email,            setEmail]            = useState('');
	const [emailError,       setEmailError]       = useState('');
	const [password,         setPassword]         = useState('');
	const [passwordError,    setPasswordError]    = useState('');
	const [rePassword,       setRePassword]       = useState('');
	const [rePasswordError,  setRePasswordError]  = useState('');
	const [inputDateOfBirth, setInputDateOfBirth] = useState(dayjs());
	const [dateOfBirth,      setDateOfBirth]      = useState(dayjs().format('YYYY-MM-DD'));
	const [checked,          setChecked]          = useState(false);
	const [checkedError,     setCheckedError]     = useState('');

	const { setUser } = useContext(GlobalContext);

	const createAccountMutation = useMutation(() =>
		Axios.post('/users', {
			firstname,
			lastname,
			dateOfBirth,
			email,
			password
		}),
		{
			onSuccess: (data) =>{
				console.log(data);
				setUser({
					firstname: data.data.firstname,
					lastname: data.data.lastname,
					email: data.data.email,
					dateofbirth: data.data.dateofbirth,
					id: data.data.id,
				})
				resetAndClose();
			},
			onError: (error) => {
				alert("Account creation error")
				console.error(error);
				setPassword('');
				setRePassword('');
			},
		}
	);

	const handleNewDateOfBirth = (event) => {
		setInputDateOfBirth(event);
		setDateOfBirth(event.format('YYYY-MM-DD'));
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

	const theme = useTheme();
	
	const modalCardStyle = {
		position: 'absolute',
		left: '50%',
		transform: 'translate(-50%, 0%)',
		width: { xs: '90%', md: '60%'},
		border: 2,
		borderRadius: 5,
		mt: 2,
		boxShadow: theme.shadows[10]
	}

	const modalHeaderStyle = { 
		p: 1,  
		background: theme.palette.primary.main,
		display: 'flex', 
		justifyContent: 'space-between' 
	}

	return (
		<Modal 
			open={open}
			onClose={resetAndClose}
			sx={{overflow: 'scroll'}}>
			<Card sx={modalCardStyle}>
				<CardContent sx={{ p: 0 }}>

					{/****************/}
					{/* MODAL HEADER */}
					{/****************/}
					<Box borderBottom={2} sx={modalHeaderStyle}>
						<Typography variant="h6" color="secondary">
							Create Account
						</Typography>

						<IconButton onClick={resetAndClose}>
							<CloseRoundedIcon color="contrastText"/>
						</IconButton>
					</Box>

					{/****************/}
					{/*  MODAL BODY  */}
					{/****************/}
					<Box sx={{
						p: 2, 
						gap: 2, 
						display: 'flex', 
						flexDirection: 'column', 
						alignItems: 'center'}}>

						{/* Firstname */}
						<TextField							
							value={firstname}
							onChange={(e) => setFirstname(e.target.value)}
							fullWidth
							error={firstnameError !== ''}
							helperText={firstnameError}
							label="First name"
							placeholder="Type your first name"
						/>
							
						{/* Lastname */}
						<TextField							
							value={lastname}
							onChange={(e) => setLastname(e.target.value)}
							fullWidth
							error={lastnameError !== ''}
							helperText={lastnameError}
							label="Last name"
							placeholder="Type your last name"
						/>
						
						{/* Email */}
						<TextField							
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							fullWidth
							error={emailError !== ''}
							helperText={emailError}
							label="Email"
							placeholder="Type your email"
						/>

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
							placeholder="Type your password"
						/>

						<TextField							
							value={rePassword}
							onChange={(e) => setRePassword(e.target.value)}
							fullWidth
							error={rePasswordError !== ''}
							helperText={rePasswordError}
							type="password"
							label="Confirm password"
							placeholder="Type your password"
						/>

						<FormControl error={!!checkedError}>

							<Box display={'flex'}>
								<Checkbox	 
									checked={checked}
									onChange={handleCheck}
								/>
								<Typography variant="body1" alignItems={'center'} display={'flex'}>
									I have read and agree to the privacy policy of this website.
								</Typography>
							</Box>

							<FormHelperText>
								{(!!checkedError) ? checkedError : ''}
							</FormHelperText>
						</FormControl>

						<Button 
							variant="contained" 
							color="primary"
							onClick={handleSubmit}>
							Create Account
						</Button>

						<Button 
							variant="text" 
							onClick={() => {handleCloseCreateAccount(); handleOpenLogin();}}>
							Already have an account ?
						</Button>
					</Box>
				</CardContent>
			</Card>
		</Modal>
	);
}

export default CreateAccountModal;