import { useContext } from 'react';
import { Box, Card, CardContent, Typography, IconButton, Button } from '@mui/material';
import { useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

import GlobalContext from '../../../share/GlobalContext';

const iconButtonStyle = {
	color: '#060739',
	fontSize: '4rem',
	'&:hover': {
		color: '#5F60AC',
		boxShadow: 'none',
	},
}

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

const createData = (name, value, category) => {
	return { name, value, category };
}
  
const rows = [
	createData('Frozen yoghurt', 159, 'cat 1'),
	createData('Ice cream sandwich', 237, 'cat 1'),
	createData('Eclair', 262, 'cat 1'),
	createData('Brownie', 262, 'cat 1'),
];

const EntryTable = ({
	label = '',
	handleOpenAddEntry = (label) => {}, 
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
		{rows.map((row) => (
		<StyledTableRow key={row.name}>
			<StyledTableCell label={label} component='th' scope='row'>
			{row.name}
			</StyledTableCell>
			<StyledTableCell label={label}>{row.value}</StyledTableCell>
			<StyledTableCell label={label}>{row.category}</StyledTableCell>
			<StyledTableCell label={label} align='right'>
				<IconButton onClick={() => handleEdit(row.id)}>
					<ModeEditIcon />
				</IconButton>
				<IconButton onClick={() => handleDelete(row.id)}>
					<DeleteIcon />
				</IconButton>
			</StyledTableCell>
		</StyledTableRow>
		))}
		<StyledTableRow>
			<StyledTableCell label={label} colSpan={4}>
				<Box sx={{display: 'flex', justifyContent: 'center'}}>
					<Button variant='contained' color='primary' onClick={() => handleOpenAddEntry(label)}>Add {label}</Button>
				</Box>
			</StyledTableCell>
		</StyledTableRow>
	</TableBody>
	</Table>
    </TableContainer>
	{(user) && (
	<IconButton 
		sx={{ p: 0 }}
		onClick={() => {handleOpenAddEntry(label)}}
	>
		<AddCircleOutlineRoundedIcon sx={iconButtonStyle}/>
	</IconButton>)}
	</>
	);
}
	
export default EntryTable;