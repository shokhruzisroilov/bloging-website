import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'

const LikeButton = ({ postId }) => {
	const [liked, setLiked] = useState(false)

	// On mount: Check if the post is already liked in localStorage
	useEffect(() => {
		const stored = localStorage.getItem(`liked-${postId}`)
		setLiked(stored === 'true')
	}, [postId])

	// Toggle like/unlike status
	const toggleLike = e => {
		e.preventDefault()
		const newLiked = !liked
		setLiked(newLiked)
		localStorage.setItem(`liked-${postId}`, newLiked.toString())
	}

	return (
		<button
			onClick={toggleLike}
			className={`absolute top-3 right-3 p-2 rounded-full z-10 transition-all shadow-md ${
				liked ? 'bg-red-500 hover:bg-red-600' : 'bg-white hover:bg-gray-100'
			}`}
			title={liked ? 'Unlike' : 'Like'}
			aria-label={liked ? 'Unlike this post' : 'Like this post'}
		>
			<Heart
				className={`w-5 h-5 transition-colors ${
					liked ? 'text-white' : 'text-gray-400'
				}`}
			/>
		</button>
	)
}

export default LikeButton
