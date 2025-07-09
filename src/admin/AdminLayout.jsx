import { useState } from 'react'
import AdminSidebar from './components/AdminSidebar'
import AdminHeader from './components/AdminHeader'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true)

	return (
		<div className='flex min-h-screen'>
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
