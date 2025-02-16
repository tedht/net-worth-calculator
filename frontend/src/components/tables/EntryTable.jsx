import { 
	Box, Typography, IconButton, Button, Table, TableBody, TableCell, 
	TableContainer, TableHead, TableRow, Paper 
} from '@mui/material';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

import { StyledTableCell, StyledTableRow } from '../../styles/tableStyles';
import { useGlobalContext, useModalContext } from '../../hooks/useContexts';

  
const EntryTable = ({ label = ''}) => {
	const { 
		entries, 
		user 
	} = useGlobalContext();

	const { 
		handleOpenAddEntry, 
		handleOpenEditEntry, 
		handleOpenDeleteEntry
	} = useModalContext();

	return (
	<>
	<Typography variant='h2' sx={{textAlign: 'center'}} gutterBottom>
		{(label === 'asset' ? 'Assets' : 'Liabilities')}
	</Typography>
	<TableContainer component={Paper}>
	<Table>
	<TableHead>
		<TableRow>
			<StyledTableCell label={label}>Name</StyledTableCell>
			<StyledTableCell label={label}>Value</StyledTableCell>
			<StyledTableCell label={label}>Category</StyledTableCell>
			<StyledTableCell label={label}></StyledTableCell>
		</TableRow>
	</TableHead>
	<TableBody>
		{entries.filter((entry) => entry.type.toLowerCase() === label.toLowerCase()).map((entry) => (
		<StyledTableRow key={entry.id || `${entry.name}-${entry.value}`}>
			<StyledTableCell>{entry.name}</StyledTableCell>
			<StyledTableCell >{entry.value}</StyledTableCell>
			<StyledTableCell >{entry.category}</StyledTableCell>
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
			<StyledTableCell colSpan={4}>
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
	</>
	);
}
	
export default EntryTable;