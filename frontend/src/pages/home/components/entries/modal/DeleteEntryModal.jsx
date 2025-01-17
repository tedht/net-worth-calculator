import { useState, useContext, useEffect } from "react";
import { Modal, Card, CardContent, Box, Typography, IconButton, Button } from "@mui/material";
import GlobalContext from "../../../../../share/context/GlobalContext";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { useMutation } from "react-query";
import Axios from "../../../../../share/AxiosInstance";
import Cookies from "js-cookie";

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
	width: "20%",
	height: "100%",
	border: 2,
	borderColor: "#060739",
	color: "#FFFFFF",
	backgroundColor: "#060739",
	borderRadius: 4,
	textAlign: "center",
	padding: "10px",
	boxShadow: 2,
	'&:hover': {
		backgroundColor: '#5F60AC',
		borderColor: '#5F60AC',
	},
}

const secondaryButtonStyle = {
	width: "20%",
	height: "100%",
	border: 2,
	color: "#060739",
	backgroundColor: "#FFFFFF",
	borderRadius: 4,
	textAlign: "center",
	padding: "10px",
	boxShadow: 2,
	'&:hover': {
		backgroundColor: '#5F60AC',
		color: "#FFFFFF",
		borderColor: '#5F60AC',
	},
}

function DeleteEntryModal({ entry = {}, open = false, handleCloseDeleteEntry = () => {}, label = '' }){
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
		<Modal 
			open={open}
			onClose={handleCloseDeleteEntry}
			sx={{overflow: 'scroll'}}>
			<Card sx={modalCardStyle}>
				<CardContent sx={{ p: 0 }}>
					<Box borderBottom={2} sx={{ p: 1, bgcolor: '#060739', display: 'flex', justifyContent: 'space-between' }}>
						<Typography variant="h1" sx={{ color: '#FFFFFF',ml: '20px' }}>
							Delete {label}
						</Typography>
						<IconButton sx={{ p: 0, mr: '20px' }} onClick={handleCloseDeleteEntry}>
							<CloseRoundedIcon sx={exitButtonStyle} />
						</IconButton>
					</Box>

					<Box sx={{p: 2, gap: 2, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
						<Box padding={4}>
							<Typography variant="subtitle1">
							Are you sure you would like to delete this entry?
							</Typography>
						</Box>
						<Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-around'}}>
							<Button 
								sx={primaryButtonStyle}
								onClick={handleSubmit}>
								Yes
							</Button>
							<Button 
								sx={secondaryButtonStyle}
								onClick={handleCloseDeleteEntry}>
								No
							</Button>
						</Box>
					</Box>
				</CardContent>
			</Card>
		</Modal>
	);
}

export default DeleteEntryModal;