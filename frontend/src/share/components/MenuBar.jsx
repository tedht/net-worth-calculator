import { Box, Button, Modal, IconButton, AppBar, Toolbar, Typography, CardContent, Card } from "@mui/material";
import { NavLink } from 'react-router-dom';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MenuIcon from '@mui/icons-material/Menu';

const menubarButtonStyle = {
  display: 'flex',
  width: '100%',
  height: '64px',
  fontFamily: "roboto",
  fontWeight: "bold",
  fontSize: "20px",
  color: "#FFFFFF",
  borderRadius: 0,
  borderTop: 2
};

const exitButtonStyle = {
  color: "#FFFFFF",
  fontSize: '180%',
  '&:hover': {
    color: '#5F60AC',
    boxShadow: 'none',
  },
};

const menubarStyle = {
  width: { xs: "60%", md: "35%"},
  height: "100%",
  p: 0,
  m: 0,
  bgcolor: "#060739",
};

function MenuBar({ open = false, handleCloseMenuBar = () => {} }){

  return (
    <Modal 
      open={open}
      onClose={handleCloseMenuBar}>
      <Card sx={menubarStyle}>
        <CardContent sx={{ p: 0, width: '100%' }}>
        <AppBar position={"static"}>
          <Toolbar sx={{ 
            height: "64px", 
            bgcolor: '#060739', 
            display: 'flex', 
            justifyContent: 'space-between',
            m: 0}}>
          <IconButton onClick={handleCloseMenuBar}>
            <MenuIcon sx={{ color: "#FFFFFF", fontSize: '180%' }}/>
          </IconButton>
          <IconButton onClick={handleCloseMenuBar}>
            <CloseRoundedIcon sx={exitButtonStyle} />
          </IconButton>
          </Toolbar>
        </AppBar>
        <Button 
          component={NavLink} 
          to={"/"} 
          sx={menubarButtonStyle}
          style={({isActive}) => {
              return {
                  background: isActive ? "#5F60AC" : "#060739"
              }
          }}>Home</Button>  
        <Button 
          component={NavLink} 
          to={"/stats"} 
          sx={menubarButtonStyle}
          style={({isActive}) => {
              return {
                  background: isActive ? "#5F60AC" : "#060739"
              }
          }}>Stats</Button>
        <Button 
          component={NavLink} 
          to={"/search"}  
          sx={menubarButtonStyle}
          style={({isActive}) => {
              return {
                  background: isActive ? "#5F60AC" : "#060739"
              }
          }}>Search</Button>
        </CardContent>
      </Card>
    </Modal>
  );
}
export default MenuBar;