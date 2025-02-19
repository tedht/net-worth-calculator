import { useMemo, useState } from "react";
import GlobalContext from "./globalContext";

const GlobalContextProvider = ({ children }) => {
	const [user,    setUser   ] = useState();
	const [entries, setEntries] = useState([]);

	const globalContextValue = useMemo(() => {
		return {
			user,
			setUser,
			entries,
			setEntries,
		};
	}, [user, entries]);

	return (
		<GlobalContext.Provider value={globalContextValue}>
		{children}
		</GlobalContext.Provider>
	);
};

export default GlobalContextProvider;