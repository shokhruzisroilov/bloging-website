import api from './api'

// Get all comments (you can also filter by post_id later)
export const getComments = async () => {
	const res = await api.get('/get_comment')
	return res.data
}

// Post a new comment
export const postComment = async commentData => {
	const res = await api.post('/post_comment', commentData)
	return res.data
}
