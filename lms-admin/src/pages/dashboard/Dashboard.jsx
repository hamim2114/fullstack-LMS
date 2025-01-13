import { Box, Grid, Paper, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { axiosReq } from '../../../utils/axiosReq'
import { format } from 'date-fns'
import useAuth from '../../hook/useAuth'

const Dashboard = () => {

  const { token } = useAuth()

  const { data: courses } = useQuery({
    queryKey: ['course'],
    queryFn: async () => {
      const res = await axiosReq.get('/course/all')
      return res?.data.filter(course => course.status === 'upcoming' || course.status === 'running' || course.status === 'completed')
    }
  })
  const { data: students } = useQuery({
    queryKey: ['student'],
    queryFn: async () => {
      const res = await axiosReq.get('/student/all')
      return res?.data
    },
  })
  const { data: instructors } = useQuery({
    queryKey: ['instructor'],
    queryFn: async () => {
      const res = await axiosReq.get('/instructor/all')
      return res?.data
    }
  })
  const { data: enrollments } = useQuery({
    queryKey: ['enrollment'],
    queryFn: async () => {
      const res = await axiosReq.get('course/enrolled/all', { headers: { Authorization: token } })
      return res.data
    }
  })

  return (
    <Box
      maxWidth='xl'
      sx={{
        backgroundColor: '#4C47E1',
        color: '#fff',
        borderRadius: 2,
        px: 3, py: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography sx={{ fontWeight: 300, opacity: 0.8 }}>
          {format(new Date(), 'dd MMMM yyyy')}
        </Typography>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mt: 1 }}>
          Welcome Back, <span style={{ color: '#FFC107' }}>Rakibul Alam!</span>
        </Typography>
        <Typography sx={{ mt: 1, fontWeight: 300, opacity: 0.8 }}>
          See what's happening with your courses and students.
        </Typography>

        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={6} sm={3}>
            <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#fff', color: '#000' }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                ENROLLED
              </Typography>
              <Typography variant="h5" component="p" sx={{ mt: 1 }}>
                {enrollments?.length}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#fff', color: '#000' }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                COURSES (A)
              </Typography>
              <Typography variant="h5" component="p" sx={{ mt: 1 }}>
                {courses?.length}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#fff', color: '#000' }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                STUDENTS
              </Typography>
              <Typography variant="h5" component="p" sx={{ mt: 1 }}>
                {students?.length}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#fff', color: '#000' }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                INSTRUCTORS
              </Typography>
              <Typography variant="h5" component="p" sx={{ mt: 1 }}>
                {instructors?.length}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', lg: 'block' },
          ml: 3,
          alignSelf: 'center',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            width: 200,
            // height: 200,
          }}
        >
          <img src="/welcome.png" alt="" />
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard