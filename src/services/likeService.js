import api from './api'

export const getLikedPosts = async () => {
	const res = await api.get('/get_like')
	return res.data
}

export const postLike = async postId => {
	const res = await api.post('/post_like', {
		post_id: postId,
		user_id: 1, // bu yerda login bo'lgan user_id bo'lishi kerak
		like_time: new Date().toISOString().split('T')[0], // faqat yyyy-mm-dd format
	})
	return res.data
}
