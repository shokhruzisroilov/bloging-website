const AuthLayout = ({ children, title }) => {
	return (
		<section className='min-h-screen flex items-center justify-center bg-[#f2f2f2] px-4 py-16'>
			<div className='w-full max-w-md bg-white rounded-xl shadow-md p-8'>
				<h2 className='text-2xl font-bold text-center mb-6 text-[#2F2222]'>
					{title}
				</h2>
				{children}
			</div>
		</section>
	)
}

export default AuthLayout
