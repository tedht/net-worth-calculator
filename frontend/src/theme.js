import { createTheme } from "@mui/material/styles";
import "@fontsource/roboto";

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
		contrastText: {
			main: '#F5F5F5',
			light: '#F5F5F5',
			dark: '#212121', 
			active: '#212121',
		},
		custom: {
			asset: '#2DD881',
			liability: '#FF0022',
		},
	}
});

export default theme;