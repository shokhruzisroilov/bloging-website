import { useEffect, useState } from 'react'
import { getCurrentUser } from '../../services/authService'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
	const [user, setUser] = useState(null)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const data = await getCurrentUser()
				setUser(data)
			} catch (error) {
				console.error('Error fetching user info:', error)
			}
		}
		fetchUser()
	}, [])

	const handleLogout = () => {
		dispatch(logout())
		navigate('/login')
	}

	if (!user) {
		return (
			<div className='flex justify-center items-center min-h-[50vh]'>
				<p className='text-lg text-gray-500 animate-pulse'>Loading...</p>
			</div>
		)
	}

	return (
		<div className='w-full min-h-screen flex items-center justify-center'>
			<div className='max-w-2xl w-full mt-16 px-6'>
				<div className='bg-white rounded-xl shadow-lg p-6 sm:p-10'>
					<h2 className='text-2xl font-bold text-[#2F2222] mb-6 text-center'>
						👤 Profile Information
					</h2>

					<div className='space-y-4'>
						{[
							{ label: '👨‍💼 Name', value: user.full_name || user.username },
							{ label: '📧 Email', value: user.email },
							{ label: '🔐 Role', value: user.role },
							{ label: '🏡 Address', value: user.address },
							{ label: '📞 Phone', value: user.number },
						].map(({ label, value }) => (
							<div
								key={label}
								className='flex justify-between border-b pb-2 text-gray-700'
							>
								<span className='font-medium text-gray-600'>{label}:</span>
								<span className='text-right'>{value}</span>
							</div>
						))}
					</div>

					<div className='mt-10 flex justify-between gap-4 flex-wrap'>
						<button className='px-6 py-2 bg-[#5D71DD] text-white rounded-md hover:bg-[#4c5fd1] transition w-full sm:w-auto'>
							Edit Profile
						</button>
						<button
							onClick={handleLogout}
							className='px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition w-full sm:w-auto'
						>
							Logout
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile
