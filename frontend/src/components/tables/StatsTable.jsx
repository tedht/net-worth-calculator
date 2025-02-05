import { useContext, useEffect, useState } from 'react';
import { 
	Box, Typography, IconButton, Button, Table, TableBody, TableCell, 
	TableContainer, TableHead, TableRow, Paper 
} from '@mui/material';

import GlobalContext from '../../context/globalContext';
import { StyledTableCell, StyledTableRow } from '../../styles/tableStyles';

const StatsTable = ({ label = '' }) => {
	const { entries } = useContext(GlobalContext);

	const calculateStats = (entries, label) => {
		const filteredEntries = entries
			.filter((entry) => entry.type.toLowerCase() === label.toLowerCase())
			.sort((a, b) => a.value - b.value);
	  
		if (filteredEntries.length === 0) {
			return {
				mean: 0,
				median: 0,
				max: 0,
				min: 0,
			};
		}
	  
		const totalValue = filteredEntries.reduce((acc, entry) => acc + Number(entry.value), 0);

		const mean = totalValue / filteredEntries.length;
	  
		const mid = Math.floor(filteredEntries.length / 2);
		const median = filteredEntries.length % 2 === 0
			? (Number(filteredEntries[mid - 1].value) + Number(filteredEntries[mid].value)) / 2
			: filteredEntries[mid].value;
	  
		const max = filteredEntries[filteredEntries.length - 1].value;
		const min = filteredEntries[0].value;

		return {
			mean,
			median,
			max,
			min,
		};
	};

	const [stats, setStats] = useState(calculateStats(entries, label));

	useEffect(() => {	
		setStats(calculateStats(entries, label));
	}, [entries]);

	return (
	<>
	<Typography variant='h2' sx={{textAlign: 'center'}} gutterBottom>
		{(label === 'asset' ? 'Assets' : 'Liabilities')}
	</Typography>
	<TableContainer component={Paper}>
	<Table>
	<TableHead>
		<TableRow>
			<StyledTableCell label={label}>Mean</StyledTableCell>
			<StyledTableCell label={label}>Median</StyledTableCell>
			<StyledTableCell label={label}>Max</StyledTableCell>
			<StyledTableCell label={label}>Min</StyledTableCell>
		</TableRow> 
	</TableHead>
	<TableBody>
		<StyledTableRow>
			<StyledTableCell>{stats.mean   || 0}</StyledTableCell>
			<StyledTableCell>{stats.median || 0}</StyledTableCell>
			<StyledTableCell>{stats.max    || 0}</StyledTableCell>
			<StyledTableCell>{stats.min    || 0}</StyledTableCell>
		</StyledTableRow>
	</TableBody>
	</Table>
    </TableContainer>
	</>
	);
}
	
export default StatsTable;