import axios from 'axios';

const api = axios.create({
	baseURL: 'https://lainterface.vercel.app/api',
});

export default api;