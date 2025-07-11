import { useEffect, useState } from 'react'
import AdminSidebar from './components/AdminSidebar'
import AdminHeader from './components/AdminHeader'
import { Outlet } from 'react-router-dom'
import { getCurrentUser } from '../services/authService'

const AdminLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768)
	const [userName, setUserName] = useState('')

	useEffect(() => {
		// responsivlik uchun
		const handleResize = () => {
			setIsSidebarOpen(window.innerWidth >= 768)
		}
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	useEffect(() => {
		// foydalanuvchini olish
		const fetchUser = async () => {
			try {
				const data = await getCurrentUser()
				// console.log(data)
				setUserName(data?.name || data?.username || 'Admin')
			} catch (err) {
				console.error('User fetch error', err)
				setUserName('Admin')
			}
		}

		fetchUser()
	}, [])

	return (
		<div className='flex min-h-screen relative'>
			{/* Sidebar */}
			<div
				className={`fixed z-40 top-0 left-0 h-full transition-transform duration-300 ease-in-out ${
					isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
				} md:relative md:translate-x-0`}
			>
				<AdminSidebar />
			</div>

			{/* Overlay for mobile */}
			{isSidebarOpen && window.innerWidth < 768 && (
				<div
					className='fixed inset-0 bg-black bg-opacity-40 z-30'
					onClick={() => setIsSidebarOpen(false)}
				></div>
			)}

			<div className='flex flex-col flex-1 min-w-0'>
				<AdminHeader
					toggleSidebar={() => setIsSidebarOpen(prev => !prev)}
					isSidebarOpen={isSidebarOpen}
					userName={userName}
				/>
				<main className='flex-1 p-4 bg-gray-50 overflow-hidden'>
					<Outlet />
				</main>
			</div>
		</div>
	)
}

export default AdminLayout
