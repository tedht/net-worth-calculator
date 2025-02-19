import { 
	Box, IconButton, Button, Table, TableBody, TableContainer, TableHead, 
	TableRow, TableCell, TableSortLabel, Paper, TextField, Toolbar
} from '@mui/material';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

import { visuallyHidden } from '@mui/utils';

import { StyledTableCell, StyledTableRow } from '../../styles/tableStyles';
import { useTheme } from '@emotion/react';

import { useGlobalContext, useModalContext } from '../../hooks/useContexts';
import { useState, useMemo } from 'react';
  
const headCells = [
	{
	  id: 'name',
	  numeric: false,
	  name: 'Name',
	},
	{
	  id: 'value',
	  numeric: true,
	  name: 'Value',
	},
	{
	  id: 'category',
	  numeric: false,
	  name: 'Category',
	},
];

const SearchTableToolbar = (props) => {
	const { search, setSearch } = props;

	return (
		<Box sx={{ backgroundColor: 'primary.main'}}>
		<Toolbar>
			<TextField 
			value={search}
			onChange={(e) => setSearch(e.target.value)}
			fullWidth
			label="Search"
			variant="filled"
			InputProps={{ style: { color: 'white' } }}
			/>
		</Toolbar>
		</Box>
	);
}

const SearchTableHead = (props) => {
	const { order, orderBy, handleRequestSort } = props;

	const createSortHandler = (property) => (event) => {
		handleRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				<StyledTableCell
					sx={{width: "20px"}}
					sortDirection={orderBy === 'type' ? order : false}
				>
					<TableSortLabel
						active={orderBy === 'type'}
						direction={orderBy === 'type' ? order : 'asc'}
						onClick={createSortHandler('type')}
					>
						{""}
						{orderBy === 'type' ? (
						<Box component="span" sx={visuallyHidden}>
							{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
						</Box>
						) : null}
					</TableSortLabel>
				</StyledTableCell>
				{headCells.map((headCell) => (
					<StyledTableCell
						key={headCell.id}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
							sx={{
								color: orderBy === headCell.id ? 'white' : 'inherit',
								'&.Mui-active': {
								  color: 'white',
								},
								'& .MuiTableSortLabel-icon': {
								  color: 'white !important',
								},
							}}
						>
							{headCell.name}
							{orderBy === headCell.id ? (
							<Box component="span" sx={visuallyHidden}>
								{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
							</Box>
							) : null}
						</TableSortLabel>
					</StyledTableCell>
				))}
				<StyledTableCell></StyledTableCell>
			</TableRow>
		</TableHead>
	);
}

const SearchTableBody = ({ visibleEntries }) => {
	const {
		handleOpenEditEntry,
		handleOpenDeleteEntry
	} = useModalContext();

	const theme = useTheme();

	return (
		<TableBody>
		{visibleEntries.map((entry) => (
		<StyledTableRow key={entry.id || `${entry.name}-${entry.value}`}>
			<StyledTableCell 
				sx={{bgcolor: entry.type.toLowerCase() === 'asset' 
				? theme.palette.custom.asset.main
				: theme.palette.custom.liability.main}}
			/>
			<StyledTableCell>{entry.name}</StyledTableCell>
			<StyledTableCell>{entry.value}</StyledTableCell>
			<StyledTableCell>{entry.category}</StyledTableCell>
			<StyledTableCell align='right'>
				<IconButton onClick={() => handleOpenEditEntry(entry.type.toLowerCase(), entry)}>
					<ModeEditIcon />
				</IconButton>
				<IconButton onClick={() => handleOpenDeleteEntry(entry.type.toLowerCase(), entry)}>
					<DeleteIcon />
				</IconButton>
			</StyledTableCell>
		</StyledTableRow>
		))}
		<StyledTableRow>
			<StyledTableCell colSpan={5}></StyledTableCell>
		</StyledTableRow>
	</TableBody>
	);
}

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
	  return -1;
	}
	if (b[orderBy] > a[orderBy]) {
	  return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc'
	? (a, b) => descendingComparator(a, b, orderBy)
	: (a, b) => -descendingComparator(a, b, orderBy);
}

const SearchTable = () => {
	const { entries } = useGlobalContext();

	const [search,  setSearch ] = useState('');
	const [order,   setOrder  ] = useState('asc');
	const [orderBy, setOrderBy] = useState('name');
	
	const visibleEntries = useMemo(
	() => [...entries]
		.sort(getComparator(order, orderBy))
		.filter(entry => 
			entry && 
			(entry.name.toLowerCase().includes(search.toLowerCase()) || 
			entry.someOtherField?.toLowerCase().includes(search.toLowerCase()))
	  	),
		[entries, order, orderBy, search]
	);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	return (
	<Paper sx={{ width: '100%', borderRadius: 2, overflow: 'hidden' }}>
	<SearchTableToolbar
		search={search}
		setSearch={setSearch}
	/>
	<TableContainer>
	<Table>
	<SearchTableHead
        order={order}
        orderBy={orderBy}
        handleRequestSort={handleRequestSort}
    />
	<SearchTableBody 
		visibleEntries={visibleEntries} 
	/>
	</Table>
    </TableContainer>
	</Paper>
	);
}
	
export default SearchTable;