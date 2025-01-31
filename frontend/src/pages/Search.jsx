import { useState, useContext, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import SearchCard from "./search/cards/SearchCard";

import GlobalContext from "../context/globalContext";
import Axios from "../services/axiosInstance";
import Cookies from "js-cookie";
import { useQuery } from "react-query";

function Search() {
  const { entries, user } = useContext(GlobalContext);
  const [label, setLabel] = useState('');
  const [filteredEntries, setFilteredEntries] = useState(entries);

  const [startFetch, setStartFetch] = useState(false);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({
    checkedAssets: true,
    checkedLiabilities: true,
    order: "Alphabetical (a-z)",
    checkedBankAccount: true,
    checkedRealEstate: true,
    checkedCar: true,
    checkedAssetOther: true,
    checkedDebt: true,
    checkedLoan: true,
    checkedLiabilityOther: true,
  });

  const fetchFilteredEntries = async () => {
    const userToken = Cookies.get('UserToken');
    return await Axios.post('/search', {
      data: {...filter, search: search },      
      headers: { Authorization: `Bearer ${userToken}` },
    });
  };
  
  useEffect(() => {
    if(validateFilter() && user){
      const userToken = Cookies.get('UserToken');
      setStartFetch(!(userToken == null || userToken == 'undefined'));
    } else {
      setFilteredEntries([]);
    }
  }, [entries, user, search, filter])

  useQuery('filteredEntries', fetchFilteredEntries, {
    onSuccess: (data) => {
      if(data.data.success){
        setFilteredEntries(data.data.data);
        setStartFetch(false);
      }
    },
    onError: (error) => {
      console.log(error);
      setStartFetch(false);
    },
    enabled: startFetch,
  });

  useEffect(() => {

  }, [filter])

  const validateFilter = () => {
    const noLabels = (!filter.checkedAssets && !filter.checkedLiabilities)
    const noCategories = (
      !filter.checkedBankAccount &&
      !filter.checkedRealEstate &&
      !filter.checkedCar &&
      !filter.checkedDebt &&
      !filter.checkedLoan &&
      !filter.checkedAssetOther &&
      !filter.checkedLiabilityOther);
    return (!(noLabels || noCategories))
  }

  return (
    <Grid container spacing={2}>

    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
      <Typography variant='h1'>Search</Typography>
    </Grid>

    <Grid item md={1} display={{ xs: 'none', md: 'block'}}/>

    <Grid item md={10} xs={12}>
      <SearchCard 
        filteredEntries={filteredEntries}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
        setLabel={setLabel}/>
    </Grid>

      <Grid item md={1} display={{ xs: 'none', md: 'block'}}/>
    </Grid>
  );
}
  
export default Search;