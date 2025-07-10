import { Link } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'

const NotFoundPage = () => {
	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center'>
			<AlertTriangle className='w-16 h-16 text-yellow-500 mb-4' />
			<h1 className='text-4xl sm:text-5xl font-bold text-gray-800 mb-2'>404</h1>
			<p className='text-lg sm:text-xl text-gray-600 mb-6'>Sahifa topilmadi</p>
			<Link
				to='/'
				className='inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition duration-300'
			>
				Bosh sahifaga qaytish
			</Link>
		</div>
	)
}

export default NotFoundPage
