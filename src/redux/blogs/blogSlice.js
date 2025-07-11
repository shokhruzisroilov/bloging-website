import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getBlogs } from '../../services/blogServices'

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

const initialState = {
	blogs: [],
	loading: false,
	error: null,
}

const blogSlice = createSlice({
	name: 'blogs',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
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
	},
})

export default blogSlice.reducer
