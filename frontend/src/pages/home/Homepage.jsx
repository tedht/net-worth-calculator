import { useState, useContext, useEffect } from 'react';
import { Grid, Box, Typography } from "@mui/material";
import ProfileCard from './components/cards/ProfileCard';
import AssetCard from './components/cards/AssetCard';
import LiabilityCard from './components/cards/LiabilityCard';
import AddEntryModal from './components/modals/AddEntryModal';
import GlobalContext from '../../share/GlobalContext';
import Cookies from 'js-cookie';
import Axios from '../../share/AxiosInstance';
import { useQuery } from 'react-query';

import EntryTable from './components/EntryTable';


const Homepage = () => {
	const { entries, setEntries, user } = useContext(GlobalContext);
	const [label, setLabel] = useState('');
	const [openAddEntryModal, setOpenAddEntryModal] = useState(false);
	const [startFetch, setStartFetch] = useState(false);

	const handleOpenAddEntry = (label) => {setLabel(label); setOpenAddEntryModal(true);};
	const handleCloseAddEntry = () => setOpenAddEntryModal(false);
	
	const fetchEntries = async () => {
		const userToken = Cookies.get('UserToken');
		return await Axios.get('/entries', {
			headers: { 
				Authorization: `Bearer ${userToken}`,
			},
		});
	};

	useEffect(() => {
		const userToken = Cookies.get('UserToken');
		setStartFetch(!(userToken == null || userToken == 'undefined'));
	}, [entries, user])

	useQuery('entries', fetchEntries, {
		onSuccess: (data) => {
			if(data.data.success){
				setEntries(data.data.data);
			}
		},
		onError: (error) => {
			console.log(error);
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
			handleCloseAddEntry={handleCloseAddEntry} 
			label={label}/>

		{/* <Typography variant='h1'>Title 1</Typography>
		<Typography variant='h2'>Title 2</Typography>
		<Typography variant='subtitle'>Subtitle</Typography>
		<Typography variant='body1'>Body 1</Typography>
		<Typography variant='button'>button</Typography> */}
			
		<Grid container spacing={2} direction={"row"}>
			<Grid item xs={12}>
				<Typography variant='h1' sx={{textAlign: 'center'}}>Home</Typography>
			</Grid>
 
			{/*<Grid item lg={4} md={5} xs={12}>
				<ProfileCard 
					handleOpenLogin={()=>{}} 
					handleOpenCreateAccount={()=>{}}
					calculateNetworth={calculateNetworth}/>
			</Grid> */}
			
			<Grid item lg={6} xs={12}>
				<EntryTable label='asset' handleOpenAddEntry={handleOpenAddEntry}/>
			</Grid>

			<Grid item lg={6} xs={12}>
				<EntryTable label='liability' handleOpenAddEntry={handleOpenAddEntry}/>
			</Grid>
		</Grid>
		</>
	);
}

export default Homepage;