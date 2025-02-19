import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import dayjs from 'dayjs';
import { useGlobalContext } from "../../hooks/useContexts";

const ProfileCard = () => {
	const [netWorth, setNetWorth] = useState(0);
	const [age,      setAge     ] = useState(0);

	const { entries, user } = useGlobalContext();

	const calculateNetworth = (entries) => {
		let assetsTotalValue = 0;
		let liabilitiesTotalValue = 0;

		entries.map((entry) => {
			if(entry.type.toLowerCase()==='asset') assetsTotalValue += Number(entry.value);
			else if(entry.type.toLowerCase()==='liability') liabilitiesTotalValue += Number(entry.value);
		});
		return (assetsTotalValue - liabilitiesTotalValue);
	} 

	const getAge = () => {
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
		setNetWorth(calculateNetworth(entries))
		console.log(calculateNetworth(entries));
	}, [entries]);
	
	useEffect(() => {
		setAge(getAge());
	}, [user]);

	const theme = useTheme();

	const profileCardStyle = {
		borderRadius: 2,
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
					<Typography variant="h2">
						Net Worth:
					</Typography>
					<Typography variant="h2">
					{netWorth <= -1_000_000_000_000 
					? "-999999999999+ €" 
					: netWorth >= 1_000_000_000_000 
					? "999999999999+ €" 
					: `${netWorth} €`}
					</Typography>
				</Box>

			</CardContent>
		</Card>
	);
}
	
export default ProfileCard;