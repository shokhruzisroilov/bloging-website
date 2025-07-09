import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navLinks } from '../../utils/navLinks'
import { FiMenu, FiX } from 'react-icons/fi'

const Header = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	const toggleMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen)
	}

	return (
		<header className='w-full bg-white shadow-sm relative z-50'>
			<div className='container mx-auto px-4 md:px-10 py-4 flex items-center justify-between'>
				{/* Logo */}
				<Link to='/'>
					<h1 className='text-xl sm:text-2xl font-bold text-[#2F2222]'>
						{`Shohruz's Blog`}
					</h1>
				</Link>

				{/* Desktop Navigation */}
				<nav className='hidden md:flex items-center gap-8 lg:gap-12'>
					{navLinks.map(item => (
						<NavLink
							key={item.id}
							to={item.href}
							className={({ isActive }) =>
								`text-base font-medium ${
									isActive
										? 'text-[#5D71DD] border-b-2 border-[#5D71DD]'
										: 'text-[#2F2222]'
								} hover:text-[#5D71DD] hover:border-b-2 hover:border-[#5D71DD] transition-all duration-200 pb-1`
							}
						>
							{item.title}
						</NavLink>
					))}

					{/* Login Button */}
					<NavLink
						to='/login'
						className='ml-4 px-4 py-2 bg-[#5D71DD] text-white rounded-md text-sm font-medium hover:bg-[#4c5fd1] transition'
					>
						Login
					</NavLink>
				</nav>

				{/* Mobile Menu Button */}
				<div className='md:hidden text-2xl cursor-pointer' onClick={toggleMenu}>
					<FiMenu />
				</div>
			</div>

			{/* Mobile Menu Modal */}
			{isMobileMenuOpen && (
				<div className='fixed inset-0 w-full h-screen bg-white z-50 flex flex-col items-center justify-center gap-8 text-xl font-medium transition-all duration-300 px-6'>
					{/* Close Button */}
					<button
						onClick={() => setIsMobileMenuOpen(false)}
						className='absolute top-4 right-4 text-3xl text-[#2F2222] hover:text-[#5D71DD] transition'
					>
						<FiX />
					</button>

					{/* Mobile Navigation Links */}
					{navLinks.map(item => (
						<NavLink
							key={item.id}
							to={item.href}
							className='text-[#2F2222] hover:text-[#5D71DD] transition'
							onClick={() => setIsMobileMenuOpen(false)}
						>
							{item.title}
						</NavLink>
					))}

					{/* Mobile Login Button */}
					<NavLink
						to='/login'
						className='px-6 py-2 bg-[#5D71DD] text-white rounded-md text-base font-medium hover:bg-[#4c5fd1] transition'
						onClick={() => setIsMobileMenuOpen(false)}
					>
						Login
					</NavLink>
				</div>
			)}
		</header>
	)
}

export default Header
