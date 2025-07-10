import { BlogLists, Hero } from '../../components'

const HomePage = () => {
	return (
		<>
			{/* Hero section */}
			<Hero />

			{/* Blog list preview section */}
			<div className='w-full bg-white py-12 px-4'>
				<div className='max-w-6xl mx-auto'>
					<BlogLists isLimited={true} />
				</div>
			</div>
		</>
	)
}

export default HomePage
