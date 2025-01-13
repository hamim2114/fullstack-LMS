import { Box, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import CourseCardSmall from '../../../components/CourseCardSmall'
import { axiosReq } from '../../../utils/axiosReq'
import useAuth from '../../../hook/useAuth'
import { useQuery } from '@tanstack/react-query'
import ErrorMsg from '../../../common/ErrorMsg'
import Loader from '../../../common/Loader'

const EnrolledCourse = () => {
  const { token } = useAuth()

  const { data: enrollments, isLoading, isError } = useQuery({
    queryKey: ['myEnrollment'],
    queryFn: async () => {
      const response = await axiosReq.get('course/enrolled/my', { headers: { Authorization: token } });
      return response.data.filter(course => course.status === 'running' || course.status === 'upcoming' || course.status === 'completed')
    }
  })

  return (
    <Box sx={{
      bgcolor: '#fff',
      p: 3, borderRadius: '16px',
      minHeight: '100vh'
    }} maxWidth='xl'>
      <Typography variant='h5' mb={2}>Enrolled Course</Typography>
      <Stack direction={{ xs: 'column', md: 'row' }} gap={4} flexWrap='wrap'>
        {
          isLoading ? <Loader /> : isError ? <ErrorMsg /> :
            enrollments?.length === 0 ? <Typography sx={{ textAlign: 'center', mt: 2 }}>No course found</Typography> :
              enrollments?.map((item, id) => (
                <Box key={id} mt={2}>
                  <CourseCardSmall data={item} />
                </Box>
              ))
        }
      </Stack>
    </Box>
  )
}

export default EnrolledCourse