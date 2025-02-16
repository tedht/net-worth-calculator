import { useState, useContext, useEffect } from "react";
import { Grid, Typography } from "@mui/material";

import GlobalContext from "../context/globalContext";
import Axios from "../services/axiosInstance";
import Cookies from "js-cookie";
import { useQuery } from "react-query";
import SearchTable from "../components/tables/SearchTable";

import { useGlobalContext } from "../hooks/useContexts";

function Search() {

//   const [startFetch, setStartFetch] = useState(false);

//   const fetchFilteredEntries = async () => {
//     const userToken = Cookies.get('UserToken');
//     return await Axios.post('/search', {
//       data: {...filter, search: search },      
//       headers: { Authorization: `Bearer ${userToken}` },
//     });
//   };
  
//   useEffect(() => {
//     if(validateFilter() && user){
//       const userToken = Cookies.get('UserToken');
//       setStartFetch(!(userToken == null || userToken == 'undefined'));
//     } else {
//       setFilteredEntries([]);
//     }
//   }, [entries, user])

//   useQuery('filteredEntries', fetchFilteredEntries, {
//     onSuccess: (data) => {
//       if(data.data.success){
//         setFilteredEntries(data.data.data);
//         setStartFetch(false);
//       }
//     },
//     onError: (error) => {
//       console.log(error);
//       setStartFetch(false);
//     },
//     enabled: startFetch,
//   });


//   const validateFilter = () => {
//     const noLabels = (!filter.checkedAssets && !filter.checkedLiabilities)
//     const noCategories = (
//       !filter.checkedBankAccount &&
//       !filter.checkedRealEstate &&
//       !filter.checkedCar &&
//       !filter.checkedDebt &&
//       !filter.checkedLoan &&
//       !filter.checkedAssetOther &&
//       !filter.checkedLiabilityOther);
//     return (!(noLabels || noCategories))
//   }

  return (
	<>	

	<Grid container spacing={2}>

	<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
	<Typography variant='h1'>Search</Typography>
	</Grid>

	<Grid item md={1} display={{ xs: 'none', md: 'block'}}/>

	<Grid item lg={10} xs={12}>
	<SearchTable/>
	</Grid> 

	<Grid item md={1} display={{ xs: 'none', md: 'block'}}/>
	</Grid>
	</>
  );
}
  
export default Search;