
import { Box, Typography, useTheme } from "@mui/material";
import { Routes, Route } from 'react-router-dom';
import GlobalContextProvider from './context/GlobalContextProvider';
import ModalContextProvider from "./context/ModalContextProvider";

import NavBar from "./components/nav/NavBar";
import Home   from './pages/Home';
import Stats  from "./pages/Stats";
import Search from "./pages/Search";
import Error  from "./pages/Error";

const App = () => {
	return (
		<GlobalContextProvider>
		<ModalContextProvider>
		<NavBar />
		<Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
			<Box sx={{p: 2, flexGrow: 1}}>
				<Routes>
					<Route path="/"       element={ <Home /> }/>
					<Route path="/stats"  element={ <Stats    /> }/>
					<Route path="/search" element={ <Search   /> }/>
					<Route path="*"       element={ <Error    /> }/>
				</Routes>
			</Box> 
			<Box sx={{ bgcolor: 'primary.main', mt: 8, boxShadow: useTheme().shadows[10]  }}>
			<Typography variant='body1' color="secondary" sx={{textAlign: 'center' }}>© 2025 Ted Herambert</Typography>
			</Box>
		</Box>
		</ModalContextProvider>
		</GlobalContextProvider>
	);
}

export default App
