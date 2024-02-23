import axios from 'axios';

const baseURL = 'http://localhost:8000/'

const instance = axios.create({ baseURL, withCredentials: true });

instance.interceptors.request.use(
	(request) => {
		return request;
	},
	(error) => {
		return Promise.reject(error);
	},
);

instance.interceptors.response.use(
	(response) => {
	  return response;
	},
	(error) => {
		const status = error.status || (error.response ? error.response.status : 0);
		if (status === 403 || status === 401) {
            console.log('axios error', error)
		}
		return Promise.reject(error);
	}
  );

export const Axios = () => instance;