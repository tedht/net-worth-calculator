import { Box, Card, CardContent, Typography } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import GlobalContext from "../../../context/globalContext";

const cardStyle = {
  border: 2,
  background: "#F5F5F5",
  borderRadius: 9,
  padding: 0,
}

const statsBoxStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  textAlign: 'center',
  p: 1,
  m: 1,
  my: 3,
}

function LiabilityStats({ calculateStats = () => {} }) {
  const [liabilitiesMean, setLiabilitiesMean] = useState(0);
  const [liabilitiesMedian, setLiabilitiesMedian] = useState(0);
  const [liabilitiesMax, setLiabilitiesMax] = useState(0);
  const [liabilitiesMin, setLiabilitiesMin] = useState(0); 

  const { entries } = useContext(GlobalContext);

  useEffect(() => {
    let stats = calculateStats('liability');
    setLiabilitiesMean(stats.mean);
    setLiabilitiesMedian(stats.median);
    setLiabilitiesMax(stats.max);
    setLiabilitiesMin(stats.min);
  }, [entries])

  return (
    <Card sx={cardStyle}>
      <CardContent sx={{ p: 0 }}>
        <Box borderBottom={2} sx={{ bgcolor: '#FF4A4A' }}>
          <Typography variant="h1" sx={{ ml: '20px' }}>
            Liabilities
          </Typography>
        </Box>
        {/* Mean */}
        <Box  sx={statsBoxStyle}>
          <Typography variant="h2">
            Mean:
          </Typography>
          <Typography variant="h2">
            {liabilitiesMean+" THB"}
          </Typography>
        </Box>
        {/* Median */}
        <Box  sx={statsBoxStyle}>
          <Typography variant="h2">
            Median:
          </Typography>
          <Typography variant="h2">
            {liabilitiesMedian+" THB"}
          </Typography>
        </Box>
        {/* Max */}
        <Box  sx={statsBoxStyle}>
          <Typography variant="h2">
            Max:
          </Typography>
          <Typography variant="h2">
            {liabilitiesMax+" THB"}
          </Typography>
        </Box>
        {/* Min */}
        <Box  sx={statsBoxStyle}>
          <Typography variant="h2">
            Min:
          </Typography>
          <Typography variant="h2">
            {liabilitiesMin+" THB"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
  
export default LiabilityStats;