import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const NavBarButton = ({ name, link }) => {
    return (
        <Button 
            component={NavLink} 
            to={link} 
            sx={{
				backgroundColor: 'primary.main',
				color: 'contrastText.main',
				mx: '4px',
				p: '8px 32px',
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
            {name}
        </Button>
    );
}

export default NavBarButton;