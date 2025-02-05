import { useContext, useEffect } from 'react';
import { 
	Box, Typography, IconButton, Button, Table, TableBody, TableCell, 
	TableContainer, TableHead, TableRow, Paper 
} from '@mui/material';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

import GlobalContext from '../../context/globalContext';
import { StyledTableCell, StyledTableRow } from '../../styles/tableStyles';
import { useTheme } from '@emotion/react';
  
const SearchTable = ({
	label = '',
	handleOpenAddEntry = (label) => {}, 
	handleOpenEditEntry = (entry) => {}, 
	handleOpenDeleteEntry = (entry) => {}, 
}) => {
	const { entries, user } = useContext(GlobalContext);
	const theme = useTheme();

	return (
	<TableContainer component={Paper}>
	<Table>
	<TableHead>
		<TableRow>
			<StyledTableCell sx={{width: "20px"}}></StyledTableCell>
			<StyledTableCell>Name</StyledTableCell>
			<StyledTableCell>Value</StyledTableCell>
			<StyledTableCell>Category</StyledTableCell>
			<StyledTableCell></StyledTableCell>
		</TableRow>
	</TableHead>
	<TableBody>
		{entries.map((entry) => (
		<StyledTableRow key={entry.name}>
			<StyledTableCell 
				sx={{bgcolor: entry.type.toLowerCase() === 'asset' 
				? theme.palette.custom.asset.main
				: theme.palette.custom.liability.main}}
			/>
			<StyledTableCell>{entry.name}</StyledTableCell>
			<StyledTableCell>{entry.value}</StyledTableCell>
			<StyledTableCell>{entry.category}</StyledTableCell>
			<StyledTableCell align='right'>
				<IconButton onClick={() => handleOpenEditEntry(label, entry)}>
					<ModeEditIcon />
				</IconButton>
				<IconButton onClick={() => handleOpenDeleteEntry(label, entry)}>
					<DeleteIcon />
				</IconButton>
			</StyledTableCell>
		</StyledTableRow>
		))}
		<StyledTableRow>
			<StyledTableCell colSpan={5}>
				<Box sx={{display: 'flex', justifyContent: 'center'}}>
					<Button 
						variant='contained' 
						color='primary' 
						startIcon={<AddRoundedIcon />}
						onClick={() => handleOpenAddEntry(label)}
						disabled={!user}
					>
						Add {label}
					</Button>
				</Box>
			</StyledTableCell>
		</StyledTableRow>
	</TableBody>
	</Table>
    </TableContainer>
	);
}
	
export default SearchTable;