import { useState, useContext, useEffect } from 'react';
import { Grid, Box, Typography } from "@mui/material";
import ProfileCard from '../components/cards/ProfileCard'
import AddEntryModal from '../components/modals/AddEntryModal';
import EditEntryModal from '../components/modals/EditEntryModal';
import DeleteEntryModal from '../components/modals/DeleteEntryModal';
import GlobalContext from "../context/globalContext";
import Cookies from 'js-cookie';
import { useQuery } from 'react-query';

import EntryTable from '../components/tables/EntryTable';


const Homepage = () => {
	const { entries, setEntries, user } = useContext(GlobalContext);

	const [label, setLabel] = useState('');
	const [entry, setEntry] = useState({});

	const [openAddEntryModal,    setOpenAddEntryModal   ] = useState(false);
	const [openEditEntryModal,   setOpenEditEntryModal  ] = useState(false);
	const [openDeleteEntryModal, setOpenDeleteEntryModal] = useState(false);

	const handleOpenAddEntry = (label) => {
		setLabel(label); 
		setOpenAddEntryModal(true);
	};
	const handleCloseAddEntry = () => {
		setLabel(''); 
		setOpenAddEntryModal(false);
	};

	const handleOpenEditEntry = (label, entry) => {
		console.log(label);
		console.log(entry);
		setLabel(label);
		setEntry(entry);
		setOpenEditEntryModal(true);
	};
	const handleCloseEditEntry = () => {
		setLabel('');
		setEntry({}); 
		setOpenEditEntryModal(false);
	};

	const handleOpenDeleteEntry = (label,entry) => {
		setLabel(label);
		setEntry(entry); 
		setOpenDeleteEntryModal(true);
	};
	const handleCloseDeleteEntry = () => {
		setLabel('');
		setEntry({});
		setOpenDeleteEntryModal(false);
	};

	const [startFetch, setStartFetch] = useState(false);

	const fetchEntries = async () => {
		const userToken = Cookies.get('UserToken');
		const userId = Cookies.get('UserId');

		if (!userToken || !userId) return [];

		try {
			const response = await Axios.get(`/entries?userId=${userId}`, {
				headers: { Authorization: `Bearer ${userToken}` },
			});
			return response.data;
		} catch (error) {
			console.error("Error fetching entries:", error);
			return [];
		}
	};

	useEffect(() => {
		const userToken = Cookies.get('UserToken');
		setStartFetch(Boolean(userToken && userToken !== 'undefined'));
	}, [Cookies.get('UserToken')]);

	useQuery('entries', fetchEntries, {
		onSuccess: (data) => {
			setEntries(data);
			console.log("fetched");
			console.log(data);
		},
		onError: (error) => {
			console.error(error);
		},
		enabled: startFetch,
	});


	const calculateNetworth = () => {
		let assetsTotalValue = 0;
		let liabilitiesTotalValue = 0;

		entries.map((entry) => {
			if(entry.label==='asset') assetsTotalValue += entry.value;
			else if(entry.label==='liability') liabilitiesTotalValue += entry.value;
		});
		return (assetsTotalValue - liabilitiesTotalValue);
	}

	return (
		<>
		<AddEntryModal
			open={openAddEntryModal}
			label={label}
			handleCloseAddEntry={handleCloseAddEntry} 
		/>
		<EditEntryModal 
			open={openEditEntryModal} 
			label={label}
			entry={entry}
			handleCloseEditEntry={handleCloseEditEntry} 
		/>
		<DeleteEntryModal 
			open={openDeleteEntryModal} 
			entry={entry}
			handleCloseDeleteEntry={handleCloseDeleteEntry} 
		/>
			
		<Grid container spacing={2} direction={"row"}>
			<Grid item xs={12}>
				<Typography variant='h1' sx={{textAlign: 'center'}}>Home</Typography>
			</Grid>
 
			<Grid item lg={4} md={3} xs={0}></Grid>
			<Grid item lg={4} md={6} xs={12}>
				<ProfileCard 
					handleOpenLogin={()=>{}} 
					handleOpenCreateAccount={()=>{}}
					calculateNetworth={calculateNetworth}
				/>
			</Grid>
			
			<Grid item lg={6} xs={12}>
				<EntryTable 
					label='asset' 
					handleOpenAddEntry={handleOpenAddEntry}
					handleOpenEditEntry={handleOpenEditEntry}
					handleOpenDeleteEntry={handleOpenDeleteEntry}
				/>
			</Grid>

			<Grid item lg={6} xs={12}>
				<EntryTable 
					label='liability' 
					handleOpenAddEntry={handleOpenAddEntry}
					handleOpenEditEntry={handleOpenEditEntry}
					handleOpenDeleteEntry={handleOpenDeleteEntry}
				/>
			</Grid>
		</Grid>
		</>
	);
}

export default Homepage;