const Hero = () => {
	return (
		<section className='w-full bg-gradient-to-br from-[#f2f2f2] to-[#e0e7ff] py-20 px-4 flex items-center justify-center'>
			<div className='max-w-5xl text-center px-4'>
				<h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1f1f1f] leading-tight tracking-tight mb-6 transition-all duration-300'>
					Welcome to <span className='text-[#5D71DD]'>My Blog</span>
				</h1>
				<p className='text-base sm:text-lg md:text-xl text-[#333] leading-relaxed max-w-3xl mx-auto'>
					{`Explore insightful articles, helpful tutorials, and stories that
					inspire growth. Whether you're into tech, design, or personal
					development — there's something here for you.`}
				</p>
			</div>
		</section>
	)
}

export default Hero
