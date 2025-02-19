import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { TableRow, TableCell } from '@mui/material';

export const StyledTableCell = styled(TableCell)(({ theme, label }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: label === 'asset' 
		                 ? theme.palette.custom.asset.main
						 : label === 'liability'
						 ? theme.palette.custom.liability.main
						 : theme.palette.primary.main,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));
  
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));