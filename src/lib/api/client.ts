import axios from 'axios';
import { config } from '../../config';

const apiClient = axios.create({
  baseURL: config.server.baseURL,
  withCredentials: true,
  maxRedirects: 5,
  timeout: 5000,
});

export default apiClient;
