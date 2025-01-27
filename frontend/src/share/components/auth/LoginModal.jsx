import { useState, useContext } from "react";
import { TextField, Button } from "@mui/material";
import { useMutation } from 'react-query';

import GlobalContext from '../../GlobalContext';
import Axios from "../../AxiosInstance";

import ModalCard from "../ModalCard";

const LoginModal = ({ 
	open = false, 
	handleCloseLogin        = () => {}, 
	handleOpenCreateAccount = () => {} 
}) => {
	const [email,         setEmail        ] = useState('');
	const [emailError,    setEmailError   ] = useState('');
	const [password,      setPassword     ] = useState('');
	const [passwordError, setPasswordError] = useState('');
	
	const { setUser } = useContext(GlobalContext);

	const loginMutation = useMutation(() =>
	Axios.get('/users', {
		email,
		password,
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
			console.error(error);
			alert("Login error");
			setPassword('');
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
		<ModalCard open={open} title="Login" handleClose={resetAndClose}>

		{/* Email */}
		<TextField							
			value={email}
			onChange={(e) => setEmail(e.target.value)}
			fullWidth
			error={emailError !== ''}
			helperText={emailError}
			label="Email"
			placeholder="Type your email"/>

		{/* Password */}
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
			variant="contained" 
			color="primary"
			onClick={handleSubmit}>
			Login
		</Button>
		<Button 
			variant="text" 
			onClick={() => {handleCloseLogin(); handleOpenCreateAccount()}}>
			Create Account
		</Button>

		</ModalCard>
	);
}

export default LoginModal;