import { useState } from "react";
import { TextField, Button } from "@mui/material";

import TemplateModal from "../TemplateModal";

import { useLogin } from "../../../hooks/useMutations";
import { useGlobalContext } from "../../../hooks/useContexts";

const LoginModal = ({ 
	open = false, 
	handleCloseLogin        = () => {}, 
	handleOpenCreateAccount = () => {} 
}) => {
	const [email,         setEmail        ] = useState('');
	const [emailError,    setEmailError   ] = useState('');
	const [password,      setPassword     ] = useState('');
	const [passwordError, setPasswordError] = useState('');
	
	const { setUser, setEntries } = useGlobalContext();

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

	const handleLogin = () => {
		if(!validateForm()) return;
		loginMutation.mutate({ email, password });
	};

	const loginMutation = useLogin(resetAndClose, setUser, setEntries, setPassword, setEmailError);

	const handleCreateAccount = () => {
		handleCloseLogin(); 
		handleOpenCreateAccount();
	}

	return (
		<TemplateModal open={open} title="Login" handleClose={resetAndClose}>

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

		{/* Password */}
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

		<Button 
			variant="contained" 
			color="primary"
			onClick={handleLogin}>
			Login
		</Button>

		<Button 
			variant="text" 
			onClick={handleCreateAccount}>
			Create Account
		</Button>

		</TemplateModal>
	);
}

export default LoginModal;