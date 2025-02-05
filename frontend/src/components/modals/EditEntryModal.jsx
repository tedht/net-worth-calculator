import { useState, useContext, useEffect } from "react";
import { 
	Button, Select, MenuItem, InputLabel, FormControl, FormHelperText ,
	OutlinedInput, InputAdornment
} from "@mui/material";
import { useQueryClient } from "react-query";

import GlobalContext from "../../context/globalContext";

import TemplateModal from "./TemplateModal";
import { useEditEntry } from "../../hooks/useMutations";

const EditEntryModal = ({ 
	open  = false, 
	label = '',
	entry = {}, 
	handleCloseEditEntry = () => {}
}) => {
	const [editEntry, setEditEntry] = useState(entry);
	const [error,     setError    ] = useState({});

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

	const resetAndClose = () => {
		setEditEntry({});
		setError({});
		handleCloseEditEntry();
	}

	const handleSubmit = async () => {
		if(!validateForm())return;
		editMutation.mutate(entries, resetAndClose, setEntries);
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

	useEffect(() => {
		console.log("Edit entry updated:", entry);
		setEditEntry(entry);
	}, [entry]);

	const editMutation = useEditEntry(resetAndClose, setEntries, useQueryClient());
	// const editMutation = useMutation(() =>
	// Axios.patch('/entry',	
	// {
	// 	...editEntry, 
	// 	value: parseInt(editEntry.value), 
	// }, 
	// {
	// 	headers: { Authorization: `Bearer ${Cookies.get('UserToken')}` }
	// }),
	// {
	// 	onSuccess: (data) => {
	// 		if(data.data.success){
	// 			setEntries((prev) => prev.map((n) => (n.id === editEntry.id ? data.data.data.data : n)))
	// 			resetAndClose();
	// 		}
	// 	},
	// 	onError: (error) => {
	// 		console.log(error);
	// 		resetAndClose();
	// 	},
	// });

	return (
		<TemplateModal
			open={open}
			title={'Edit '+label}
			handleClose={resetAndClose}
		>

			<FormControl fullWidth error={!!error.name}>
				<InputLabel>Name</InputLabel>
				<OutlinedInput
					value={editEntry.name || ""}
					label="Name"
					placeholder={"Type your "+label+"'s name"}
					onChange={(e) => setEditEntry({...editEntry, name: e.target.value})}/>
					<FormHelperText>
					{error.name || ""}
				</FormHelperText>
			</FormControl>	

			<FormControl fullWidth error={!!error.value}>
				<InputLabel>Value</InputLabel>
				<OutlinedInput
					value={editEntry.value || ""}
					label="Value"
					placeholder={"Type the value of your "+label}
					onChange={(e) => setEditEntry({...editEntry, value: e.target.value})}
					endAdornment={<InputAdornment position="end">€</InputAdornment>}/>
					<FormHelperText>
					{error.value || ""}
				</FormHelperText>
			</FormControl>	

			<FormControl fullWidth error={!!error.category}>
				<InputLabel id="category">Category</InputLabel>
				<Select
					labelId="category"
					value={editEntry.category || ""}
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
					{error.category || ""}
				</FormHelperText>
			</FormControl>
			
			<Button 
				variant="contained"
				color="primary"
				onClick={handleSubmit}>
				Edit
			</Button>
		</TemplateModal>
	);
}

export default EditEntryModal;