import { useState, useEffect, useCallback } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { Heart } from 'lucide-react'
import { navLinks } from '../../utils/navLinks'
import blogsData from '../../utils/blogsData'

const Header = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [showLikes, setShowLikes] = useState(false)
	const [likedPosts, setLikedPosts] = useState([])

	// Toggle mobile menu open/close
	const toggleMenu = useCallback(() => {
		setIsMobileMenuOpen(prev => !prev)
	}, [])

	// Get liked posts from localStorage
	const fetchLikedPosts = useCallback(() => {
		const liked = blogsData.filter(
			blog => localStorage.getItem(`liked-${blog.id}`) === 'true'
		)
		setLikedPosts(liked)
	}, [])

	// Fetch liked posts on initial mount
	useEffect(() => {
		fetchLikedPosts()
	}, [fetchLikedPosts])

	// Toggle likes modal and refresh liked posts
	const toggleLikesModal = useCallback(() => {
		if (!showLikes) fetchLikedPosts()
		setShowLikes(prev => !prev)
	}, [showLikes, fetchLikedPosts])

	// Handle like/unlike toggle for a blog post
	const handleLike = useCallback(
		postId => {
			const key = `liked-${postId}`
			const isLiked = localStorage.getItem(key) === 'true'
			localStorage.setItem(key, (!isLiked).toString())
			fetchLikedPosts()
		},
		[fetchLikedPosts]
	)

	return (
		<header className='w-full bg-white shadow-md z-50 fixed top-0 left-0'>
			{/* Main Header Container */}
			<div className='max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center'>
				{/* Logo */}
				<Link to='/' className='text-2xl font-bold text-[#2F2222] transition'>
					Shohruz's<span className='text-[#5D71DD]'> blog</span>
				</Link>

				{/* Desktop Navigation */}
				<nav className='hidden md:flex gap-8 items-center'>
					{navLinks.map(({ id, title, href }) => (
						<NavLink
							key={id}
							to={href}
							className={({ isActive }) =>
								`text-sm font-medium transition-all duration-200 pb-1 border-b-2 ${
									isActive
										? 'text-[#5D71DD] border-[#5D71DD]'
										: 'text-[#2F2222] border-transparent hover:text-[#5D71DD] hover:border-[#5D71DD]'
								}`
							}
						>
							{title}
						</NavLink>
					))}
				</nav>

				{/* Right Side Icons and Buttons */}
				<div className='flex items-center gap-4 md:gap-6'>
					{/* Likes Button */}
					<button onClick={toggleLikesModal} className='relative group'>
						<Heart className='w-6 h-6 text-[#5D71DD] group-hover:scale-110 transition-transform' />
						{likedPosts.length > 0 && (
							<span className='absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md'>
								{likedPosts.length}
							</span>
						)}
					</button>

					{/* Login Button (desktop only) */}
					<Link
						to='/login'
						className='hidden md:inline-block px-4 py-2 bg-[#5D71DD] text-white rounded-md text-sm font-medium hover:bg-[#4c5fd1] transition'
					>
						Login
					</Link>

					{/* Mobile Menu Toggle Button */}
					<button
						className='md:hidden text-3xl text-[#2F2222]'
						onClick={toggleMenu}
					>
						<FiMenu />
					</button>
				</div>
			</div>

			{/* Mobile Menu Overlay & Sidebar */}
			<div
				className={`fixed inset-0 z-50 flex transition-opacity duration-300 ${
					isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
				}`}
			>
				{/* Sidebar: slides in from the left */}
				<div
					className={`
			bg-white w-[75%] sm:w-[60%] max-w-xs h-full shadow-lg px-6 py-4 flex flex-col gap-6 text-lg
			transform transition-transform duration-300 ease-in-out
			${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
		`}
				>
					{/* Close Button */}
					<button
						onClick={toggleMenu}
						className='self-end text-3xl text-[#2F2222] hover:text-[#5D71DD] transition'
					>
						<FiX />
					</button>

					{/* Navigation Links */}
					<nav className='flex flex-col gap-4 mt-4'>
						{navLinks.map(({ id, title, href }) => (
							<NavLink
								key={id}
								to={href}
								className='text-[#2F2222] hover:text-[#5D71DD] transition text-base font-medium'
								onClick={toggleMenu}
							>
								{title}
							</NavLink>
						))}
					</nav>

					{/* Login Button */}
					<Link
						to='/login'
						className='px-4 py-2 bg-[#5D71DD] text-white rounded-md text-sm font-medium hover:bg-[#4c5fd1] transition text-center'
					>
						Login
					</Link>
				</div>

				{/* Overlay */}
				<div
					className='flex-1 bg-black bg-opacity-40 transition-opacity duration-300'
					onClick={toggleMenu}
				/>
			</div>

			{/* Likes Modal */}
			{showLikes && (
				<div className='fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4'>
					<div className='bg-white w-full max-w-md p-6 rounded-xl shadow-xl relative'>
						{/* Close Button */}
						<button
							onClick={toggleLikesModal}
							className='absolute top-3 right-4 text-2xl font-bold text-gray-500 hover:text-red-500 transition'
						>
							&times;
						</button>

						{/* Modal Title */}
						<h2 className='text-xl font-semibold mb-4 text-[#2F2222]'>
							Liked Posts ❤️
						</h2>

						{/* Modal Content */}
						{likedPosts.length === 0 ? (
							<p className='text-gray-600'>You haven’t liked any posts yet.</p>
						) : (
							<ul className='space-y-3 max-h-[300px] overflow-y-auto pr-2'>
								{likedPosts.map(post => (
									<li
										key={post.id}
										className='border-b pb-2 flex justify-between items-center'
									>
										<Link
											to={`/blog/${post.id}`}
											className='text-[#5D71DD] hover:underline'
											onClick={toggleLikesModal}
										>
											{post.title}
										</Link>
										<button
											onClick={() => handleLike(post.id)}
											className='text-red-500 text-sm hover:underline'
										>
											Unlike
										</button>
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
			)}
		</header>
	)
}

export default Header
