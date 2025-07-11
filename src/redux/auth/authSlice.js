import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	token: localStorage.getItem('access_token') || null,
	role: localStorage.getItem('role') || null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			const { access_token, role } = action.payload
			state.token = access_token
			state.role = role || 'user'
			localStorage.setItem('access_token', access_token)
			localStorage.setItem('role', state.role)
		},
		logout: state => {
			state.token = null
			state.role = null
			localStorage.clear()
		},
	},
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
