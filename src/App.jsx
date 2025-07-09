import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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

// Admin components
import AdminLayout from './admin/AdminLayout'
import Dashboard from './admin/pages/Dashboard'
import BlogsDashboard from './admin/pages/BlogsDashboard'

const App = () => {
	return (
		<Router>
			<ScrollToTop />
			<Routes>
				{/* User routes  */}
				<Route path='/' element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path='blog' element={<Blogs />} />
					<Route path='blog/:id' element={<BlogDetail />} />
					<Route path='login' element={<Login />} />
					<Route path='signup' element={<SignUp />} />
					<Route path='*' element={<NotFoundPage />} />
				</Route>

				{/* Admin routes  */}
				<Route path='/admin' element={<AdminLayout />}>
					<Route index element={<Dashboard />} />
					<Route path='blogs' element={<BlogsDashboard />} />
				</Route>
			</Routes>
		</Router>
	)
}

export default App
