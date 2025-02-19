import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useQueryClient } from "react-query";

import TemplateModal from "./TemplateModal";
import { useDeleteEntry } from "../../hooks/useMutations";

import { useGlobalContext } from "../../hooks/useContexts";

const DeleteEntryModal = ({ 
	open  = false, 
	entry = {}, 
	handleCloseDeleteEntry = () => {}
}) => {
	const [deleteEntry, setDeleteEntry] = useState(entry);

	const { entries, setEntries } = useGlobalContext();


	useEffect(() => {
		console.log("Delete entry updated:", entry);
		setDeleteEntry(entry);
	}, [entry]);

	const handleSubmit = async () => {
		deleteMutation.mutate(deleteEntry);
	};

	const deleteMutation = useDeleteEntry(handleCloseDeleteEntry, setEntries, useQueryClient());

	return (
		<TemplateModal
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
		</TemplateModal>
	);
}

export default DeleteEntryModal;