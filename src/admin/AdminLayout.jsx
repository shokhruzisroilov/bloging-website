import { useEffect, useState } from 'react'
import AdminSidebar from './components/AdminSidebar'
import AdminHeader from './components/AdminHeader'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768)

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 768) {
				setIsSidebarOpen(false)
			} else {
				setIsSidebarOpen(true)
			}
		}

		window.addEventListener('resize', handleResize)

		// Cleanup
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<div className='flex min-h-screen overflow-x-hidden'>
			{isSidebarOpen && <AdminSidebar />}
			<div className='flex flex-col flex-1'>
				<AdminHeader
					toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
					isSidebarOpen={isSidebarOpen}
					userName='Shohruz'
				/>
				<main className='flex-1 p-6 bg-gray-50'>
					<Outlet />
				</main>
			</div>
		</div>
	)
}

export default AdminLayout
