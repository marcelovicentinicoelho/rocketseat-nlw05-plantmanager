import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.2:3333' // Porta definida para a utilização da API
})

export default api;
