import { useContext } from 'react';
import { Box, Card, CardContent, Typography, IconButton, Button } from '@mui/material';
import { useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

import GlobalContext from '../../context/globalContext';

const StyledTableCell = styled(TableCell)(({ theme, label }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: label === 'asset' 
		                 ? theme.palette.custom.asset.main
						 : theme.palette.custom.liability.main,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));
  
const EntryTable = ({
	label = '',
	handleOpenAddEntry = (label) => {}, 
	handleOpenEditEntry = (entry) => {}, 
	handleOpenDeleteEntry = (entry) => {}, 
}) => {
	const { entries, user } = useContext(GlobalContext);
	const theme = useTheme();

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
		<StyledTableRow key={entry.name}>
			<StyledTableCell label={label} component='th' scope='row'>
			{entry.name}
			</StyledTableCell>
			<StyledTableCell label={label}>{entry.value}</StyledTableCell>
			<StyledTableCell label={label}>{entry.category}</StyledTableCell>
			<StyledTableCell label={label} align='right'>
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
			<StyledTableCell label={label} colSpan={4}>
				<Box sx={{display: 'flex', justifyContent: 'center'}}>
					<Button 
						variant='contained' 
						color='primary' 
						startIcon={<AddRoundedIcon />}
						onClick={() => handleOpenAddEntry(label)}
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