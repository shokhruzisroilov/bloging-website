import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBlogs } from '../../redux/blogs/blogSlice'
import { fetchLikes } from '../../redux/likes/likeSlice'

const Likes = () => {
	const dispatch = useDispatch()
	const { blogs, loading, error } = useSelector(state => state.blogs)
	const { likedPostIds } = useSelector(state => state.likes)

	useEffect(() => {
		dispatch(fetchBlogs())
		dispatch(fetchLikes())
	}, [dispatch])

	const likedPosts = blogs.filter(post => likedPostIds.includes(post.id))

	return (
		<div className='max-w-4xl mx-auto mt-24 px-4'>
			<h1 className='text-2xl font-bold mb-6 text-[#2F2222]'>❤️ Liked Posts</h1>

			{loading ? (
				<p className='text-gray-500'>Loading...</p>
			) : error ? (
				<p className='text-red-500'>Error: {error}</p>
			) : likedPosts.length === 0 ? (
				<p className='text-gray-600'>You haven’t liked any posts yet.</p>
			) : (
				<ul className='space-y-4'>
					{likedPosts.map(post => (
						<li
							key={post.id}
							className='border p-4 rounded-md shadow-sm hover:shadow-md transition'
						>
							<Link
								to={`/blog/${post.id}`}
								className='text-lg font-semibold text-[#5D71DD] hover:underline'
							>
								{post.title}
							</Link>
							<p className='text-gray-500 text-sm mt-1'>{post.date}</p>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default Likes
