// redux/comments/commentSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getComments, postComment } from '../../services/commentServices'

// Fetch all comments
export const fetchComments = createAsyncThunk(
	'comments/fetchComments',
	async () => {
		return await getComments()
	}
)

// Post a new comment
export const createComment = createAsyncThunk(
	'comments/createComment',
	async commentData => {
		return await postComment(commentData)
	}
)

const commentSlice = createSlice({
	name: 'comments',
	initialState: {
		comments: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: builder => {
		// Fetch
		builder
			.addCase(fetchComments.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchComments.fulfilled, (state, action) => {
				state.loading = false
				state.comments = action.payload
			})
			.addCase(fetchComments.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message
			})

			// Post
			.addCase(createComment.fulfilled, (state, action) => {
				state.comments.push(action.payload)
			})
	},
})

export default commentSlice.reducer
