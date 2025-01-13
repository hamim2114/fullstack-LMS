/* eslint-disable react/prop-types */
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/home/Home'
import NotFound from './pages/notFound/Index'
import Resourse from './pages/resourse/Resourse'
import Course from './pages/course/Course'
import Navbar from './components/home/Navbar'
import Footer from './components/home/Footer'
import CourseDetails from './pages/course/CourseDetails'
import Blog from './pages/blog/Blog'
import BlogDetails from './pages/blog/BlogDetails'
import Contact from './pages/contact/Contact'
import Dashboard from './pages/dashboard/dashboard/Dashboard'
import Layout from './pages/dashboard/Layout'
import ContactTop from './components/ContactTop'
import StudentLogin from './pages/signin/StudentLogin'
import SignUp from './pages/signup/Signup'
import Setting from './pages/dashboard/settings/Setting'
import VerifyEmail from './verifyEmail/VerifyEmail'
import useAuth from './hook/useAuth'
import useUser from './hook/useUser'
import MyCourse from './pages/dashboard/myCourse/MyCourse'
import EnrolledCourse from './pages/dashboard/enrolledCourse/EnrolledCourse'
import LearnCourse from './pages/dashboard/enrolledCourse/LearnCourse'
import ForgotePass from './pages/forgotePass/ForgotePass'
import PasswordReset from './pages/password-reset/PasswordReset'
import Profile from './pages/dashboard/profile/Profile'
import InstructorLogin from './pages/signin/InstructorLogin'
import MyCourseDetails from './pages/dashboard/myCourse/MyCourseDetails'
import Loader from './common/Loader'

const HomeLayout = () => (
  <>
    <Navbar />
    <ContactTop />
    <Outlet />
    <Footer />
  </>
)

const ConditionalRoute = ({ user, isLoading }) => {
  if (isLoading) return <Loader />

  const instructor = user?.role === 'instructor'
  const student = user?.role === 'student'

  return (
    <Routes>
      {instructor && (
        <>
          <Route path='my-course' element={<MyCourse />} />
          <Route path='my-course/:id' element={<MyCourseDetails />} />
        </>
      )}
      {student && (
        <>
          <Route path='enrolled' element={<EnrolledCourse />} />
          <Route path='enrolled/:id' element={<LearnCourse />} />
        </>
      )}
      {/* <Route path='*' element={<NotFound />} /> */}
    </Routes>
  )
}

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname]);
  return null;
}

function App() {
  const { user, isLoading } = useUser()
  const { token } = useAuth()

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path='/signin' element={token ? <Navigate to="/dashboard" /> : <StudentLogin />} />
        <Route path='/instructor/login' element={token ? <Navigate to="/dashboard" /> : <InstructorLogin />} />
        <Route path='/signup' element={token ? <Navigate to="/dashboard" /> : <SignUp />} />
        <Route path='forgot-password' element={<ForgotePass />} />
        <Route path='password-reset/:token' element={<PasswordReset />} />
        <Route path='/' element={<HomeLayout />} >
          <Route index element={<Home />} />
          <Route path='course' element={<Course />} />
          <Route path='course/:id' element={<CourseDetails />} />
          <Route path='resource' element={<Resourse />} />
          <Route path='blog' element={<Blog />} />
          <Route path='blog/:id' element={<BlogDetails />} />
          <Route path='contact' element={<Contact />} />
          <Route path='verify-email' element={<VerifyEmail />} />
        </Route>
        <Route path='/dashboard' element={token ? <Layout /> : <Navigate to="/signin" />}>
          <Route index element={<Dashboard />} />
          <Route path='*' element={<ConditionalRoute user={user} isLoading={isLoading} />} />
          <Route path='profile' element={<Profile />} />
          <Route path='settings' element={<Setting />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
