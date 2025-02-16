import { Grid, Typography } from "@mui/material";

import ProfileCard from '../components/cards/ProfileCard'
import EntryTable from '../components/tables/EntryTable';

const Home = () => {
	return (
		<Grid container spacing={2} direction={"row"}>
			<Grid item xs={12}>
				<Typography variant='h1' sx={{textAlign: 'center'}}>Home</Typography>
			</Grid>
 
			<Grid item lg={4} md={3} xs={0}></Grid>

			<Grid item lg={4} md={6} xs={12}>
				<ProfileCard/>
			</Grid>
			
			<Grid item lg={6} xs={12}>
				<EntryTable label='asset'/>
			</Grid>

			<Grid item lg={6} xs={12}>
				<EntryTable label='liability' />
			</Grid>
		</Grid>
	);
}

export default Home;