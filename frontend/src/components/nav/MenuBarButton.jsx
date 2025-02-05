import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const MenuBarButton = ({ text, link }) => {
    return (
        <Button 
            component={NavLink} 
            to={link} 
            sx={{
				display: 'flex',
				width: '100%',
				height: '64px',
				backgroundColor: 'primary.main',
				color: 'contrastText.main',
				textTransform: 'none',
				'&:hover': {
					backgroundColor: 'primary.light',
					color: 'contrastText.light'
				},
				'&.active': {
					backgroundColor: 'primary.active',
					color: 'contrastText.active'
				},
            }}
        >
            {text}
        </Button>
    );
}

export default MenuBarButton;