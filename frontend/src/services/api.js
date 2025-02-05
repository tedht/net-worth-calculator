import Axios from "./axiosInstance"

export const createAccount = async (userData) => {
	return Axios.post("/users", userData);
};

export const login = async (loginData) => {
	return Axios.get(`/users?email=${loginData.email}&password=${loginData.password}`);
};

export const addEntry = async (entryData) => {
	return Axios.post("/entries", entryData);
};

export const editEntry = async (entryData) => {
	return Axios.put(`/entries/${entryData.id}`, entryData);
};

export const deleteEntry = async (entryData) => {
	return Axios.delete(`/entries/${entryData.id}`);
};