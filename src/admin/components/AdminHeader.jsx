import { HiSwitchHorizontal } from 'react-icons/hi'

const AdminHeader = ({ toggleSidebar, isSidebarOpen, userName }) => {
	return (
		<header className='w-full flex items-center justify-between bg-white border-b px-6 py-4 shadow-sm'>
			<div className='flex items-center gap-4'>
				<button
					onClick={toggleSidebar}
					className='text-gray-700 focus:outline-none'
				>
					<HiSwitchHorizontal className='text-[24px]' />
				</button>
				<h1 className='text-lg font-semibold text-gray-800'>{`Shohruz's Blog`}</h1>
			</div>
			<div className='text-gray-600 font-medium'>{userName}</div>
		</header>
	)
}

export default AdminHeader
