import axios from 'axios';

// Verifica se está em produção
const isProduction = process.env.NODE_ENV === 'production';

// Define a baseURL com base no ambiente
const baseURL = isProduction
	? 'https://lainterface.vercel.app/api'
	: 'http://localhost:3000/api';  

const api = axios.create({
	baseURL,
});

export default api;
