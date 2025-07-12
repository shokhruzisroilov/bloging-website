import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import {
	BlogDetail,
	Blogs,
	Contact,
	HomePage,
	Likes,
	Login,
	NotFoundPage,
	Profile,
	SignUp,
} from './pages'
import ScrollToTop from './components/ScrollToTop'
import AdminLayout from './admin/AdminLayout'
import Dashboard from './admin/pages/Dashboard'
import BlogsDashboard from './admin/pages/BlogsDashboard'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
	return (
		<Router>
			<ScrollToTop />
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path='blog' element={<Blogs />} />
					<Route path='blog/:id' element={<BlogDetail />} />
					<Route path='login' element={<Login />} />
					<Route path='contact' element={<Contact />} />
					<Route path='sign-up' element={<SignUp />} />
					<Route path='profile' element={<Profile />} />
					<Route path='likes' element={<Likes />} />
				</Route>
				<Route
					path='/admin'
					element={
						<ProtectedRoute requiredRole='admin'>
							<AdminLayout />
						</ProtectedRoute>
					}
				>
					<Route index element={<Dashboard />} />
					<Route path='blogs' element={<BlogsDashboard />} />
				</Route>
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</Router>
	)
}

export default App
