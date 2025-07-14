import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { fetchBlogs } from '../../redux/blogs/blogSlice'
import LikeButton from '../header/LikeButton'

const BlogLists = ({ isLimited = false }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { blogs, loading, error } = useSelector(state => state.blogs)

	const [searchTerm, setSearchTerm] = useState('')
	const [filterType, setFilterType] = useState('all') // all, newest, oldest

	useEffect(() => {
		dispatch(fetchBlogs())
	}, [dispatch])

	// 1. Saralash
	let sortedBlogs = [...blogs]
	if (filterType === 'newest') {
		sortedBlogs = sortedBlogs.sort((a, b) => b.id - a.id)
	} else if (filterType === 'oldest') {
		sortedBlogs = sortedBlogs.sort((a, b) => a.id - b.id)
	}

	// 2. Qidiruv
	const filteredBlogs = sortedBlogs.filter(blog =>
		(blog.title + blog.content).toLowerCase().includes(searchTerm.toLowerCase())
	)

	// 3. Limitlangan bloglar
	const visibleBlogs = isLimited ? filteredBlogs.slice(0, 6) : filteredBlogs

	if (loading) return <p className='text-center'>Loading...</p>
	if (error) return <p className='text-center text-red-500'>Error: {error}</p>

	return (
		<div>
			{/* 🔍 Search va 🔽 Filter */}
			<div className='flex flex-col md:flex-row justify-between items-center gap-4 mb-6'>
				{/* Search (Chap) */}
				<input
					type='text'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					placeholder='Search blog by title or content...'
					className='w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
				/>

				{/* Filter (O‘ng) */}
				<select
					value={filterType}
					onChange={e => setFilterType(e.target.value)}
					className='w-full md:w-[200px] px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
				>
					<option value='all'>All</option>
					<option value='newest'>Newest</option>
					<option value='oldest'>Oldest</option>
				</select>
			</div>

			{/* Blog Cards */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
				{visibleBlogs.length === 0 ? (
					<p className='col-span-full text-center text-gray-500'>
						No blogs found.
					</p>
				) : (
					visibleBlogs.map((blog, index) => (
						<div key={`${blog.id}-${index}`} className='group cursor-pointer'>
							<div className='w-full bg-white rounded-[20px] shadow-sm hover:shadow-md transition-all duration-300'>
								{/* Image + LikeButton */}
								<div className='relative w-full h-[200px] md:h-[220px] lg:h-[240px] rounded-t-[20px] overflow-hidden'>
									<div className='absolute top-2 right-2 z-10'>
										<LikeButton postId={blog.id} />
									</div>
									<Link to={`/blog/${blog.id}`}>
										<img
											src={blog.images}
											alt={blog.title}
											className='w-full h-full object-cover group-hover:scale-105 transition duration-300'
										/>
									</Link>
								</div>

								{/* Content */}
								<div className='p-6 flex flex-col gap-3'>
									<h3 className='text-lg md:text-xl font-semibold text-gray-900'>
										{blog.title?.length > 50
											? blog.title.slice(0, 50) + '...'
											: blog.title}
									</h3>
									<p className='text-gray-600 text-sm md:text-base leading-relaxed'>
										{blog.content?.length > 100
											? blog.content.slice(0, 100) + '...'
											: blog.content}
									</p>
								</div>
							</div>
						</div>
					))
				)}
			</div>

			{/* See More button */}
			{isLimited && filteredBlogs.length > 6 && (
				<div className='mt-10 flex justify-center'>
					<button
						onClick={() => navigate('/blog')}
						className='px-6 py-2 bg-[#5D71DD] text-white rounded-md hover:bg-[#4a5dcf] transition'
					>
						See More
					</button>
				</div>
			)}
		</div>
	)
}

export default BlogLists
