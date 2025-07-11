import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogs } from '../../redux/blogs/blogSlice'
import { createComment, fetchComments } from '../../redux/blogs/commentSlice'

const BlogDetail = () => {
	const { id } = useParams()
	const dispatch = useDispatch()

	const {
		blogs,
		loading: blogsLoading,
		error: blogsError,
	} = useSelector(state => state.blogs)

	const {
		comments,
		loading: commentsLoading,
		error: commentsError,
	} = useSelector(state => state.comments)

	const [commentText, setCommentText] = useState('')

	// Fetch blogs if not loaded
	useEffect(() => {
		if (blogs.length === 0) {
			dispatch(fetchBlogs())
		}
	}, [blogs.length, dispatch])

	// Fetch comments
	useEffect(() => {
		dispatch(fetchComments())
	}, [dispatch])

	// Find blog by ID
	const blog = blogs.find(item => item.id === Number(id))

	// Filter comments for this blog
	const blogComments = comments.filter(c => c.post_id === Number(id))

	// Submit new comment
	const handleSubmit = async e => {
		e.preventDefault()
		if (commentText.trim()) {
			const newComment = {
				text: commentText.trim(),
				user_id: 11,
				post_id: Number(id),
			}

			await dispatch(createComment(newComment))
			dispatch(fetchComments())
			setCommentText('')
		}
	}

	if (blogsLoading) return <p className='text-center'>Loading blog...</p>
	if (blogsError)
		return <p className='text-red-500 text-center'>Error: {blogsError}</p>
	if (!blog) return <p className='text-center pt-40'>Blog not found.</p>

	return (
		<div className='container mx-auto px-4 pt-40 max-w-4xl'>
			{/* Blog Image */}
			<div className='w-full max-h-[400px] md:h-[450px] lg:h-[500px] rounded-xl overflow-hidden mb-8'>
				<img
					src={
						blog.images ||
						'https://www.shutterstock.com/image-photo/bloggingblog-concepts-ideas-white-worktable-260nw-1029506242.jpg'
					}
					alt={blog.title}
					className='w-full h-full object-cover'
				/>
			</div>

			{/* Blog Title */}
			<h1 className='text-3xl font-bold text-gray-900 mb-4'>{blog.title}</h1>

			{/* Blog Content */}
			<p className='text-gray-700 leading-relaxed mb-10'>{blog.content}</p>

			{/* Comments Section */}
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

				{/* Comments List */}
				{commentsLoading && (
					<p className='text-gray-500 mt-4'>Loading comments...</p>
				)}
				{commentsError && (
					<p className='text-red-500 mt-4'>Error: {commentsError}</p>
				)}

				{blogComments.length > 0 && (
					<div className='mt-8'>
						<h3 className='text-lg font-medium mb-2'>Comments</h3>
						<ul className='flex flex-col gap-3'>
							{blogComments.map(comment => (
								<li
									key={comment.id}
									className='bg-[#f9f9f9] px-4 py-3 rounded-md border text-gray-700'
								>
									{comment.text}
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
