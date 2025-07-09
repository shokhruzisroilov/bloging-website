import { useState } from 'react'
import { Pencil, Trash2, PlusCircle, X } from 'lucide-react'

const BlogsDashboard = () => {
	const [blogs, setBlogs] = useState([
		{
			id: 1,
			image: 'https://via.placeholder.com/100',
			category: 'Frontend',
			date: '2025-07-09',
			title: 'React Best Practices',
			description: 'Learn how to write clean and maintainable React code.',
		},
		{
			id: 2,
			image: 'https://via.placeholder.com/100',
			category: 'Frontend',
			date: '2025-07-09',
			title: 'React Best Practices',
			description: 'Learn how to write clean and maintainable React code.',
		},
	])

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [editBlog, setEditBlog] = useState(null)
	const [form, setForm] = useState({
		image: '',
		category: '',
		date: '',
		title: '',
		description: '',
	})

	const openAddModal = () => {
		setEditBlog(null)
		setForm({ image: '', category: '', date: '', title: '', description: '' })
		setIsModalOpen(true)
	}

	const openEditModal = blog => {
		setEditBlog(blog)
		setForm({ ...blog })
		setIsModalOpen(true)
	}

	const closeModal = () => setIsModalOpen(false)

	const handleFormChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleFormSubmit = e => {
		e.preventDefault()
		if (editBlog) {
			setBlogs(prev =>
				prev.map(b => (b.id === editBlog.id ? { ...b, ...form } : b))
			)
		} else {
			const newBlog = { id: Date.now(), ...form }
			setBlogs(prev => [...prev, newBlog])
		}
		closeModal()
	}

	const handleDelete = id => {
		setBlogs(prev => prev.filter(b => b.id !== id))
	}

	return (
		<>
			<div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6'>
				<h1 className='text-2xl font-semibold'>Blogs</h1>
				<button
					onClick={openAddModal}
					className='flex items-center gap-2 bg-[#4B5CD2] text-white px-4 py-2 rounded hover:bg-[#3e4ac3] transition'
				>
					<PlusCircle size={18} /> Add Blog
				</button>
			</div>

			<div className='w-full overflow-x-auto'>
				<table className='min-w-[900px] w-full border border-gray-300 text-left text-sm'>
					<thead className='bg-gray-100'>
						<tr>
							<th className='p-3 border'>#</th>
							<th className='p-3 border'>Image</th>
							<th className='p-3 border'>Category</th>
							<th className='p-3 border'>Date</th>
							<th className='p-3 border'>Title</th>
							<th className='p-3 border'>Description</th>
							<th className='p-3 border'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{blogs.map((blog, idx) => (
							<tr key={blog.id} className='hover:bg-gray-50'>
								<td className='p-3 border'>{idx + 1}</td>
								<td className='p-3 border'>
									<img
										src={blog.image}
										alt='blog'
										className='w-16 h-16 object-cover rounded'
									/>
								</td>
								<td className='p-3 border'>{blog.category}</td>
								<td className='p-3 border'>{blog.date}</td>
								<td className='p-3 border font-medium'>{blog.title}</td>
								<td className='p-3 border max-w-[220px] line-clamp-2'>
									{blog.description}
								</td>
								<td className='p-3 border'>
									<div className='flex gap-3'>
										<button
											onClick={() => openEditModal(blog)}
											className='text-blue-600 hover:text-blue-800'
										>
											<Pencil size={18} />
										</button>
										<button
											onClick={() => handleDelete(blog.id)}
											className='text-red-600 hover:text-red-800'
										>
											<Trash2 size={18} />
										</button>
									</div>
								</td>
							</tr>
						))}
						{blogs.length === 0 && (
							<tr>
								<td colSpan={7} className='text-center p-4 text-gray-500'>
									No blogs found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* Modal */}
			{isModalOpen && (
				<div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4'>
					<div className='bg-white rounded-lg w-full max-w-xl p-6 relative shadow-lg'>
						<button
							onClick={closeModal}
							className='absolute top-3 right-3 text-gray-500 hover:text-black'
						>
							<X size={20} />
						</button>
						<h2 className='text-xl font-semibold mb-4'>
							{editBlog ? 'Edit Blog' : 'Add Blog'}
						</h2>
						<form onSubmit={handleFormSubmit} className='space-y-4'>
							<div>
								<label className='block mb-1 font-medium'>Image URL</label>
								<input
									type='text'
									name='image'
									value={form.image}
									onChange={handleFormChange}
									className='w-full border px-3 py-2 rounded outline-none focus:ring'
									required
								/>
							</div>
							<div>
								<label className='block mb-1 font-medium'>Category</label>
								<input
									type='text'
									name='category'
									value={form.category}
									onChange={handleFormChange}
									className='w-full border px-3 py-2 rounded outline-none focus:ring'
									required
								/>
							</div>
							<div>
								<label className='block mb-1 font-medium'>Date</label>
								<input
									type='date'
									name='date'
									value={form.date}
									onChange={handleFormChange}
									className='w-full border px-3 py-2 rounded outline-none focus:ring'
									required
								/>
							</div>
							<div>
								<label className='block mb-1 font-medium'>Title</label>
								<input
									type='text'
									name='title'
									value={form.title}
									onChange={handleFormChange}
									className='w-full border px-3 py-2 rounded outline-none focus:ring'
									required
								/>
							</div>
							<div>
								<label className='block mb-1 font-medium'>Description</label>
								<textarea
									name='description'
									value={form.description}
									onChange={handleFormChange}
									className='w-full border px-3 py-2 rounded outline-none focus:ring'
									rows={3}
									required
								/>
							</div>
							<button
								type='submit'
								className='bg-[#4B5CD2] text-white px-4 py-2 rounded hover:bg-[#3e4ac3] transition'
							>
								{editBlog ? 'Update Blog' : 'Create Blog'}
							</button>
						</form>
					</div>
				</div>
			)}
		</>
	)
}

export default BlogsDashboard
