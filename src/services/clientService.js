import axios from 'axios';

const API_URL = 'http://localhost:8080/api/clients';

export const getAllClients = () => axios.get(API_URL);
export const createClient = (client) => axios.post(API_URL, client);
export const updateClient = (id, client) => axios.put(`${API_URL}/${id}`, client);
export const deleteClient = (id) => axios.delete(`${API_URL}/${id}`);
