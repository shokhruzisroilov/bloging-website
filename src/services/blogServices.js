import api from './api'

// Get all blogs
export const getBlogs = async () => {
	const res = await api.get('/get_kurish')
	return res.data
}

// Create a new blog
export const createBlog = async newBlog => {
	const res = await api.post('/blogs', newBlog)
	return res.data
}

// Update a blog by ID
export const updateBlog = async ({ id, updatedData }) => {
	const res = await api.put(`/blogs/${id}`, updatedData)
	return res.data
}

// Delete a blog by ID
export const deleteBlog = async id => {
	const res = await api.delete(`/blogs/${id}`)
	return res.data
}
