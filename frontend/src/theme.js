import { createTheme } from "@mui/material/styles";
import "@fontsource/roboto";

const customColors = {
	asset: {
		main: '#2DD881',
		light: '#5DF5A4',
		dark: '#1B9B5F',
		contrastText: '#FFFFFF',
	},
	liability: {
		main: '#FF0022',
		light: '#FF4455',
		dark: '#990013',
		contrastText: '#FFFFFF',
	}
};

const theme = createTheme({
	typography: {
		h1: {
			fontFamily: "Roboto, sans-serif",
			fontWeight: 700,
			fontSize: "3.5rem",
			lineHeight: 1.2,
			letterSpacing: "-0.5px",
		},
		h2: {
			fontFamily: "Roboto, sans-serif",
			fontWeight: 600,
			fontSize: "2.5rem",
			lineHeight: 1.3,
			letterSpacing: "-0.5px",
		},
		body1: {
			fontFamily: "Roboto, sans-serif",
			fontWeight: 400,
			fontSize: "1rem",
			lineHeight: 1.7,
			letterSpacing: "0.2px",
		},
		button: {
			fontFamily: "Roboto, sans-serif",
			fontWeight: 600,
			fontSize: "0.875rem",
			letterSpacing: "1px",
			textTransform: "uppercase", 
		},
		logo: {
            fontFamily: "Roboto, sans-serif",
            fontWeight: 700,
            fontSize: "1.5rem",
            letterSpacing: "-0.5px",
        },
	},
	palette: {
		primary: {
			main: '#212121',
			light: '#484848',
			dark: '#000000', 
			active: '#F5F5F5',
		},
		secondary: {
			main: '#F5F5F5',
			light: '#000000',
			dark: '#484848', 
			active: '#212121',
		},
		contrastText: {
			main: '#F5F5F5',
			light: '#F5F5F5',
			dark: '#212121', 
			active: '#212121',
		},
		custom: customColors,
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					fontWeight: 'bold',
					borderRadius: 2,
				},
			},
		  	variants: [
			{
				props: { variant: 'text' },
				style: {
					color: '#1976d2',
					textTransform: 'none',
					fontWeight: 'normal',
					'&:hover': {
						backgroundColor: 'rgba(25, 118, 210, 0.1)',
					},
				},
			},
		  ],
		},
	  },
});

export default theme;