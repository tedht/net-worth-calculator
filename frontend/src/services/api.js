import Axios from "./axiosInstance"

export const createAccount = async (userData) => {
	return Axios.post("/users", userData);
};

export const login = async (email, password) => {
	return Axios.get(`/users?email=${email}&password=${password}`);
};

export const addEntry = async (entryData) => {
	return Axios.post("/entries", entryData);
};

export const editEntry = async (entryId, updatedData) => {
	return Axios.put(`/entries/${entryId}`, updatedData);
};

export const deleteEntry = async (entryId) => {
	return Axios.delete(`/entries/${entryId}`);
};