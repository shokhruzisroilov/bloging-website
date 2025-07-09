import { useNavigate } from 'react-router-dom'
import blogsData from '../../utils/blogsData'
import { Link } from 'react-router-dom'

const BlogLists = ({ isLimited = false }) => {
	const navigate = useNavigate()

	// limit check
	const visibleBlogs = isLimited ? blogsData.slice(0, 6) : blogsData

	return (
		<div>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
				{visibleBlogs.map(blog => (
					<Link
						to={`/blog/${blog.id}`}
						key={blog.id}
						className='group cursor-pointer'
					>
						<div className='w-full bg-white rounded-[20px] shadow-sm hover:shadow-md transition-all duration-300'>
							<div className='w-full h-[200px] md:h-[220px] lg:h-[240px] rounded-t-[20px] overflow-hidden'>
								<img
									src={blog.image}
									alt={blog.title}
									className='w-full h-full object-cover group-hover:scale-105 transition duration-300'
								/>
							</div>
							<div className='p-6 flex flex-col gap-3'>
								<div className='flex items-center justify-between text-sm'>
									<span className='px-3 py-1 bg-[#F7F8FD] text-[#5D71DD] rounded-md font-medium'>
										{blog.category}
									</span>
									<span className='text-gray-500'>{blog.date}</span>
								</div>
								<h3 className='text-lg md:text-xl font-semibold text-gray-900'>
									{blog.title.length > 50
										? blog.title.slice(0, 50) + '...'
										: blog.title}
								</h3>
								<p className='text-gray-600 text-sm md:text-base leading-relaxed'>
									{blog.description.length > 100
										? blog.description.slice(0, 100) + '...'
										: blog.description}
								</p>
							</div>
						</div>
					</Link>
				))}
			</div>

			{/* Show "See More" only on Home Page */}
			{isLimited && blogsData.length > 6 && (
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
