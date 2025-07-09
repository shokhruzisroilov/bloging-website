import { BlogLists } from '../../components'

const Blogs = () => {
	return (
		<div>
			{/* Hero Section */}
			<section className='w-full bg-[#f2f2f2] py-16 px-4'>
				<div className='max-w-4xl mx-auto text-center'>
					<h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2F2222] mb-6 leading-snug'>
						All Blog Posts
					</h1>
					<p className='text-[#444] text-base sm:text-lg lg:text-xl leading-relaxed'>
						Explore the latest articles, tutorials, and insights on frontend
						development, design, and more.
					</p>
				</div>
			</section>

			{/* Blog List Section */}
			<section className='w-full bg-white py-12 px-4'>
				<div className='max-w-6xl mx-auto'>
					<BlogLists />
				</div>
			</section>
		</div>
	)
}

export default Blogs
