import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
	getBlogs,
	createBlog,
	updateBlog,
	deleteBlog,
} from '../../services/blogServices'

// Fetch all blogs
export const fetchBlogs = createAsyncThunk(
	'blogs/fetchBlogs',
	async (_, thunkAPI) => {
		try {
			const data = await getBlogs()
			return data
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message)
		}
	}
)

// Create new blog
export const addBlog = createAsyncThunk(
	'blogs/addBlog',
	async (newBlog, thunkAPI) => {
		try {
			const data = await createBlog(newBlog)
			return data
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message)
		}
	}
)

// Update existing blog
export const editBlog = createAsyncThunk(
	'blogs/editBlog',
	async ({ id, updatedData }, thunkAPI) => {
		try {
			const data = await updateBlog({ id, updatedData })
			return data
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message)
		}
	}
)

// Delete blog
export const removeBlog = createAsyncThunk(
	'blogs/removeBlog',
	async (id, thunkAPI) => {
		try {
			await deleteBlog(id)
			return id
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message)
		}
	}
)

const blogSlice = createSlice({
	name: 'blogs',
	initialState: {
		blogs: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: builder => {
		builder
			// Fetch
			.addCase(fetchBlogs.pending, state => {
				state.loading = true
			})
			.addCase(fetchBlogs.fulfilled, (state, action) => {
				state.loading = false
				state.blogs = action.payload
			})
			.addCase(fetchBlogs.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})

			// Add
			.addCase(addBlog.fulfilled, (state, action) => {
				state.blogs.push(action.payload)
			})

			// Update
			.addCase(editBlog.fulfilled, (state, action) => {
				const updated = action.payload
				const index = state.blogs.findIndex(b => b.id === updated.id)
				if (index !== -1) {
					state.blogs[index] = updated
				}
			})

			// Delete
			.addCase(removeBlog.fulfilled, (state, action) => {
				state.blogs = state.blogs.filter(b => b.id !== action.payload)
			})
	},
})

export default blogSlice.reducer
