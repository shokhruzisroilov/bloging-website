import { useParams } from 'react-router-dom'
import blogsData from '../../utils/blogsData'
import { useState } from 'react'

const BlogDetail = () => {
	const { id } = useParams()

	// Find the blog post by its ID from mock data
	const blog = blogsData.find(item => item.id === Number(id))

	// Local state for handling comments
	const [comments, setComments] = useState([])
	const [commentText, setCommentText] = useState('')

	// Handle comment submission
	const handleSubmit = e => {
		e.preventDefault()
		if (commentText.trim()) {
			setComments(prev => [...prev, commentText.trim()])
			setCommentText('')
		}
	}

	// If no blog is found
	if (!blog) {
		return <div className='p-10 text-center text-lg'>Blog not found.</div>
	}

	return (
		<div className='container mx-auto px-4 pt-40 max-w-4xl'>
			{/* Blog Image */}
			<div className='w-full max-h-[400px] md:h-[450px] lg:h-[500px] rounded-xl overflow-hidden mb-8'>
				<img
					src={blog.image}
					alt={blog.title}
					className='w-full h-full object-cover'
				/>
			</div>

			{/* Category and Date */}
			<div className='flex items-center justify-between mb-4 text-sm text-gray-600'>
				<span className='bg-[#F7F8FD] text-[#5D71DD] px-3 py-1 rounded-md font-medium'>
					{blog.category}
				</span>
				<span>{blog.date}</span>
			</div>

			{/* Blog Title */}
			<h1 className='text-3xl font-bold text-gray-900 mb-4'>{blog.title}</h1>

			{/* Blog Description / Body */}
			<p className='text-gray-700 leading-relaxed mb-10'>
				{blog.description} Lorem ipsum dolor sit amet, consectetur adipisicing
				elit. Quis, dolores. Tempore optio exercitationem repellendus aspernatur
				sint! Facere, rerum. Commodi in ad esse voluptate facilis atque a
				deleniti assumenda aspernatur dolorum.
			</p>

			{/* Comment Section */}
			<div className='mt-12 border-t pt-8'>
				<h2 className='text-xl font-semibold mb-4'>Leave a Comment</h2>

				{/* Comment Form */}
				<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
					<textarea
						value={commentText}
						onChange={e => setCommentText(e.target.value)}
						rows='4'
						placeholder='Write your comment here...'
						className='w-full p-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#5D71DD] transition'
					/>
					<button
						type='submit'
						className='self-start bg-[#5D71DD] text-white px-6 py-2 rounded-md hover:bg-[#4c5fd1] transition'
					>
						Post Comment
					</button>
				</form>

				{/* Display Comments */}
				{comments.length > 0 && (
					<div className='mt-8'>
						<h3 className='text-lg font-medium mb-2'>Comments</h3>
						<ul className='flex flex-col gap-3'>
							{comments.map((comment, index) => (
								<li
									key={index}
									className='bg-[#f9f9f9] px-4 py-3 rounded-md border text-gray-700'
								>
									{comment}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	)
}

export default BlogDetail
