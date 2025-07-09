import { Link } from 'react-router-dom'
import AuthLayout from '../../../layout/AuthLayout'

const SignUp = () => {
	return (
		<AuthLayout title='Create an account'>
			<form className='flex flex-col gap-4'>
				<input
					type='text'
					placeholder='Full Name'
					className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5D71DD]'
				/>
				<input
					type='email'
					placeholder='Email'
					className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5D71DD]'
				/>
				<input
					type='password'
					placeholder='Password'
					className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5D71DD]'
				/>
				<button
					type='submit'
					className='bg-[#5D71DD] text-white py-2 rounded-md hover:bg-[#4a5dcf] transition'
				>
					Sign Up
				</button>
				<p className='text-sm text-center text-gray-600'>
					Already have an account?{' '}
					<Link to='/login' className='text-[#5D71DD] hover:underline'>
						Login
					</Link>
				</p>
			</form>
		</AuthLayout>
	)
}

export default SignUp
