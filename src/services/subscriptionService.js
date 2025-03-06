import axios from 'axios';

const API_URL = 'http://localhost:8080/api/subscriptions';

export const getSubscriptionsByEmail = (email) => axios.get(`${API_URL}?clientEmail=${email}`);
