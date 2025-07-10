const Hero = () => {
	return (
		<section className='w-full bg-gradient-to-br from-[#f2f2f2] to-[#e0e7ff] pb-24 pt-36 px-4 flex items-center justify-center'>
			{/* Hero Content Container */}
			<div className='max-w-5xl text-center px-4'>
				{/* Main Heading */}
				<h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1f1f1f] leading-tight tracking-tight mb-6 transition-all duration-300'>
					Welcome to <span className='text-[#5D71DD]'>My Blogs</span>
				</h1>

				{/* Subheading / Description */}
				<p className='text-base sm:text-lg md:text-xl text-[#333] leading-relaxed max-w-3xl mx-auto'>
					Discover a collection of stories, tutorials, and tips across front-end
					technology, design, and personal development. Curated with care to
					inspire and inform every reader.
				</p>
			</div>
		</section>
	)
}

export default Hero
