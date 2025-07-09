import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Newspaper, LogOut } from 'lucide-react'

const links = [
	{ name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={18} /> },
	{ name: 'Blogs', path: '/admin/blogs', icon: <Newspaper size={18} /> },
]

const AdminSidebar = () => {
	const navigate = useNavigate()

	const handleLogout = () => {
		localStorage.removeItem('token')
		navigate('/login')
	}

	return (
		<aside className='w-[240px] min-h-screen bg-[#4B5CD2] text-white p-6 shadow-md flex flex-col justify-between'>
			<div>
				<h2 className='text-2xl font-semibold mb-8 tracking-wide'>
					Admin Panel
				</h2>
				<nav className='flex flex-col gap-2'>
					{links.map(link => (
						<NavLink
							key={link.name}
							to={link.path}
							end={link.path === '/admin'}
							className={({ isActive }) =>
								`flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 ${
									isActive
										? 'bg-white text-[#4B5CD2] font-semibold shadow-sm'
										: 'hover:bg-[#6373e5] hover:bg-opacity-80'
								}`
							}
						>
							{link.icon}
							<span>{link.name}</span>
						</NavLink>
					))}
				</nav>
			</div>

			{/* Logout Button */}
			<button
				onClick={handleLogout}
				className='mt-8 flex items-center gap-3 px-4 py-2 rounded-md text-white hover:bg-[#3f4ec1] transition-all duration-200'
			>
				<LogOut size={18} />
				<span>Logout</span>
			</button>
		</aside>
	)
}

export default AdminSidebar
