import { useState, useMemo } from 'react';
import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalContext from './context/globalContext';
import { QueryClientProvider, QueryClient } from 'react-query';

import NavBar from "./components/nav/NavBar";
import Homepage from './pages/Homepage';
import Stats from "./pages/Stats";
import Search from "./pages/Search";
import Error from "./pages/Error";

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
				<Route path="/"       element={ <Homepage /> }/>
				<Route path="/stats"  element={ <Stats    /> }/>
				<Route path="/search" element={ <Search   /> }/>
				<Route path="*"       element={ <Error    /> }/>
			</Routes>
		</Box>
		</QueryClientProvider> 
		</GlobalContext.Provider>
		</BrowserRouter>
	);
}

export default App
