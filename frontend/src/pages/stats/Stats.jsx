import { Typography, Grid } from "@mui/material";
import AssetStats from "./components/AssetStats";
import LiabilityStats from "./components/LiabilityStats";
import AssetDistribution from "./components/AssetDistribution";
import LiabilityDistribution from "./components/LiabilityDistribution";
import { useContext, useState } from "react";
import GlobalContext from "../../share/GlobalContext";

function Stats() {
  const { entries } = useContext(GlobalContext);

  const calculateStats = (label) => {
    let stats = {
      mean: 0,
      median: 0,
      max: 0,
      min: 0,
    }

    let labelledEntries = [];
    entries.map((entry) => {
      if(entry.label === label){
        labelledEntries.push(entry.value)
        stats.mean += entry.value;
      }
    })
    labelledEntries.sort(function(a,b){return a-b})

    if(labelledEntries.length!==0){
      //mean
      stats.mean = Math.round(stats.mean/labelledEntries.length * 100) / 100;
      //median
      if (labelledEntries.length===1){
        stats.median = labelledEntries[0]
      } else if(labelledEntries.length%2===1){
        stats.median = labelledEntries[Math.floor(labelledEntries.length/2)];
      } else if (labelledEntries.length%2===0){
        let a = labelledEntries[Math.floor(labelledEntries.length/2)-1];
        let b = labelledEntries[Math.floor(labelledEntries.length/2)];
        stats.median = (a+b)/2;
      }
      //max
      stats.max = labelledEntries[labelledEntries.length-1];
      //min
      stats.min = labelledEntries[0];
    }
    return stats;
  }

  const calculateDistribution = (label) => {
    let entriesDistribution = [];
    let sum = 0
    entries.map((entry) => {
      if(entry.label === label){
        entriesDistribution.push(entry)
        sum += entry.value;
      }
    });

    entriesDistribution.map((entry) => {
      entry.distribution = Math.round((entry.value * 100/ sum) * 100) / 100;
    })

    return entriesDistribution;
  }
  
  return (
    <Grid container spacing={2}>

      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
        <Typography variant='h1'>Stats</Typography>
      </Grid>

      <Grid item md={1} display={{ xs: 'none', md: 'block'}}/>

      <Grid item md={5} xs={12}>
        <AssetStats calculateStats={calculateStats}/>
      </Grid>
      <Grid item md={5} xs={12}>
        <LiabilityStats calculateStats={calculateStats}/>
      </Grid>

      <Grid item md={1} display={{ xs: 'none', md: 'block'}}/>

      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
        <Typography variant='h1'>Distribution</Typography>
      </Grid>

      <Grid item md={1} display={{ xs: 'none', md: 'block'}}/>

      <Grid item md={10} xs={12}>
        <AssetDistribution calculateDistribution={calculateDistribution}/>
      </Grid>

      <Grid item md={1} display={{ xs: 'none', md: 'block'}}/>
      <Grid item md={1} display={{ xs: 'none', md: 'block'}}/>

      <Grid item md={10} xs={12}>
        <LiabilityDistribution calculateDistribution={calculateDistribution}/>
      </Grid>

      <Grid item md={1} display={{ xs: 'none', md: 'block'}}/>
    </Grid>
  );
}

export default Stats;