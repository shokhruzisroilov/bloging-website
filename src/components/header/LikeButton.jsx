import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'

const LikeButton = ({ postId }) => {
	const [liked, setLiked] = useState(false)

	useEffect(() => {
		const stored = localStorage.getItem(`liked-${postId}`)
		if (stored === 'true') setLiked(true)
	}, [postId])

	const toggleLike = e => {
		e.preventDefault()
		const newLiked = !liked
		setLiked(newLiked)
		localStorage.setItem(`liked-${postId}`, newLiked)
	}

	return (
		<button
			onClick={toggleLike}
			className={`absolute top-3 right-3 p-2 rounded-full z-10 transition-colors shadow-md ${
				liked ? 'bg-red-500' : 'bg-white'
			}`}
			title={liked ? 'Unlike' : 'Like'}
		>
			<Heart
				className={`w-5 h-5 transition ${
					liked ? 'text-white' : 'text-gray-400'
				}`}
			/>
		</button>
	)
}

export default LikeButton
