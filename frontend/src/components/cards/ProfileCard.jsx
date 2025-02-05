import { useContext, useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GlobalContext from "../../context/globalContext";
import dayjs from 'dayjs';

const ProfileCard = () => {
	const [netWorth, setNetWorth] = useState(0);
	const [age,      setAge     ] = useState(0);

	const { entries, user } = useContext(GlobalContext);

	const calculateNetworth = (entries) => {
		return 0;
	} 

	const calculateAge = () => {
		if(!user) return;

		let dob = user.dateOfBirth;
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

	useEffect(() => {
		setNetWorth(calculateNetworth())
	}, [entries]);
	
	useEffect(() => {
		setAge(calculateAge());
	}, [user]);

	const theme = useTheme();

	const profileCardStyle = {
		borderRadius: 4,
		boxShadow: theme.shadows[10],
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
				{(user) &&
				(<Box sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					textAlign: 'center',
					p: 1,
					m: 1}}>
					<Typography variant="h1">{user.firstname+" "+user.lastname}</Typography>
					<Typography variant="subtitle1">{age+(age != 1 ? " years old" : " year old")}</Typography>
				</Box>)}
				<Box sx={{
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
						{netWorth+" €"}
					</Typography>
				</Box>

			</CardContent>
		</Card>
	);
}
	
export default ProfileCard;