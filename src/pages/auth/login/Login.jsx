// ⛳️ Login.jsx
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
		<AuthLayout title='Login to your account'>
			<form className='flex flex-col gap-4' onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Username'
					value={username}
					onChange={e => setUsername(e.target.value)}
					className='input'
				/>
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={e => setPassword(e.target.value)}
					className='input'
				/>
				<button type='submit' className='btn'>
					Login
				</button>
				<p className='text-sm text-center text-gray-600'>
					Don't have an account?{' '}
					<Link to='/sign-up' className='link'>
						Sign Up
					</Link>
				</p>
			</form>
		</AuthLayout>
	)
}

export default Login
