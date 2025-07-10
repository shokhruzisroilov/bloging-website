import { useState } from 'react'
import { Pencil, Trash2, PlusCircle, X } from 'lucide-react'

const BlogsDashboard = () => {
	const [blogs, setBlogs] = useState(
		Array.from({ length: 10 }).map((_, i) => ({
			id: i + 1,
			image:
				'https://media.istockphoto.com/id/887987150/photo/blogging-woman-reading-blog.jpg?s=612x612&w=0&k=20&c=7SScR_Y4n7U3k5kBviYm3VwEmW4vmbngDUa0we429GA=',
			category: 'Frontend',
			date: '2025-07-09',
			title: `Blog Post ${i + 1}`,
			description: 'This is a sample description for the blog post.',
		}))
	)

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
			<div className='flex  justify-between items-center gap-4 mb-6'>
				<h1 className='text-2xl font-semibold'>Blogs</h1>
				<button
					onClick={openAddModal}
					className='flex items-center gap-2 bg-[#4B5CD2] text-white px-4 py-2 rounded hover:bg-[#3e4ac3] transition'
				>
					<PlusCircle size={18} /> Add Blog
				</button>
			</div>

			{/* Table */}
			<div className='overflow-x-auto max-h-[70vh] overflow-y-auto border border-gray-200 rounded-lg shadow-sm'>
				<table className='min-w-full text-sm text-left bg-white'>
					<thead className='bg-gray-100 text-gray-600 font-semibold'>
						<tr>
							<th className='px-4 py-3 border'>#</th>
							<th className='px-4 py-3 border'>Image</th>
							<th className='px-4 py-3 border'>Category</th>
							<th className='px-4 py-3 border'>Date</th>
							<th className='px-4 py-3 border'>Title</th>
							<th className='px-4 py-3 border'>Description</th>
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
										src={blog.image}
										alt={blog.title}
										className='w-14 h-14 object-cover rounded'
									/>
								</td>
								<td className='px-4 py-3 text-sm whitespace-nowrap'>
									{blog.category}
								</td>
								<td className='px-4 py-3 text-sm whitespace-nowrap'>
									{blog.date}
								</td>
								<td className='px-4 py-3 text-sm max-w-[150px] break-words min-w-40'>
									{blog.title}
								</td>
								<td className='px-4 py-3 text-sm max-w-[200px] break-words line-clamp-2 min-w-40'>
									{blog.description}
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
