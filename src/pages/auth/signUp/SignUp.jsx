import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../../../services/authService'
import AuthLayout from '../../../layout/AuthLayout'

const SignUp = () => {
	const [form, setForm] = useState({
		name: '',
		username: '',
		password: '',
		address: '',
		number: '',
		email: '',
	})

	const navigate = useNavigate()

	const handleChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleRegister = async e => {
		e.preventDefault()
		try {
			await registerUser({ ...form, number: Number(form.number) })
			navigate('/login')
		} catch (err) {
			alert('Register xato')
		}
	}

	return (
		<AuthLayout title='Create an account'>
			<form className='flex flex-col gap-4' onSubmit={handleRegister}>
				<input
					name='name'
					placeholder='Name'
					value={form.name}
					onChange={handleChange}
					className='input'
				/>
				<input
					name='username'
					placeholder='Username'
					value={form.username}
					onChange={handleChange}
					className='input'
				/>
				<input
					name='password'
					type='password'
					placeholder='Password'
					value={form.password}
					onChange={handleChange}
					className='input'
				/>
				<input
					name='address'
					placeholder='Address'
					value={form.address}
					onChange={handleChange}
					className='input'
				/>
				<input
					name='number'
					type='number'
					placeholder='Number'
					value={form.number}
					onChange={handleChange}
					className='input'
				/>
				<input
					name='email'
					type='email'
					placeholder='Email'
					value={form.email}
					onChange={handleChange}
					className='input'
				/>
				<button type='submit' className='btn'>
					Sign Up
				</button>
				<p className='text-sm text-center text-gray-600'>
					Already have an account?{' '}
					<Link to='/login' className='link'>
						Login
					</Link>
				</p>
			</form>
		</AuthLayout>
	)
}

export default SignUp
