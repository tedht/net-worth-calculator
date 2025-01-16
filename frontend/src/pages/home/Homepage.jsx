import { useState, useContext, useEffect } from 'react';
import { Grid, Box, Typography } from "@mui/material";
import ProfileCard from './components/cards/ProfileCard';
import AssetCard from './components/cards/AssetCard';
import LiabilityCard from './components/cards/LiabilityCard';
import LoginModal from './components/auth/LoginModal';
import CreateAccountModal from './components/auth/CreateAccountModal';
import AddEntryModal from './components/entries/modal/AddEntryModal';
import GlobalContext from '../../share/context/GlobalContext';
import Cookies from 'js-cookie';
import Axios from '../../share/AxiosInstance';
import { useQuery } from 'react-query';


function Homepage() {
  const { entries, setEntries, user } = useContext(GlobalContext);

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openCreateAccountModal, setOpenCreateAccountModal] = useState(false);
  const [label, setLabel] = useState('');
  const [openAddEntryModal, setOpenAddEntryModal] = useState(false);
  const [startFetch, setStartFetch] = useState(false);

  const handleOpenLogin = () => setOpenLoginModal(true);
  const handleCloseLogin = () => setOpenLoginModal(false);

  const handleOpenCreateAccount = () => setOpenCreateAccountModal(true);
  const handleCloseCreateAccount = () => setOpenCreateAccountModal(false);

  const handleOpenAddEntry = () => setOpenAddEntryModal(true);
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
    <LoginModal 
      open={openLoginModal} 
      handleCloseLogin={handleCloseLogin} 
      handleOpenCreateAccount={handleOpenCreateAccount}/>
    <CreateAccountModal 
      open={openCreateAccountModal} 
      handleCloseCreateAccount={handleCloseCreateAccount}
      handleOpenLogin={handleOpenLogin}/>
    <AddEntryModal 
      open={openAddEntryModal} 
      handleCloseAddEntry={handleCloseAddEntry} 
      label={label}/>
    <Grid container spacing={2} direction={"row"}>
      <Grid item xs={12}  sx={{ display: 'flex', justifyContent: 'center'}}>
        <Typography variant='h1'>Home</Typography>
      </Grid>

      <Grid item lg={1} display={{ xs: 'none', lg: 'block'}}/>

      <Grid item lg={4} md={5} xs={12}>
        <ProfileCard 
          handleOpenLogin={handleOpenLogin} 
          handleOpenCreateAccount={handleOpenCreateAccount}
          calculateNetworth={calculateNetworth}/>
      </Grid>
      
      <Grid item lg={6} md={7} xs={12}>
        <Box sx={{ mb: 2}}>
          <AssetCard 
            handleOpenAddEntry={handleOpenAddEntry} 
            setLabel={setLabel}/>
        </Box>
        <Box> 
          <LiabilityCard 
            handleOpenAddEntry={handleOpenAddEntry} 
            setLabel={setLabel}/>
        </Box>
      </Grid>
      
      

      <Grid item lg={1} display={{ xs: 'none', lg: 'block'}}/>

    </Grid>
    </>
  );
}

export default Homepage;