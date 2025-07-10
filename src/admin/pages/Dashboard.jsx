import React from 'react'
import { BarChart3, Users, Eye, Heart } from 'lucide-react'

const stats = [
	{
		title: 'Total Blogs',
		value: 128,
		icon: <BarChart3 className='text-blue-500' size={32} />,
	},
	{
		title: 'Total Users',
		value: 534,
		icon: <Users className='text-green-500' size={32} />,
	},
	{
		title: 'Total Views',
		value: '12.3K',
		icon: <Eye className='text-purple-500' size={32} />,
	},
	{
		title: 'Total Likes',
		value: 846,
		icon: <Heart className='text-pink-500' size={32} />,
	},
]

const Dashboard = () => {
	return (
		<>
			<h1 className='text-xl md:text-2xl font-bold mb-6'>
				Welcome to Admin Dashboard
			</h1>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
				{stats.map((item, idx) => (
					<div
						key={idx}
						className='bg-white shadow-md rounded-2xl p-5 flex items-center gap-4 hover:shadow-lg transition-all'
					>
						<div className='p-3 rounded-full bg-gray-100'>{item.icon}</div>
						<div>
							<p className='text-gray-500 text-sm'>{item.title}</p>
							<p className='text-xl font-semibold'>{item.value}</p>
						</div>
					</div>
				))}
			</div>
		</>
	)
}

export default Dashboard
