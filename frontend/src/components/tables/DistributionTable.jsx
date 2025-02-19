import { useEffect, useState } from 'react';
import { 
	Typography, Table, TableBody, TableContainer, TableHead, TableRow, Paper 
} from '@mui/material';

import { StyledTableCell, StyledTableRow } from '../../styles/tableStyles';

import { useGlobalContext } from '../../hooks/useContexts';

const DistributionTable = ({ label = '' }) => {
	const { entries } = useGlobalContext();

	const calculateDistribution = (entries, label) => {
		const filteredEntries = entries
			.filter((entry) => entry.type.toLowerCase() === label.toLowerCase());
	
		const totalValue = filteredEntries.reduce((sum, entry) => sum + Number(entry.value), 0);
	
		if (totalValue === 0) return [];
	
		const distribution = filteredEntries.map((entry) => ({
			name: entry.name,
			value: Number(entry.value),
			percentage: ((Number(entry.value) / totalValue) * 100).toFixed(2), // Round to 2 decimal places
		}));
	
		return distribution.sort((a, b) => b.value - a.value);
	};
	

	const [distribution, setDistribution] = useState(calculateDistribution(entries, label));

	useEffect(() => {	
		setDistribution(calculateDistribution(entries, label));
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
			<StyledTableCell label={label}>Name</StyledTableCell>
			<StyledTableCell label={label}>Value</StyledTableCell>
			<StyledTableCell label={label}>Percentage</StyledTableCell>
		</TableRow> 
	</TableHead>
	<TableBody>
		{distribution.map((entry) => (
		<StyledTableRow key={entry.id || `${entry.name}-${entry.value}`}>
			<StyledTableCell>{entry.name       || 0}</StyledTableCell>
			<StyledTableCell>{entry.value      || 0}</StyledTableCell>
			<StyledTableCell>{entry.percentage || 0}%</StyledTableCell>
		</StyledTableRow>))}
		{distribution.length === 0 && 		
		<StyledTableRow>
			<StyledTableCell colSpan={3}></StyledTableCell>
		</StyledTableRow>}
	</TableBody>
	</Table>
    </TableContainer>
	</>
	);
}
	
export default DistributionTable;