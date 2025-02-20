import { useMutation } from "react-query";
import { createAccount, login, addEntry, editEntry, deleteEntry } from "../services/api";
import Cookies from 'js-cookie';
import Axios from "../services/axiosInstance"

export const useCreateAccount = (resetAndClose, setUser, setPassword, setRePassword) => {
  	return useMutation(createAccount, {
		onSuccess: (data) => {
			console.log(data);
			const user = data.data;
			setUser({
				firstname: user.firstname,
				lastname: user.lastname,
				email: user.email,
				dateOfBirth: user.dateOfBirth,
				id: user.id,
			});
			Cookies.set('UserToken', user.id, { expires: 7 });
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

export const useLogin = (resetAndClose, setUser, setEntries, setPassword, setEmailError) => {
	return useMutation(login, {
		onSuccess: async (data) =>{
			console.log(data);
			if (!data.data.length) {
				setEmailError("Invalid email or password");
				setPassword('');
				return;
			}
			const user = data.data[0];
			setUser({
				firstname: user.firstname,
				lastname: user.lastname,
				email: user.email,
				dateOfBirth: user.dateOfBirth,
				id: user.id,
			})
			Cookies.set('UserToken', user.id, { expires: 7 });

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
			setPassword('');
		},
	});
};

export const useAddEntry = (resetAndClose, setEntries, queryClient) => {
	return useMutation(addEntry, {
		onSuccess: async (data) =>{
			console.log(data);
			queryClient.invalidateQueries();
			const newEntry = data.data;
			setEntries((prev) => [...prev, newEntry]);
			resetAndClose();
		},
		onError: (error) => {
			console.error(error);
			alert("Add entry error");
			setPassword('');
		},
	});
};

export const useEditEntry = (resetAndClose, setEntries, queryClient) => {
	return useMutation(editEntry, {
		onSuccess: (data) => {
			console.log(data);
			queryClient.invalidateQueries();
			const modifiedEntry = data.data;
			setEntries((prev) => prev.map((entry) => (entry.id === modifiedEntry.id ? modifiedEntry : entry)));
			resetAndClose();
		},
		onError: (error) => {
			console.log(error);
			alert("Edit entry error");
		},
	});
};

export const useDeleteEntry = (resetAndClose, setEntries, queryClient) => {
	return useMutation(deleteEntry, {
		onSuccess: (data) => {
			queryClient.invalidateQueries();
			const deletedEntry = data.data;
			setEntries((prev) => prev.filter((entry) => entry.id !== deletedEntry.id));
			resetAndClose();
		},
		onError: (error) => {
			console.log(error);
			alert("Delete entry error");
		},
	});
};