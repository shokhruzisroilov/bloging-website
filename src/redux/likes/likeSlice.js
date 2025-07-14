import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getLikedPosts, postLike } from '../../services/likeService'

export const fetchLikes = createAsyncThunk('likes/fetchLikes', async () => {
	return await getLikedPosts()
})

export const toggleLike = createAsyncThunk('likes/toggleLike', async postId => {
	await postLike(postId)
	return postId
})

const likeSlice = createSlice({
	name: 'likes',
	initialState: {
		likedPostIds: [],
		loading: false,
		error: null,
	},
	extraReducers: builder => {
		builder
			.addCase(fetchLikes.pending, state => {
				state.loading = true
			})
			.addCase(fetchLikes.fulfilled, (state, action) => {
				state.loading = false
				state.likedPostIds = action.payload.map(like => like.post_id)
			})
			.addCase(fetchLikes.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message
			})
			.addCase(toggleLike.fulfilled, (state, action) => {
				const id = action.payload
				if (state.likedPostIds.includes(id)) {
					state.likedPostIds = state.likedPostIds.filter(pid => pid !== id)
				} else {
					state.likedPostIds.push(id)
				}
			})
	},
})

export default likeSlice.reducer
