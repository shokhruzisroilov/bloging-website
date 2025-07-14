import { useState, useEffect, useCallback } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { Heart } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/auth/authSlice'
import { navLinks } from '../../utils/navLinks'
import blogsData from '../../utils/blogsData'
import { FaRegUserCircle } from 'react-icons/fa'

const Header = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [likedPosts, setLikedPosts] = useState([])

	const { token, role } = useSelector(state => state.auth)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const toggleMenu = useCallback(() => {
		setIsMobileMenuOpen(prev => !prev)
	}, [])

	const fetchLikedPosts = useCallback(() => {
		const likedIds = JSON.parse(localStorage.getItem('liked_posts')) || []
		const liked = blogsData.filter(blog => likedIds.includes(blog.id))
		setLikedPosts(liked)
	}, [])

	useEffect(() => {
		fetchLikedPosts()
	}, [fetchLikedPosts])

	const handleLogout = () => {
		dispatch(logout())
		navigate('/login')
	}

	return (
		<header className='w-full bg-white shadow-md z-50 fixed top-0 left-0'>
			<div className='max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center'>
				<Link to='/' className='text-2xl font-bold text-[#2F2222]'>
					Shohruz's<span className='text-[#5D71DD]'> blog</span>
				</Link>

				<nav className='hidden md:flex gap-8 items-center'>
					{navLinks.map(({ id, title, href }) => (
						<NavLink
							key={title}
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

					{role === 'admin' && (
						<NavLink
							to='/admin'
							className='text-sm font-medium text-[#5D71DD] hover:underline'
						>
							Admin Panel
						</NavLink>
					)}
				</nav>

				<div className='flex items-center gap-4 md:gap-6'>
					{/* Likes */}
					<Link
						to='/likes'
						className='relative group text-[#5D71DD] hover:text-[#4c5fd1] transition-transform hover:scale-110'
						aria-label='Likes'
					>
						<Heart className='w-6 h-6' />
						{likedPosts.length > 0 && (
							<span className='absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md'>
								{likedPosts.length}
							</span>
						)}
					</Link>

					{token ? (
						<Link
							to='/profile'
							className='text-[#5D71DD] hover:text-[#4c5fd1] text-[24px] transition-transform hover:scale-110'
							aria-label='Profile'
						>
							<FaRegUserCircle />
						</Link>
					) : (
						<Link
							to='/login'
							className='hidden md:inline-block px-4 py-2 bg-[#5D71DD] text-white rounded-md text-sm font-medium hover:bg-[#4c5fd1] transition'
						>
							Login
						</Link>
					)}

					{/* Mobile Menu Button */}
					<button
						className='md:hidden text-3xl text-[#2F2222]'
						onClick={toggleMenu}
					>
						<FiMenu />
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			<div
				className={`fixed inset-0 z-50 flex transition-opacity duration-300 ${
					isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
				}`}
			>
				<div
					className={`bg-white w-[75%] sm:w-[60%] max-w-xs h-full shadow-lg px-6 py-4 flex flex-col gap-6 text-lg transform transition-transform duration-300 ease-in-out ${
						isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
					}`}
				>
					<button
						onClick={toggleMenu}
						className='self-end text-3xl text-[#2F2222] hover:text-[#5D71DD]'
					>
						<FiX />
					</button>

					<nav className='flex flex-col gap-4 mt-4'>
						{navLinks.map(({ id, title, href }) => (
							<NavLink
								key={title}
								to={href}
								className='text-[#2F2222] hover:text-[#5D71DD] text-base font-medium'
								onClick={toggleMenu}
							>
								{title}
							</NavLink>
						))}

						{role === 'admin' && (
							<NavLink
								to='/admin'
								className='text-[#5D71DD] hover:underline'
								onClick={toggleMenu}
							>
								Admin Panel
							</NavLink>
						)}
					</nav>
				</div>

				{/* Overlay */}
				<div
					className='flex-1 bg-black bg-opacity-40 transition-opacity duration-300'
					onClick={toggleMenu}
				/>
			</div>
		</header>
	)
}

export default Header
