import axios from 'axios'

const api = axios.create({
	baseURL: 'http://192.168.12.240:8000',
	headers: {
		'Content-Type': 'application/json',
	},
})

api.interceptors.request.use(config => {
	const token = localStorage.getItem('access_token')
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

export default api
