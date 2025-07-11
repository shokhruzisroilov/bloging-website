import { Link, NavLink } from 'react-router-dom'
import { navLinks } from '../../utils/navLinks'
import {
	FaFacebookF,
	FaInstagram,
	FaGithub,
	FaLinkedinIn,
} from 'react-icons/fa'

const Footer = () => {
	return (
		<footer className='w-full bg-[#f7f9ff] border-t border-[#e0e0e0] px-4 py-10'>
			<div className='container mx-auto flex flex-col gap-10 md:flex-row md:items-center md:justify-between'>
				{/* Left: Logo */}
				<div className='text-center md:text-left'>
					<Link to='/'>
						<h1 className='text-2xl font-bold text-[#2F2222]'>
							{`Shohruz's Blog`}
						</h1>
					</Link>
				</div>

				{/* Center: Nav Links */}
				<nav>
					<ul className='flex flex-wrap justify-center md:justify-center gap-6 text-[#2F2222] font-medium'>
						{navLinks.map(item => (
							<li key={item.title}>
								<NavLink
									to={item.href}
									className='hover:text-[#5D71DD] hover:underline transition duration-200'
								>
									{item.title}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>

				{/* Right: Social Icons */}
				<div className='flex justify-center md:justify-end gap-5 text-xl'>
					<a
						href='https://facebook.com'
						target='_blank'
						rel='noopener noreferrer'
						className='text-[#2F2222] hover:text-[#5D71DD] transition'
					>
						<FaFacebookF />
					</a>
					<a
						href='https://instagram.com'
						target='_blank'
						rel='noopener noreferrer'
						className='text-[#2F2222] hover:text-[#5D71DD] transition'
					>
						<FaInstagram />
					</a>
					<a
						href='https://github.com'
						target='_blank'
						rel='noopener noreferrer'
						className='text-[#2F2222] hover:text-[#5D71DD] transition'
					>
						<FaGithub />
					</a>
					<a
						href='https://linkedin.com'
						target='_blank'
						rel='noopener noreferrer'
						className='text-[#2F2222] hover:text-[#5D71DD] transition'
					>
						<FaLinkedinIn />
					</a>
				</div>
			</div>

			{/* Copyright */}
			<div className='mt-10 text-center text-sm text-gray-500'>
				© 2025 by Shohruz Isroilov. All rights reserved.
			</div>
		</footer>
	)
}

export default Footer
