import api from './api'

export const loginUser = async ({ username, password }) => {
	const formData = new URLSearchParams()
	formData.append('username', username)
	formData.append('password', password)

	const res = await api.post('/token', formData, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})

	return res.data
}

export const registerUser = async ({
	username,
	password,
	name,
	address,
	number,
	email,
}) => {
	const res = await api.post('/post_users', {
		username,
		password,
		name,
		address,
		number,
		email,
	})
	return res.data
}

export const logoutUser = () => {
	localStorage.removeItem('access_token')
	localStorage.removeItem('role')
}

export const getCurrentUser = async () => {
	const res = await api.get('/get')
	return res.data
}
