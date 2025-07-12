import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../../../services/authService'
import { setCredentials } from '../../../redux/auth/authSlice'
import AuthLayout from '../../../layout/AuthLayout'

const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const res = await loginUser({ username, password })
			dispatch(setCredentials(res))
			navigate(res.role === 'admin' ? '/admin' : '/')
		} catch (err) {
			alert('Login xato: Username yoki password noto‘g‘ri!')
		}
	}

	return (
		<AuthLayout>
			<form
				className='flex flex-col gap-5 bg-white p-8 rounded-xl shadow-md w-full max-w-md mx-auto'
				onSubmit={handleSubmit}
			>
				<h2 className='text-2xl font-bold text-center text-gray-800 mb-4'>
					Login to your account
				</h2>

				<div className='flex flex-col gap-1'>
					<label className='text-sm text-gray-600'>Username</label>
					<input
						type='text'
						placeholder='Enter your username'
						value={username}
						onChange={e => setUsername(e.target.value)}
						className='px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<label className='text-sm text-gray-600'>Password</label>
					<input
						type='password'
						placeholder='••••••••'
						value={password}
						onChange={e => setPassword(e.target.value)}
						className='px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
				</div>

				<button
					type='submit'
					className='bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-200'
				>
					Login
				</button>

				<p className='text-sm text-center text-gray-600'>
					Don't have an account?{' '}
					<Link
						to='/sign-up'
						className='text-blue-600 hover:underline font-medium'
					>
						Sign Up
					</Link>
				</p>
			</form>
		</AuthLayout>
	)
}

export default Login
