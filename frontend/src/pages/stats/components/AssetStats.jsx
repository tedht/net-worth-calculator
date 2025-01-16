import { Box, Card, CardContent, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../../share/context/GlobalContext";

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

function AssetStats({ calculateStats = () => {} }) {
  const [assetsMean, setAssetsMean] = useState(0);
  const [assetsMedian, setAssetsMedian] = useState(0);
  const [assetsMax, setAssetsMax] = useState(0);
  const [assetsMin, setAssetsMin] = useState(0); 

  const { entries } = useContext(GlobalContext);

  useEffect(() => {
    let stats = calculateStats('asset');
    setAssetsMean(stats.mean);
    setAssetsMedian(stats.median);
    setAssetsMax(stats.max);
    setAssetsMin(stats.min);
  }, [entries])
  
  return (
    <Card sx={cardStyle}>
      <CardContent sx={{ p: 0 }}>
        <Box borderBottom={2} sx={{ bgcolor: '#53E473' }}>
          <Typography variant="h1" sx={{ ml: '20px' }}>
            Assets
          </Typography>
        </Box>
        {/* Mean */}
        <Box  sx={statsBoxStyle}>
          <Typography variant="h2">
            Mean:
          </Typography>
          <Typography variant="h2">
            {assetsMean+" THB"}
          </Typography>
        </Box>
        {/* Median */}
        <Box  sx={statsBoxStyle}>
          <Typography variant="h2">
            Median:
          </Typography>
          <Typography variant="h2">
            {assetsMedian+" THB"}
          </Typography>
        </Box>
        {/* Max */}
        <Box  sx={statsBoxStyle}>
          <Typography variant="h2">
            Max:
          </Typography>
          <Typography variant="h2">
            {assetsMax+" THB"}
          </Typography>
        </Box>
        {/* Min */}
        <Box  sx={statsBoxStyle}>
          <Typography variant="h2">
            Min:
          </Typography>
          <Typography variant="h2">
            {assetsMin+" THB"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
  
export default AssetStats;