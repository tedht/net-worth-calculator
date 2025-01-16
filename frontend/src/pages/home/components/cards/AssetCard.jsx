import { useContext } from "react";
import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Entry from "../entries/Entry";
import GlobalContext from "../../../../share/context/GlobalContext";

const cardStyle = {
  border: 2,
  background: "#F5F5F5",
  borderRadius: 9,
  padding: 0,
}

const iconButtonStyle = {
  color: "#060739",
  fontSize: '4rem',
  '&:hover': {
    color: '#5F60AC',
    boxShadow: 'none',
  },
}

function AssetCard({handleOpenAddEntry = () => {}, setLabel = () => {}}) {
  const { entries, user } = useContext(GlobalContext);

  return (
    <Card sx={cardStyle}>
      <CardContent sx={{
              p: 0,
              m: 0}}>
        <Box borderBottom={2} sx={{ bgcolor: '#53E473' }}>
          <Typography variant="h1" sx={{ ml: '20px' }}>
            Assets
          </Typography>
        </Box>
        {entries.map((entry, index) =>  (entry.label === 'asset') && 
        (<Entry key={index} entry={entry} setLabel={setLabel}/>))}
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3}}>
          {(user) && (<IconButton 
            sx={{ p: 0 }}
            onClick={() => {setLabel('asset'); handleOpenAddEntry()}}>
            <AddCircleOutlineRoundedIcon sx={iconButtonStyle}/>
          </IconButton>)}
        </Box>
      </CardContent>
    </Card>
  );
}
  
export default AssetCard;