import axios from 'axios';
import { config } from '../../config';

const apiClient = axios.create({
  baseURL: config.server.baseURL,
  withCredentials: true,
});

export default apiClient;
