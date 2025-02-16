import { useState} from "react";
import { 
	Button, Select, MenuItem, InputLabel, FormControl, FormHelperText ,
	OutlinedInput, InputAdornment
} from "@mui/material";
import { useQueryClient } from "react-query";

import TemplateModal from "./TemplateModal";
import { useAddEntry } from "../../hooks/useMutations";

import { useGlobalContext } from "../../hooks/useContexts";

const AddEntryModal = ({ 
	open  = false, 
	label = '',
	handleCloseAddEntry = () => {} 
}) => {
	const [newEntry, setNewEntry] = useState({
		name: '',
		value: '',
		category: '',
	});
	const [error, setError] = useState({});

	const { setEntries, user } = useGlobalContext();

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
		setNewEntry({});
		setError({});
		handleCloseAddEntry();
	}

	const handleSubmit = () => {
		if(!validateForm()) return;
		newEntry.type = (label.toLowerCase() === 'asset') ? 'Asset' : 'Liability';
		newEntry.userId = user.id;
		addMutation.mutate(newEntry);
	};
	
	const validateForm = () => {
		const error = {};
		if (!newEntry.name)                         error.name     = 'Entry name is required';
		if (!newEntry.value && newEntry!=='0')      error.value    = 'Value is required';
		else if (!/^[0-9]*$/g.test(newEntry.value)) error.value    = 'Invalid value';
		if (!newEntry.category)                     error.category = 'Category is required';
		setError(error);

		if (Object.keys(error).length) return false;
		return true;
	}

	const addMutation = useAddEntry(resetAndClose, setEntries, useQueryClient())

	return (
		<TemplateModal
			open={open}
			title={'Add '+label}
			handleClose={resetAndClose}
		>
			<FormControl fullWidth error={!!error.name}>
				<InputLabel>Name</InputLabel>
				<OutlinedInput
					value={newEntry.name || ""}
					label="Name"
					placeholder={"Type your "+label+"'s name"}
					onChange={(e) => setNewEntry({...newEntry, name: e.target.value})}/>
					<FormHelperText>
					{error.name || ""}
				</FormHelperText>
			</FormControl>	

			<FormControl fullWidth error={!!error.value}>
				<InputLabel>Value</InputLabel>
				<OutlinedInput
					value={newEntry.value || ""}
					label="Value"
					placeholder={"Type the value of your "+label}
					onChange={(e) => setNewEntry({...newEntry, value: e.target.value})}
					endAdornment={<InputAdornment position="end">€</InputAdornment>}/>
					<FormHelperText>
					{error.value || ""}
				</FormHelperText>
			</FormControl>	

			<FormControl fullWidth error={!!error.category}>
				<InputLabel id="category">Category</InputLabel>
				<Select
					labelId="category"
					value={newEntry.category || ""}
					label="Category"
					onChange={(e) => setNewEntry({...newEntry, category: e.target.value})}> 
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
				onClick={handleSubmit}
			>
				Submit
			</Button>
		</TemplateModal>
	);
}

export default AddEntryModal;