import { Typography, Grid } from "@mui/material";
import StatsTable from "../components/tables/StatsTable";
import DistributionTable from "../components/tables/DistributionTable";

const Stats = () => {
  
  return (
	<Grid container spacing={2}>

		<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
			<Typography variant='h1'>Stats</Typography>
		</Grid>

		<Grid item md={1} display={{ xs: 'none', md: 'block'}}/>

		<Grid item md={5} xs={12}>
			<StatsTable label="asset"/>
		</Grid>
		<Grid item md={5} xs={12}>
			<StatsTable label="liability"/>
		</Grid>

		<Grid item md={1} display={{ xs: 'none', md: 'block'}}/>

		<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
			<Typography variant='h1'>Distribution</Typography>
		</Grid>

		<Grid item md={1} display={{ xs: 'none', md: 'block'}}/>

		<Grid item md={10} xs={12}>
			<DistributionTable label={'asset'}/>
		</Grid>

		<Grid item md={1} display={{ xs: 'none', md: 'block'}}/>
		<Grid item md={1} display={{ xs: 'none', md: 'block'}}/>

		<Grid item md={10} xs={12}>
			<DistributionTable label={'liability'}/>
		</Grid>

		<Grid item md={1} display={{ xs: 'none', md: 'block'}}/>
	</Grid>
  );
}

export default Stats;