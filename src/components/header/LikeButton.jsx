import { useEffect } from 'react'
import { Heart } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleLike, fetchLikes } from '../../redux/likes/likeSlice'

const LikeButton = ({ postId }) => {
	const dispatch = useDispatch()
	const likedPostIds = useSelector(state => state.likes.likedPostIds)

	const liked = likedPostIds.includes(postId)

	const handleLike = () => {
		dispatch(toggleLike(postId))
	}

	useEffect(() => {
		dispatch(fetchLikes())
	}, [dispatch])

	return (
		<button
			onClick={handleLike}
			className='absolute top-3 right-3 z-50 text-[#5D71DD] hover:text-red-500 transition-all'
		>
			<Heart fill={liked ? 'red' : 'none'} />
		</button>
	)
}

export default LikeButton
