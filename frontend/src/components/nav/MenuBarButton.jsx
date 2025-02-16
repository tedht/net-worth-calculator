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
				color: 'text.secondary',
				textTransform: 'none',
				'&:hover': {
					backgroundColor: 'primary.light',
					color: 'text.secondary'
				},
				'&.active': {
					backgroundColor: 'primary.active',
					color: 'text.active'
				},
            }}
        >
            {text}
        </Button>
    );
}

export default MenuBarButton;