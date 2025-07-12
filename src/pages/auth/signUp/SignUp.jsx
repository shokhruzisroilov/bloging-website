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
			<form
				className='flex flex-col gap-5 bg-white p-8 rounded-xl shadow-md w-full max-w-lg mx-auto'
				onSubmit={handleRegister}
			>
				{/* Name */}
				<div className='flex flex-col gap-1'>
					<label className='text-sm text-gray-600'>Full Name</label>
					<input
						name='name'
						placeholder='John Doe'
						value={form.name}
						onChange={handleChange}
						className='px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
				</div>

				{/* Username */}
				<div className='flex flex-col gap-1'>
					<label className='text-sm text-gray-600'>Username</label>
					<input
						name='username'
						placeholder='johndoe'
						value={form.username}
						onChange={handleChange}
						className='px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
				</div>

				{/* Password */}
				<div className='flex flex-col gap-1'>
					<label className='text-sm text-gray-600'>Password</label>
					<input
						name='password'
						type='password'
						placeholder='••••••••'
						value={form.password}
						onChange={handleChange}
						className='px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
				</div>

				{/* Address */}
				<div className='flex flex-col gap-1'>
					<label className='text-sm text-gray-600'>Address</label>
					<input
						name='address'
						placeholder='Tashkent, Uzbekistan'
						value={form.address}
						onChange={handleChange}
						className='px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
				</div>

				{/* Phone Number */}
				<div className='flex flex-col gap-1'>
					<label className='text-sm text-gray-600'>Phone Number</label>
					<input
						name='number'
						type='number'
						placeholder='998901234567'
						value={form.number}
						onChange={handleChange}
						className='px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
				</div>

				{/* Email */}
				<div className='flex flex-col gap-1'>
					<label className='text-sm text-gray-600'>Email</label>
					<input
						name='email'
						type='email'
						placeholder='example@gmail.com'
						value={form.email}
						onChange={handleChange}
						className='px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
				</div>

				{/* Submit Button */}
				<button
					type='submit'
					className='bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-200'
				>
					Sign Up
				</button>

				{/* Login Link */}
				<p className='text-sm text-center text-gray-600'>
					Already have an account?{' '}
					<Link
						to='/login'
						className='text-blue-600 hover:underline font-medium'
					>
						Login
					</Link>
				</p>
			</form>
		</AuthLayout>
	)
}

export default SignUp
