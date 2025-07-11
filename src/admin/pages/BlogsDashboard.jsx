import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchBlogs,
	addBlog,
	editBlog,
	removeBlog,
} from '../../redux/blogs/blogSlice'
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'

const BlogsDashboard = () => {
	const dispatch = useDispatch()
	const { blogs, loading } = useSelector(state => state.blogs)
	console.log(blogs)

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [editData, setEditData] = useState(null)
	const [form, setForm] = useState({
		image: '',
		title: '',
		content: '',
		user_id: 1,
	})

	useEffect(() => {
		dispatch(fetchBlogs())
	}, [dispatch])

	const openAddModal = () => {
		setEditData(null)
		setForm({ image: '', title: '', content: '', user_id: 1 })
		setIsModalOpen(true)
	}

	const openEditModal = blog => {
		setEditData(blog)
		setForm({
			image: blog.images,
			title: blog.title,
			content: blog.content,
			user_id: blog.user_id,
		})
		setIsModalOpen(true)
	}

	const handleChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleSubmit = async e => {
		e.preventDefault()
		const blogData = {
			title: form.title,
			content: form.content,
			user_id: form.user_id,
			images: form.image,
		}
		if (editData) {
			await dispatch(editBlog({ id: editData.id, updatedData: blogData }))
		} else {
			await dispatch(addBlog(blogData))
		}

		await dispatch(fetchBlogs())
		setIsModalOpen(false)
	}

	const handleDelete = id => {
		dispatch(removeBlog(id))
	}

	return (
		<div className='p-6'>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-2xl font-semibold'>Blogs</h1>
				<button
					onClick={openAddModal}
					className='flex items-center gap-2 bg-[#4B5CD2] text-white px-4 py-2 rounded hover:bg-[#3e4ac3] transition'
				>
					<PlusCircle size={18} /> Add Blog
				</button>
			</div>

			{loading ? (
				<p>Loading...</p>
			) : (
				<div className='overflow-x-auto max-h-[70vh] overflow-y-auto border border-gray-200 rounded-lg shadow-sm'>
					<table className='min-w-full text-sm text-left bg-white'>
						<thead className='bg-gray-100 text-gray-600 font-semibold'>
							<tr>
								<th className='px-4 py-3 border'>#</th>
								<th className='px-4 py-3 border'>Image</th>
								<th className='px-4 py-3 border'>Title</th>
								<th className='px-4 py-3 border'>Content</th>
								<th className='px-4 py-3 border'>Actions</th>
							</tr>
						</thead>
						<tbody>
							{blogs.map((blog, index) => (
								<tr
									key={blog.id}
									className='hover:bg-gray-50 transition-colors border-t'
								>
									<td className='px-4 py-3'>{index + 1}</td>
									<td className='px-4 py-3'>
										<img
											src={blog.images}
											alt={blog.title}
											className='w-14 h-14 object-cover rounded'
										/>
									</td>
									<td className='px-4 py-3 min-w-[200px]'>{blog.title}</td>
									<td className='px-4 py-3 line-clamp-2 min-w-[200px]'>
										{blog.content}
									</td>
									<td className='px-4 py-3'>
										<div className='flex gap-2'>
											<button
												onClick={() => openEditModal(blog)}
												className='text-blue-600 hover:text-blue-800'
											>
												<Pencil size={16} />
											</button>
											<button
												onClick={() => handleDelete(blog.id)}
												className='text-red-600 hover:text-red-800'
											>
												<Trash2 size={16} />
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}

			{isModalOpen && (
				<div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4'>
					<div className='bg-white rounded-lg w-full max-w-xl p-6 relative shadow-lg'>
						<h2 className='text-xl font-semibold mb-4'>
							{editData ? 'Edit Blog' : 'Add Blog'}
						</h2>
						<form onSubmit={handleSubmit} className='space-y-4'>
							<input
								type='text'
								name='image'
								placeholder='Image URL'
								value={form.image}
								onChange={handleChange}
								required
								className='w-full border px-3 py-2 rounded'
							/>
							<input
								type='text'
								name='title'
								placeholder='Title'
								value={form.title}
								onChange={handleChange}
								required
								className='w-full border px-3 py-2 rounded'
							/>
							<textarea
								name='content'
								placeholder='Content'
								value={form.content}
								onChange={handleChange}
								required
								rows={4}
								className='w-full border px-3 py-2 rounded'
							/>
							<button
								type='submit'
								className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
							>
								{editData ? 'Update' : 'Create'}
							</button>
							<button
								type='button'
								onClick={() => setIsModalOpen(false)}
								className='ml-2 text-gray-600 hover:text-black'
							>
								Cancel
							</button>
						</form>
					</div>
				</div>
			)}
		</div>
	)
}

export default BlogsDashboard
