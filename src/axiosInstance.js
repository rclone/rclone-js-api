import axios from "axios";
import {AUTH_KEY, IP_ADDRESS_KEY} from "./constants";

/**
 * Global level axios configuration. These settings are automatically used in other places by using an axiosInstance instead of axios directly
 */
export let axiosInstance = axios.create({
	headers: {'Content-Type': 'application/json'},
	responseType: "json"
});

/**
 * Interceptor adds basic authentication to every axios request.
 */
axiosInstance.interceptors.request.use(
	config => {
		config.baseURL = localStorage.getItem(IP_ADDRESS_KEY);

		config.headers.Authorization = 'Basic ' + localStorage.getItem(AUTH_KEY);
		return config;
	},
	error => Promise.reject(error)
);

export default axiosInstance;