import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { fetchBlogs } from '../../redux/blogs/blogSlice'
import LikeButton from '../header/LikeButton'

const BlogLists = ({ isLimited = false }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { blogs, loading, error } = useSelector(state => state.blogs)
	console.log(blogs)

	useEffect(() => {
		dispatch(fetchBlogs())
	}, [dispatch])

	const visibleBlogs = isLimited
		? [...blogs].reverse().slice(0, 6)
		: [...blogs].reverse()

	if (loading) return <p className='text-center'>Loading...</p>
	if (error) return <p className='text-center text-red-500'>Error: {error}</p>

	return (
		<div>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
				{visibleBlogs.map((blog, index) => (
					<div key={`${blog.id}-${index}`} className='group cursor-pointer'>
						<div className='w-full bg-white rounded-[20px] shadow-sm hover:shadow-md transition-all duration-300'>
							{/* Image + LikeButton */}
							<div className='relative w-full h-[200px] md:h-[220px] lg:h-[240px] rounded-t-[20px] overflow-hidden'>
								{/* Like Button in top-right corner */}
								<div className='absolute top-2 right-2 z-10'>
									<LikeButton postId={blog.id} />
								</div>

								<Link to={`/blog/${blog.id}`}>
									<img
										src={
											blog.images
												? `http://192.168.12.239:8000/${blog.images}`
												: 'https://www.shutterstock.com/image-photo/bloggingblog-concepts-ideas-white-worktable-260nw-1029506242.jpg'
										}
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
				))}
			</div>

			{isLimited && blogs.length > 6 && (
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
