import axios from 'axios';

const API_URL = 'http://localhost:8080/api/medications';

export const getAllMedications = () => axios.get(API_URL);
export const createMedication = (medication) => axios.post(API_URL, medication);
export const updateMedication = (id, medication) => axios.put(`${API_URL}/${id}`, medication);
export const deleteMedication = (id) => axios.delete(`${API_URL}/${id}`);
