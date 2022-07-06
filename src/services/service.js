import axios from 'axios';

export const service = axios.create({
	baseURL: 'https://viacep.com.br/ws/',
})
