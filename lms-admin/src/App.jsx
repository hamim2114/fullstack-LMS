import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import NotFound from './pages/notFound/Index'
import { useEffect } from 'react'
import Layout from './pages/Layout'
import Login from './pages/login/Login'
import Dashboard from './pages/dashboard/Dashboard'
import Course from './pages/courses/course/Course'
import Categories from './pages/courses/catagories/Categories'
import Notifications from './pages/notifications/Notifications'
import Instructors from './pages/instructors/Instructors'
import InstructorDetails from './pages/instructors/InstructorDetails'
import Students from './pages/students/Students'
import Enrolment from './pages/enrolment/Enrolment'
import Resourse from './pages/resourse/Resourse'
import Setting from './pages/settings/Setting'
import Blogs from './pages/blogs/Blogs'
import Faq from './pages/faq/Faq'
import { Box } from '@mui/material'
import useAuth from './hook/useAuth'
import ForgotePass from './pages/forgotePass/ForgotePass'
import PasswordReset from './pages/password-reset/PasswordReset'
import CourseDetails from './pages/courses/course/CourseDetails'
import StudentDetails from './pages/students/StudentDetails'
import BlogDetails from './pages/blogs/BlogDetails'

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname]);
  return null;
}


function App() {

  const { token } = useAuth()

  return (
    <Box
      sx={{ overflowX: 'hidden' }}
    >
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Navigate to={token ? '/dashboard' : '/login'} />} />
        <Route path='/login' element={token ? <Navigate to='/dashboard' /> : <Login />} />
        <Route path='forgot-password' element={<ForgotePass />} />
        <Route path='password-reset/:token' element={<PasswordReset />} />
        <Route path='/dashboard' element={token ? <Layout /> : <Login />}>
          <Route path='' element={<Dashboard />} />
          <Route path='notification' element={<Notifications />} />
          <Route path='course' element={<Course />} />
          <Route path='course/:id' element={<CourseDetails />} />
          <Route path='course/category' element={<Categories />} />
          <Route path='instructor' element={<Instructors />} />
          <Route path='instructor/:id' element={<InstructorDetails />} />
          <Route path='student' element={<Students />} />
          <Route path='student/:id' element={<StudentDetails />} />
          <Route path='enrolment' element={<Enrolment />} />
          <Route path='resourse' element={<Resourse />} />
          <Route path='blog' element={<Blogs />} />
          <Route path='blog/:id' element={<BlogDetails />} />
          <Route path='faq' element={<Faq />} />
          <Route path='setting' element={<Setting />} />
          <Route path='*' element={<NotFound />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Box>
  )
}

export default App
