//imports
import { useState, useMemo } from 'react';
import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GlobalContext from './share/context/GlobalContext';
import { QueryClientProvider, QueryClient } from 'react-query';
import "@fontsource/roboto";

//components
import Nav from "./share/components/Nav";
import Homepage from './pages/home/Homepage';
import Stats from "./pages/stats/Stats";
import Search from "./pages/search/Search";
import Error from "./pages/error/Error";

const theme = createTheme({
	typography: {
		h1: {
			fontFamily: "roboto",
			fontWeight: "bold",
			fontSize: "36px",
		},
		h2: {
			fontFamily: "roboto",
			fontWeight: "bold",
			fontSize: "24px",
		},
		subtitle1: {
			fontFamily: "roboto",
			fontWeight: "medium",
			fontSize: "20px",
		},
		body1: {
			fontFamily: "roboto",
			fontWeight: "medium",
			fontSize: "16px",
		},
		button: {
			fontFamily: "roboto",
			fontWeight: "bold",
			fontSize: "12px",
		},
	},
})

function App() {
	const [user, setUser] = useState();
	const [entries, setEntries] = useState([]);

	const [queryClient] = useState(() => new QueryClient());
	const globalContextValue = useMemo(() => {
		return {
			user,
			setUser,
			entries,
			setEntries,
		};
	}, [user, entries]);

	return (
		<BrowserRouter>
		<GlobalContext.Provider value={globalContextValue}>
		<QueryClientProvider client={queryClient}>
		<ThemeProvider theme={theme}>
			<Nav />
			<Box sx={{p: 2}}>
				<Routes>
					<Route path="/" element={<Homepage />}/>
					<Route path="/stats" element={<Stats />}/>
					<Route path="/search" element={<Search />}/>
					<Route path="*" element={<Error />}/>
				</Routes>
			</Box>
		</ThemeProvider> 
		</QueryClientProvider> 
		</GlobalContext.Provider>
		</BrowserRouter>
	);
}

export default App
