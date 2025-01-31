import { useState, useContext, useEffect } from "react";
import { Modal, Card, CardContent, Box, Typography, IconButton, Button } from "@mui/material";
import { useMutation } from "react-query";
import Cookies from "js-cookie";

import GlobalContext from "../../context/globalContext";
import Axios from "../../services/axiosInstance";

import DefaultModal from "./DefaultModal";

const DeleteEntryModal = ({ 
	open  = false, 
	label = '',
	entry = {}, 
	handleCloseDeleteEntry = () => {}
}) => {
	const [deleteEntry, setDeleteEntry] = useState(entry);

	const { entries, setEntries } = useContext(GlobalContext);

	useEffect(() => {
		setDeleteEntry(entry)
	}, [entry]);


	const handleSubmit = async () => {
		deleteMutation.mutate();
	};

	const deleteMutation = useMutation(() =>
	Axios.delete('/entry', 
	{
		data: {entryid: deleteEntry.id },
		headers: { Authorization: `Bearer ${Cookies.get('UserToken')}` }
	}),
	{
		onSuccess: (data) => {
			if(data.data.success){
				setEntries(entries.filter((item) => item.id !== entry.id));
				handleCloseDeleteEntry();
			}
		},
		onError: (error) => {
			console.log(error);
			handleCloseDeleteEntry();
		},
	});

	return (
		<DefaultModal
			open={open}
			title={'Delete '+entry}
			handleClose={handleCloseDeleteEntry}
		>
			<Box padding={4}>
				<Typography variant="body1">
				Are you sure you would like to delete the entry {' \''+entry.name+'\' '} ?
				</Typography>
			</Box>
			<Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-around'}}>
				<Button 
					variant="contained"
					color="warning"
					onClick={handleSubmit}>
					Yes
				</Button>
				<Button 
					variant="contained"
					color="secondary"
					onClick={handleCloseDeleteEntry}>
					No
				</Button>
			</Box>
		</DefaultModal>
	);
}

export default DeleteEntryModal;