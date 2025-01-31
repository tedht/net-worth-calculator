import { useContext, useState } from "react";
import { Card, CardContent, Box, TextField, IconButton } from "@mui/material";
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import FilterModal from "../../../components/modals/FilterModal";

import GlobalContext from "../../../context/globalContext";

const cardStyle = {
  border: 2,
  background: "#F5F5F5",
  borderRadius: 9,
  padding: 0,
  minHeight: 400
}

const searchBarStyle = {
  background: "#FFFFFF", 
  width: "80%"
}

const filterAltButtonStyle = {
  color: "#FFFFFF",
  fontSize: '220%',
  '&:hover': {
    color: '#5F60AC',
    boxShadow: 'none',
  },
}

function SearchCard({
  filteredEntries = [], 
  setFilter = () => {},
  search = '',
  setSearch = () => {},
  setLabel = () => {}
}){
  const { entries } = useContext(GlobalContext);
  const [openFilterModal, setOpenFilterModal] = useState(false);

  const handleOpenFilterModal = () => setOpenFilterModal(true);
  const handleCloseFilterModal = () => setOpenFilterModal(false);

  return(
    <>
    <FilterModal 
      open={openFilterModal} 
      handleCloseFilterModal={handleCloseFilterModal}
      setFilter={setFilter} />
    <Card sx={cardStyle}>
      <CardContent sx={{ p: 0 }}>
        <Box 
          borderBottom={2}   
          sx={{ bgcolor: '#060739', 
                p: 2, 
                pl: 4, 
                display: 'flex',
                justifyContent: 'space-between',}}>
          <Box sx={searchBarStyle}>
          <TextField 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            label="Search"
            variant="filled"/>
          </Box>
          <IconButton sx={{ p: 0 }} onClick={handleOpenFilterModal}>
            <FilterAltRoundedIcon sx={filterAltButtonStyle}/>
          </IconButton>
        </Box>
        {/* {filteredEntries.map((entry, index) => (<Entry key={index} entry={entry} setLabel={setLabel}/>))} */}
        <Box sx={{ mb: 20 }}/>
      </CardContent>
    </Card>
    </>
  );
}
export default SearchCard;