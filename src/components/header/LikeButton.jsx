import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'

const LikeButton = ({ postId }) => {
	const [liked, setLiked] = useState(false)

	// On component mount: Check if the post is already liked (from localStorage)
	useEffect(() => {
		const likedPosts = JSON.parse(localStorage.getItem('liked_posts')) || []
		setLiked(likedPosts.includes(postId))
	}, [postId])

	const toggleLike = () => {
		let likedPosts = JSON.parse(localStorage.getItem('liked_posts')) || []

		if (liked) {
			// If already liked, remove it from the list
			likedPosts = likedPosts.filter(id => id !== postId)
		} else {
			// Otherwise, add the post ID to likedPosts
			likedPosts.push(postId)
		}

		// Save the updated likedPosts list to localStorage
		localStorage.setItem('liked_posts', JSON.stringify(likedPosts))
		setLiked(!liked)
	}

	return (
		<button
			onClick={toggleLike}
			className='absolute top-3 right-3 z-50 text-[#5D71DD] hover:text-red-500 transition-all'
		>
			<Heart fill={liked ? 'red' : 'none'} />
		</button>
	)
}

export default LikeButton
