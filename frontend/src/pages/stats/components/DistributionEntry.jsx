import { useContext, useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";

function DistributionEntry({inputEntry = {}}){
  const [entry, setEntry] = useState(inputEntry);

  return (
    <Box borderBottom={2} sx={{ display: 'flex', flexDirection: 'row'}}>
      <Box 
        minWidth={"20px"} 
        mr={"10px"}
        bgcolor={
          (entry.label === 'asset') ? '#53E473' : 
          (entry.label === 'liability') ? '#FF4A4A' :
          '#F5F5F5'
        }/>
      <Box flexGrow={1}>
        <Typography variant="h1">{entry.name}</Typography>
        <Typography variant="h2">{entry.value+" THB"}</Typography>
        <Typography variant="subtitle1">{entry.category}</Typography>  
      </Box>
      <Box sx={{
          display: 'flex',
          textAlign: 'right',
          alignItems: 'center',
          mr: '5px'
        }}>
        <Typography variant="h1">{entry.distribution+"%"}</Typography>   
        </Box>
    </Box>
  )
}
export default DistributionEntry;