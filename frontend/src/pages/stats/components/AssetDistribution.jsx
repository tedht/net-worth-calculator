import { Box, Card, CardContent, Typography } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import DistributionEntry from "./DistributionEntry";
import GlobalContext from "../../../context/globalContext";

const cardStyle = {
  border: 2,
  background: "#F5F5F5",
  borderRadius: 9,
  padding: 0,
}

function AssetDistribution({ calculateDistribution = () => {} }) {
  const [entriesDistribution, setEntriesDistribution] = useState([]);

  const { entries } = useContext(GlobalContext); 

  useEffect(() => {
    setEntriesDistribution(calculateDistribution('asset'));
  }, [entries])
  
  return (
    <Card sx={cardStyle}>
      <CardContent sx={{ p: 0 }}>
        <Box borderBottom={2} sx={{ bgcolor: '#53E473' }}>
          <Typography variant="h1" sx={{ ml: '20px' }}>
            Assets
          </Typography>
        </Box>
        {entriesDistribution.map((entry, index) => (entry.label === 'asset') && 
        (<DistributionEntry key={index} inputEntry={entry}/>))}
        <Box sx={{ mb: 5 }} />
      </CardContent>
    </Card>
  );
}
  
export default AssetDistribution;