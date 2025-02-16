import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const NavBarButton = ({ text, link }) => {
    return (
        <Button 
            component={NavLink} 
            to={link} 
            sx={{
				backgroundColor: 'primary.main',
				color: 'text.secondary',
				mx: '4px',
				p: '8px 32px',
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

export default NavBarButton;