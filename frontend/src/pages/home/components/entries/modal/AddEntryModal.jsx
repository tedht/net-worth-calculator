import { useState, useContext, useEffect } from "react";
import { 
  Modal, Card, CardContent, Box, Typography, IconButton, 
  Button, Select, MenuItem, InputLabel, FormControl, FormHelperText ,
  OutlinedInput, InputAdornment
} from "@mui/material";
import GlobalContext from "../../../../../share/context/GlobalContext";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useQueryClient, useMutation } from "react-query";
import Axios from "../../../../../share/AxiosInstance";
import Cookies from "js-cookie";

const modalCardStyle = {
  position: 'relative',
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
	fontSize: "28px",
	width: "30%",
	height: "70px",
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
    boxShadow: 2,
  },
}

function AddEntryModal({ open = false, handleCloseAddEntry = () => {}, label = '' }){
  const [newEntry, setNewEntry] = useState({
    name: '',
    value: '',
    category: '',
    label: '',
  });
  const [error, setError] = useState({});

  const { entries, setEntries, user } = useContext(GlobalContext);
  const queryClient = useQueryClient();

  const assetCategories = [
    'Bank account', 
    'Real estate',
    'Car',
    'Other',
  ];
  const liabilityCategories = [
    'Debt',
    'Loan',
    'Other',
  ];

  const resetAndClose = () => {
    setNewEntry({
      name: '',
      value: '',
      category: '',
      label: label,
    });
    setError({});
    handleCloseAddEntry();
  }

  useEffect(() => {
    setNewEntry({...newEntry, label: label});
  }, [label]);

	const handleSubmit = async () => {
    if(!validateForm())return;
    addMutation.mutate();
  };
  
  const validateForm = () => {
    const error = {};
    if (!newEntry.name) error.name = 'Entry name is required';
    if (!newEntry.value && newEntry!=='0') error.value = 'Value is required';
    else if (!/^[0-9]*$/g.test(newEntry.value)) error.value = 'Invalid value';
    if (!newEntry.category) error.category = 'Category is required';
    if (!newEntry.label) error.label = 'Label is required';
    setError(error);

    if (Object.keys(error).length) return false;
    return true;
  }

  const addMutation = useMutation(() =>
  Axios.post('/entry',  
  {
    ...newEntry, 
    value: parseInt(newEntry.value), 
    userid: user.id,
  }, 
  {
    headers: { Authorization: `Bearer ${Cookies.get('UserToken')}` }
  }),
  {
    onSuccess: (data) => {
      if(data.data.success){
        queryClient.invalidateQueries();
        setEntries((prev) => [...prev, data.data]);
        resetAndClose();
      }
    },
    onError: (error) => {
      console.log(error);
      resetAndClose();
    },
  });

	return (
		<Modal 
			open={open}
			onClose={resetAndClose}
      sx={{overflow: 'scroll'}}>
			<Card sx={modalCardStyle}>
				<CardContent sx={{ p: 0}}>
					<Box borderBottom={2} sx={{ p: 1, bgcolor: '#060739', display: 'flex', justifyContent: 'space-between' }}>
						<Typography variant="h1" sx={{ color: '#FFFFFF', ml: '20px' }}>
							Add {label}
						</Typography>
						<IconButton sx={{ p: 0, mr: '20px' }} onClick={resetAndClose}>
							<CloseRoundedIcon sx={exitButtonStyle} />
						</IconButton>
					</Box>

					<Box sx={{p: 2, gap: 2, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <FormControl fullWidth error={!!error.name}>
              <InputLabel>Name</InputLabel>
              <OutlinedInput
                value={newEntry.name}
                label="Name"
                placeholder={"Type your "+label+"'s name"}
                onChange={(e) => setNewEntry({...newEntry, name: e.target.value})}/>
               <FormHelperText>
                {(!!error.name) ? error.name : ''}
              </FormHelperText>
            </FormControl>  
            <FormControl fullWidth error={!!error.value}>
              <InputLabel>Value</InputLabel>
              <OutlinedInput
                value={newEntry.value}
                label="Value"
                placeholder={"Type the value of your "+label}
                onChange={(e) => setNewEntry({...newEntry, value: e.target.value})}
                endAdornment={<InputAdornment position="end">THB</InputAdornment>}/>
               <FormHelperText>
                {(!!error.value) ? error.value : ''}
              </FormHelperText>
            </FormControl>  
            <FormControl fullWidth error={!!error.category}>
              <InputLabel id="category">Category</InputLabel>
              <Select
                labelId="category"
                value={newEntry.category}
                label="Category"
                onChange={(e) => setNewEntry({...newEntry, category: e.target.value})}> 
                {(label === 'asset') ? 
                (assetCategories.map((category, index) => (
                <MenuItem value={category} key={index}>{category}</MenuItem>))) :
                (label === 'liability') ? 
                (liabilityCategories.map((category, index) => (
                <MenuItem value={category} key={index}>{category}</MenuItem>))) : 
                <></>}
              </Select>
              <FormHelperText>
                {(!!error.category) ? error.category : ''}
              </FormHelperText>
            </FormControl>
						<Button 
							sx={primaryButtonStyle}
							onClick={handleSubmit}>
							Add
						</Button>
					</Box>
				</CardContent>
			</Card>
		</Modal>
	);
}

export default AddEntryModal;