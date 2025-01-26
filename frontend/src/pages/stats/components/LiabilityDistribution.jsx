import { Box, Card, CardContent, Typography } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import DistributionEntry from "./DistributionEntry";
import GlobalContext from "../../../share/GlobalContext";

const cardStyle = {
  border: 2,
  background: "#F5F5F5",
  borderRadius: 9,
  padding: 0,
}

function LiabilityDistribution({calculateDistribution = () => {}}) {
  const [entriesDistribution, setEntriesDistribution] = useState([]);

  const { entries } = useContext(GlobalContext); 

  useEffect(() => {
    setEntriesDistribution(calculateDistribution('liability'));
  }, [entries])

  return (
    <Card sx={cardStyle}>
      <CardContent sx={{ p: 0 }}>
        <Box borderBottom={2} sx={{ bgcolor: '#FF4A4A' }}>
          <Typography variant="h1" sx={{ ml: '20px' }}>
            Liabilites
          </Typography>
        </Box>
        {entriesDistribution.map((entry, index) => (entry.label === 'liability') && 
        (<DistributionEntry key={index} inputEntry={entry}/>))}
        <Box sx={{ mb: 5 }} />
      </CardContent>
    </Card>
  );
}
  
export default LiabilityDistribution;