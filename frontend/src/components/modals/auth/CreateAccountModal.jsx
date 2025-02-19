import { useState } from "react";
import { Box, Typography, TextField, Button, Checkbox, FormControl, FormHelperText } from "@mui/material";

import TemplateModal from "../TemplateModal";

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useCreateAccount } from "../../../hooks/useMutations";
import { useGlobalContext } from "../../../hooks/useContexts";

const CreateAccountModal = ({ 
	open = false, 
	handleCloseCreateAccount = () => {},
	handleOpenLogin          = () => {}
}) => {
	const [firstname,        setFirstname       ] = useState('');
	const [firstnameError,   setFirstnameError  ] = useState('');
	const [lastname,         setLastname        ] = useState('');
	const [lastnameError,    setLastnameError   ] = useState('');
	const [email,            setEmail           ] = useState('');
	const [emailError,       setEmailError      ] = useState('');
	const [password,         setPassword        ] = useState('');
	const [passwordError,    setPasswordError   ] = useState('');
	const [rePassword,       setRePassword      ] = useState('');
	const [rePasswordError,  setRePasswordError ] = useState('');
	const [inputDateOfBirth, setInputDateOfBirth] = useState(dayjs());
	const [dateOfBirth,      setDateOfBirth     ] = useState(dayjs().format('YYYY-MM-DD'));
	const [checked,          setChecked         ] = useState(false);
	const [checkedError,     setCheckedError    ] = useState('');

	const [newUser,          setNewUser       ]   = useState({});
	const [newUserErrors,    setNewUserErrors ]   = useState({});

	const { setUser } = useGlobalContext();

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
		createAccountMutation.mutate({ firstname, lastname, dateOfBirth, email, password });
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

	const createAccountMutation = useCreateAccount(resetAndClose, setUser, setPassword, setRePassword);

	return (
		<TemplateModal open={open} title={'Create Account'} handleClose={resetAndClose}>

		<TextField							
			value={firstname}
			onChange={(e) => setFirstname(e.target.value)}
			fullWidth
			error={firstnameError !== ''}
			helperText={firstnameError}
			label="First name"
			placeholder="Type your first name"
		/>
			
		<TextField							
			value={lastname}
			onChange={(e) => setLastname(e.target.value)}
			fullWidth
			error={lastnameError !== ''}
			helperText={lastnameError}
			label="Last name"
			placeholder="Type your last name"
		/>
		
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
			variant="contained" 
			color="primary"
			onClick={handleSubmit}>
			Submit
		</Button>

		<Button 
			variant="text" 
			onClick={() => {handleCloseCreateAccount(); handleOpenLogin();}}>
			Already have an account ?
		</Button>
		
		</TemplateModal>
	);
}

export default CreateAccountModal;