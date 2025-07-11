import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './blogs/blogSlice'
import commentReducer from './blogs/commentSlice'
import likeReducer from './blogs/likeSlice'
import authReducer from './auth/authSlice'

export const store = configureStore({
	reducer: {
		blogs: blogReducer,
		comments: commentReducer,
		likes: likeReducer,
		auth: authReducer,
	},
})
