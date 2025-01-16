import { useState } from "react";
import {  
  Modal, Card, CardContent, Box, Typography, IconButton, 
  Button, FormControl, Checkbox, Select, InputLabel, MenuItem, Grid 
} from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const modalCardStyle = {
  position: 'absolute',
  top: '2%',
  left: '50%',
  transform: 'translate(-50%, 0%)',
  width: { xs: '90%', md: '60%'},
  background: '#F5F5F5',
  border: 2,
	borderRadius: 9,
  p: 0,
}

const exitButtonStyle = {
  color: "#FFFFFF",
  fontSize: '180%',
  '&:hover': {
    color: '#5F60AC',
    boxShadow: 'none',
  },
}

const primaryButtonStyle = {
  width: "20%",
  height: "100%",
  border: 2,
  borderColor: "#060739",
  color: "#FFFFFF",
  backgroundColor: "#060739",
  borderRadius: 4,
  textAlign: "center",
  padding: "10px",
  boxShadow: 2,
  '&:hover': {
    backgroundColor: '#5F60AC',
    borderColor: '#5F60AC',
  },
}

function FilterModal({ open = false, handleCloseFilterModal = () => {}, setFilter = () => {}}){
  const [checkedAssets, setCheckedAssets] = useState(true);
  const [checkedLiabilities, setCheckedLiabilities] = useState(true);
  const [order, setOrder] = useState("Alphabetical (a-z)");
  const [checkedBankAccount, setCheckedBankAccount] = useState(true);
  const [checkedRealEstate, setCheckedRealEstate] = useState(true);
  const [checkedCar, setCheckedCar] = useState(true);
  const [checkedAssetOther, setCheckedAssetOther] = useState(true);
  const [checkedDebt, setCheckedDebt] = useState(true);
  const [checkedLoan, setCheckedLoan] = useState(true);
  const [checkedLiabilityOther, setCheckedLiabilityOther] = useState(true);

  const handleCheckAssets = (e) => {
    setCheckedAssets(e.target.checked);
  }
  const handleCheckLiabilities = (e) => {
    setCheckedLiabilities(e.target.checked);
  }
  const handleCheckBankAccount = (e) => {
    setCheckedBankAccount(e.target.checked);
  }
  const handleCheckRealEstate = (e) => {
    setCheckedRealEstate(e.target.checked);
  }
  const handleCheckCar = (e) => {
    setCheckedCar(e.target.checked);
  }
  const handleCheckAssetOther = (e) => {
    setCheckedAssetOther(e.target.checked);
  }
  const handleCheckDebt = (e) => {
    setCheckedDebt(e.target.checked);
  }
  const handleCheckLoan = (e) => {
    setCheckedLoan(e.target.checked);
  }
  const handleCheckLiabilityOther = (e) => {
    setCheckedLiabilityOther(e.target.checked);
  }

	const handleSubmit = async () => {
    setFilter({
      checkedAssets: checkedAssets,
      checkedLiabilities: checkedLiabilities,
      order: order,
      checkedBankAccount: checkedBankAccount,
      checkedRealEstate: checkedRealEstate,
      checkedCar: checkedCar,
      checkedAssetOther: checkedAssetOther,
      checkedDebt: checkedDebt,
      checkedLoan: checkedLoan,
      checkedLiabilityOther: checkedLiabilityOther,
    })
    handleCloseFilterModal();
  };

	return (
		<Modal 
			open={open}
			onClose={handleCloseFilterModal}
      sx={{overflow: 'scroll'}}>
			<Card sx={modalCardStyle}>
				<CardContent sx={{ p: 0 }}>
					<Box borderBottom={2} sx={{ p: 1, bgcolor: '#060739', display: 'flex', justifyContent: 'space-between' }}>
						<Typography variant="h1" sx={{ color: '#FFFFFF',ml: '20px' }}>
							Filter
						</Typography>
						<IconButton sx={{ p: 0, mr: '20px' }} onClick={handleCloseFilterModal}>
							<CloseRoundedIcon sx={exitButtonStyle} />
						</IconButton>
					</Box>

					<Grid container spacing={2}>
            <Grid item xs={2}/>
            <Grid item xs={5}>
              <Box display={'flex'}>
              <Checkbox 
                checked={checkedAssets}
                onChange={handleCheckAssets}/>
              <Typography variant="h1" alignItems={'center'} display={'flex'}>
                Assets
              </Typography>
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Box display={'flex'}>
              <Checkbox  
                checked={checkedLiabilities}
                onChange={handleCheckLiabilities}/>
              <Typography variant="h1" alignItems={'center'} display={'flex'}>
                Liabilities
              </Typography>
              </Box>
            </Grid>

            <Grid item xs={1}/>
            <Grid item xs={10}>
            <FormControl fullWidth>
              <InputLabel id="order">Order</InputLabel>
              <Select
                labelId="order"
                value={order}
                label="Order"
                onChange={(e) => setOrder(e.target.value)}> 
                  <MenuItem value={"Alphabetical (a-z)"}>{"Alphabetical (a-z)"}</MenuItem>
                  <MenuItem value={"Alphabetical (z-a)"}>{"Alphabetical (z-a)"}</MenuItem>
                  <MenuItem value={"Value (ascending)"}>{"Value (ascending)"}</MenuItem>
                  <MenuItem value={"Value (descending)"}>{"Value (descending)"}</MenuItem>
              </Select>
            </FormControl>
            </Grid>
            <Grid item xs={1}/>

            <Grid item xs={2}/>
            <Grid item xs={5}>
              <Box display={'flex'}>
              <Checkbox 
                checked={checkedBankAccount}
                onChange={handleCheckBankAccount}/>
              <Typography variant="h2" alignItems={'center'} display={'flex'}>
                Bank account
              </Typography>
              </Box>
              <Box display={'flex'}>
              <Checkbox 
                checked={checkedRealEstate}
                onChange={handleCheckRealEstate}/>
              <Typography variant="h2" alignItems={'center'} display={'flex'}>
                Real estate
              </Typography>
              </Box>
              <Box display={'flex'}>
              <Checkbox 
                checked={checkedCar}
                onChange={handleCheckCar}/>
              <Typography variant="h2" alignItems={'center'} display={'flex'}>
                Car
              </Typography>
              </Box>
              <Box display={'flex'}>
              <Checkbox 
                checked={checkedAssetOther}
                onChange={handleCheckAssetOther}/>
              <Typography variant="h2" alignItems={'center'} display={'flex'}>
                Other
              </Typography>
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Box display={'flex'}>
              <Checkbox  
                checked={checkedDebt}
                onChange={handleCheckDebt}/>
              <Typography variant="h2" alignItems={'center'} display={'flex'}>
                Debt
              </Typography>
              </Box>
              <Box display={'flex'}>
              <Checkbox  
                checked={checkedLoan}
                onChange={handleCheckLoan}/>
              <Typography variant="h2" alignItems={'center'} display={'flex'}>
                Loan
              </Typography>
              </Box>
              <Box display={'flex'}>
              <Checkbox  
                checked={checkedLiabilityOther}
                onChange={handleCheckLiabilityOther}/>
              <Typography variant="h2" alignItems={'center'} display={'flex'}>
                Other
              </Typography>
              </Box>
            </Grid>

            <Grid item xs={1}/>
            <Grid item xs={10}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
              <Button 
                sx={primaryButtonStyle}
                onClick={handleSubmit}>
                Filter
              </Button>
            </Box>
            </Grid>
            <Grid item xs={1}/>
          </Grid>
				</CardContent>
			</Card>
		</Modal>
	);
}

export default FilterModal;