import { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import EditEntryModal from "./modal/EditEntryModal";
import DeleteEntryModal from "./modal/DeleteEntryModal";

const iconButtonStyle = {
	color: "#060739",
	fontSize: '4rem',
	'&:hover': {
		color: '#5F60AC',
		boxShadow: 'none',
	},
}

function Entry({entry = {}, setLabel = () => {}}){
	const [openEditEntryModal, setOpenEditEntryModal] = useState(false);
	const [openDeleteEntryModal, setOpenDeleteEntryModal] = useState(false);

	const handleOpenEditEntry = () => setOpenEditEntryModal(true);
	const handleCloseEditEntry = () => setOpenEditEntryModal(false);

	const handleOpenDeleteEntry = () => setOpenDeleteEntryModal(true);
	const handleCloseDeleteEntry = () => setOpenDeleteEntryModal(false);

	return (
		<>
		<EditEntryModal 
			entry={entry}
			open={openEditEntryModal} 
			handleCloseEditEntry={handleCloseEditEntry} 
			label={entry.label}/>
		<DeleteEntryModal 
			entry={entry}
			open={openDeleteEntryModal} 
			handleCloseDeleteEntry={handleCloseDeleteEntry} 
			label={entry.label}/>
		<Box borderBottom={2} sx={{ display: 'flex', justifyContent: 'flex-start'}}>
			<Box 
				minWidth={"20px"} 
				mr={"10px"}
				bgcolor={
					(entry.label === 'asset') ? '#53E473' : 
					(entry.label === 'liability') ? '#FF4A4A' :
					'#F5F5F5'
				}/>
			<Box flexGrow={1}>
					<Typography variant="h1">{entry.name}</Typography>
					<Typography variant="h2">{entry.value+" THB"}</Typography>
					<Typography variant="subtitle1">{entry.category}</Typography>
			</Box>
			<Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
			<IconButton 
					onClick={() => {setLabel(entry.label); handleOpenEditEntry()}}>
				<EditNoteRoundedIcon sx={iconButtonStyle}/>
			</IconButton>
			<IconButton 
					onClick={() => {setLabel(entry.label); handleOpenDeleteEntry()}}>
				<DeleteRoundedIcon sx={iconButtonStyle}/>
			</IconButton>
			</Box>
		</Box>
		</>
	)
}
export default Entry;