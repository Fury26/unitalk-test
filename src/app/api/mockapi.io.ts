import axios from 'axios';

const VITE_APP_MOCKAPI_ID = import.meta.env.VITE_APP_MOCKAPI_ID;

export const mockapi = axios.create({
	baseURL: `https://${VITE_APP_MOCKAPI_ID}.mockapi.io/api`,
	headers: {
		'Content-Type': 'application/json',
	},
});
