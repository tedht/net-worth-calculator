//imports
import { useState, useMemo } from 'react';
import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalContext from './share/GlobalContext';
import { QueryClientProvider, QueryClient } from 'react-query';

//components
import NavBar from "./share/components/nav/NavBar";
import Homepage from './pages/home/Homepage';
import Stats from "./pages/stats/Stats";
import Search from "./pages/search/Search";
import Error from "./pages/error/Error";

const App = () => {
	const [user,    setUser]    = useState();
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
		<NavBar />
		<Box sx={{p: 2}}>
			<Routes>
				<Route path="/" element={<Homepage />}/>
				<Route path="/stats" element={<Stats />}/>
				<Route path="/search" element={<Search />}/>
				<Route path="*" element={<Error />}/>
			</Routes>
		</Box>
		</QueryClientProvider> 
		</GlobalContext.Provider>
		</BrowserRouter>
	);
}

export default App
