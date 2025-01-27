import { useState, useContext, useEffect } from "react";
import { 
	Modal, Card, CardContent, Box, Typography, IconButton, 
	Button, Select, MenuItem, InputLabel, FormControl, FormHelperText ,
	OutlinedInput, InputAdornment
} from "@mui/material";
import GlobalContext from "../../../../share/GlobalContext";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useMutation } from "react-query";
import Cookies from "js-cookie";
import Axios from "../../../../share/AxiosInstance";

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

const primaryButtonStyle = {
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

function EditEntryModal({ entry = {}, open = false, handleCloseEditEntry = () => {}, label = '' }){
	const [editEntry, setEditEntry] = useState(entry);
	const [error, setError] = useState({});

	const { entries, setEntries } = useContext(GlobalContext);

	const assetCategories = [
		'Bank account', 
		'Real estate',
		'Car',
		'Other',
	];
	const liabilityCategories = [
		'Debt',
		'Loan',
		'Other',
	];

	useEffect(() => {
		setEditEntry(entry);
	}, [entry]);

	const resetAndClose = () => {
		setError({});
		handleCloseEditEntry();
	}

	const handleSubmit = async () => {
		if(!validateForm())return;
		editMutation.mutate();
	};
	
	const validateForm = () => {
		const error = {};
		if (!editEntry.name) error.name = 'Entry name is required';
		if (!editEntry.value) error.value = 'Value is required';
		else if (!/^[0-9]*$/g.test(editEntry.value)) error.value = 'Invalid value';
		if (!editEntry.category) error.category = 'Category is required';
		setError(error);

		if (Object.keys(error).length) return false;
		return true;
	}

	const editMutation = useMutation(() =>
	Axios.patch('/entry',	
	{
		...editEntry, 
		value: parseInt(editEntry.value), 
	}, 
	{
		headers: { Authorization: `Bearer ${Cookies.get('UserToken')}` }
	}),
	{
		onSuccess: (data) => {
			if(data.data.success){
				setEntries((prev) => prev.map((n) => (n.id === editEntry.id ? data.data.data.data : n)))
				resetAndClose();
			}
		},
		onError: (error) => {
			console.log(error);
			resetAndClose();
		},
	});

	return (
		<Modal 
			open={open}
			onClose={resetAndClose}
			sx={{overflow: 'scroll'}}>
			<Card sx={modalCardStyle}>
				<CardContent sx={{ p: 0 }}>
					<Box borderBottom={2} sx={{ p: 1, bgcolor: '#060739', display: 'flex', justifyContent: 'space-between' }}>
						<Typography variant="h1" sx={{ color: '#FFFFFF',ml: '20px' }}>
							Edit {label}
						</Typography>
						<IconButton sx={{ p: 0, mr: '20px' }} onClick={resetAndClose}>
							<CloseRoundedIcon sx={exitButtonStyle} />
						</IconButton>
					</Box>

					<Box sx={{p: 2, gap: 2, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
						<FormControl fullWidth error={!!error.name}>
							<InputLabel>Name</InputLabel>
							<OutlinedInput
								value={editEntry.name}
								label="Name"
								placeholder={"Type your "+label+"'s name"}
								onChange={(e) => setEditEntry({...editEntry, name: e.target.value})}/>
							 <FormHelperText>
								{(!!error.name) ? error.name : ''}
							</FormHelperText>
						</FormControl>	
						<FormControl fullWidth error={!!error.value}>
							<InputLabel>Value</InputLabel>
							<OutlinedInput
								value={editEntry.value}
								label="Value"
								placeholder={"Type the value of your "+label}
								onChange={(e) => setEditEntry({...editEntry, value: e.target.value})}
								endAdornment={<InputAdornment position="end">THB</InputAdornment>}/>
							 <FormHelperText>
								{(!!error.value) ? error.value : ''}
							</FormHelperText>
						</FormControl>	
						<FormControl fullWidth error={!!error.category}>
							<InputLabel id="category">Category</InputLabel>
							<Select
								labelId="category"
								value={editEntry.category}
								label="Category"
								onChange={(e) => setEditEntry({...editEntry, category: e.target.value})}> 
								{(label === 'asset') ? 
								(assetCategories.map((category, index) => (
								<MenuItem value={category} key={index}>{category}</MenuItem>))) :
								(label === 'liability') ? 
								(liabilityCategories.map((category, index) => (
								<MenuItem value={category} key={index}>{category}</MenuItem>))) : 
								<></>}
							</Select>
							<FormHelperText>
								{(!!error.category) ? error.category : ''}
							</FormHelperText>
						</FormControl>
						<Button 
							sx={primaryButtonStyle}
							onClick={handleSubmit}>
							Edit
						</Button>
					</Box>
				</CardContent>
			</Card>
		</Modal>
	);
}

export default EditEntryModal;