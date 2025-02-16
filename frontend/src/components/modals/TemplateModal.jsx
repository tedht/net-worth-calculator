import { Modal, Card, CardContent, Box, Typography, IconButton} from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useTheme } from '@mui/material';

const TemplateModal = ({ 
	open = false, 
	title = "",
	handleClose = () => {},
	children
}) => {
	const theme = useTheme();
	
	const modalCardStyle = {
		position: 'absolute',
		left: '50%',
		transform: 'translate(-50%, 0%)',
		width: { xs: '90%', md: '60%'},
		border: 2,
		borderRadius: 2,
		mt: 2,
		boxShadow: theme.shadows[10]
	}

	const modalHeaderStyle = { 
		p: 1,  
		background: theme.palette.primary.main,
		display: 'flex', 
		justifyContent: 'space-between' 
	}

	const modalBodyStyle = {
		p: 2, 
		gap: 2, 
		display: 'flex', 
		flexDirection: 'column', 
		alignItems: 'center'
	}

	return (
		<Modal 
			open={open}
			onClose={handleClose}
			sx={{overflow: 'scroll'}}>
			<Card sx={modalCardStyle}>
				<CardContent sx={{ p: 0 }}>

					{/* MODAL HEADER */}
					<Box sx={modalHeaderStyle} borderBottom={2}>
						<Typography variant="h6" color="secondary">
							{title}
						</Typography>

						<IconButton onClick={handleClose}>
							<CloseRoundedIcon color="secondary"/>
						</IconButton>
					</Box>
					
					{/*  MODAL BODY  */}
					<Box sx={modalBodyStyle}>
						{children}
					</Box>
				</CardContent>
			</Card>
		</Modal>
	);
}

export default TemplateModal;