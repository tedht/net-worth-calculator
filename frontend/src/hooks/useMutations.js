import { useMutation } from 'react-query';
import { createAccount, login, addEntry, editEntry, deleteEntry } from "../services/api";
import Cookies from 'js-cookie';
import Axios from "../services/axiosInstance"

export const useCreateAccount = (setUser, resetAndClose, setPassword, setRePassword) => {
  	return useMutation(createAccount, {
		onSuccess: (data) => {
			console.log(data);
			const user = data.data[0];
			setUser({
				firstname: user.firstname,
				lastname: user.lastname,
				email: user.email,
				dateofbirth: user.dateofbirth,
				id: user.id,
			});
			resetAndClose();
		},
		onError: (error) => {
			console.error(error);
			alert("Account creation error");
			setPassword("");
			setRePassword("");
		},
	});
};

export const useLogin = (setUser, resetAndClose, setEntries, setPassword) => {
	return useMutation(login, {
		onSuccess: async (data) =>{
			console.log(data);
			if (!data.data.length) {
				throw new Error("Invalid email or password");
			}
			const user = data.data[0];
			setUser({
				firstname: user.firstname,
				lastname: user.lastname,
				email: user.email,
				dateofbirth: user.dateofbirth,
				id: user.id,
			})
			Cookies.set('UserId', user.id);

			try {
				const entriesResponse = await Axios.get(`/entries?userId=${user.id}`);
				console.log(entriesResponse);
				setEntries(entriesResponse.data || []);
			} catch (error) {
				console.error("Error fetching user entries:", error);
			}

			resetAndClose();
		},
		onError: (error) => {
			console.error(error);
			alert("Login error");
			setPassword('');
		},
	});
};

export const useAddEntry = () => {
	return useMutation(addEntry, {
		onSuccess: async (data) =>{
			console.log(data);
			newEntry = data.data
			setEntries((prev) => [...prev, newEntry]);
			Cookies.set('UserId', user.id);

			try {
				const entriesResponse = await Axios.get(`/entries?userId=${user.id}`);
				console.log(entriesResponse);
				setEntries(entriesResponse.data || []);
			} catch (error) {
				console.error("Error fetching user entries:", error);
			}

			resetAndClose();
		},
		onError: (error) => {
			console.error(error);
			alert("Login error");
			setPassword('');
		},
	});
};