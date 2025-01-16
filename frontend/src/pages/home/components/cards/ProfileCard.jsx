import { useContext, useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GlobalContext from "../../../../share/context/GlobalContext";
import dayjs from 'dayjs';

const profileCardStyle = {
  border: 2,
  background: "#F5F5F5",
  borderRadius: 9,
}

const loginButtonStyle = {
  width: "30%",
  height: "100%",
  color: "#FFFFFF",
  backgroundColor: "#060739",
  border: "#060739",
  borderRadius: 4,
  textAlign: "center",
  padding: "10",
  boxShadow: 2,
  '&:hover': {
    backgroundColor: '#5F60AC',
    borderColor: '#5F60AC',
    boxShadow: 'none',
  },
}

const createAccountButtonStyle = {
  width: "30%",
  height: "100%",
  border: 2,
  color: "#060739",
  backgroundColor: "#FFFFFF",
  borderRadius: 4,
  textAlign: "center",
  padding: "10",
  boxShadow: 1,
  '&:hover': {
    backgroundColor: '#5F60AC',
    color: "#FFFFFF",
    borderColor: '#5F60AC',
    boxShadow: 'none',
  },
}

function ProfileCard({ 
  handleOpenLogin = () => {}, 
  handleOpenCreateAccount = () => {}, 
  calculateNetworth = () => {} 
}) {
  const [netWorth, setNetWorth] = useState(0);
  const { entries, user } = useContext(GlobalContext);

  useEffect(() => {setNetWorth(calculateNetworth())}, [entries]);

  const getAge = () => {
    if(!user) return;

    let dob = user.dateofbirth;
    let now = dayjs();
    now = now.format('YYYY-MM-DD');


    const isOrPassedBirthMonth = (parseInt(dob.substring(5,7)) >= parseInt(now.substring(5,7)));
    const isOrPassedBirthDay = isOrPassedBirthMonth && (parseInt(dob.substring(8,10)) > parseInt(now.substring(8,10)));

    //YEAR
    let age = parseInt(now.substring(0,4)) - parseInt(dob.substring(0,4));
    //MONTH
    if(isOrPassedBirthMonth){
      age--;
    }
    //DAY
    else if(isOrPassedBirthDay){
      age--
    }
    return age;
  }



  return (
    <Card sx={profileCardStyle}>
      <CardContent>
        <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              p: 1,
              m: 1,}}>
            <AccountCircleIcon sx={{color: 'black', fontSize: '1200%'}}/>
        </Box>
        {(user) ?
        (<Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          p: 1,
          m: 1}}>
          <Typography variant="h1">{user.firstname+" "+user.lastname}</Typography>
          <Typography variant="subtitle1">{getAge()+(getAge() != 1 ? " years old" : " year old")}</Typography>
        </Box>) :
        (<Box  sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              textAlign: 'center',
              p: 1,
              m: 1,
              height: 65}}>
          <Button 
            sx={loginButtonStyle}
            onClick={handleOpenLogin}>
            Login
          </Button>
          <Box marginX={2}>
            <Typography variant="body1">or</Typography>
          </Box>
          <Button 
            sx={createAccountButtonStyle}
            onClick={handleOpenCreateAccount}>
            Create Account
          </Button>
        </Box>)}
        <Box  sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              textAlign: 'center',
              p: 1,
              m: 1,
              mt: 3,
              mb: 5}}>
          <Typography variant="h1">
            Net Worth:
          </Typography>
          <Typography variant="h1">
            {netWorth+" THB"}
          </Typography>
        </Box>

      </CardContent>
    </Card>
  );
}
  
export default ProfileCard;