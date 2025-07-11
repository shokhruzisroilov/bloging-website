import api from './api'

// Get all blogs
export const getBlogs = async () => {
	const res = await api.get('/get_kurish')
	return res.data
}

// Create a new blog
export const createBlog = async newBlog => {
	const res = await api.post('/post_qush', newBlog)
	return res.data
}

// Update blog
export const updateBlog = async ({ id, updatedData }) => {
	const res = await api.put(`/post_yangilash?ident=${id}`, updatedData)
	return res.data
}

// Delete blog
export const deleteBlog = async id => {
	const res = await api.delete(`/post_delete?ident=${id}`)
	return res.data
}
