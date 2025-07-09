import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import {
	BlogDetail,
	Blogs,
	HomePage,
	Login,
	NotFoundPage,
	SignUp,
} from './pages'
import ScrollToTop from './components/ScrollToTop'

const App = () => {
	return (
		<>
			<ScrollToTop />
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path='/blog' element={<Blogs />} />
					<Route path='/blog/:id' element={<BlogDetail />} />
					<Route path='/login' element={<Login />} />
					<Route path='/sign-up' element={<SignUp />} />
					<Route path='*' element={<NotFoundPage />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
