import { Box, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import CourseCardSmall from '../../../components/CourseCardSmall'
import CButton from '../../../common/CButton'
import { Add } from '@mui/icons-material'
import { axiosReq } from '../../../utils/axiosReq'
import { useQuery } from '@tanstack/react-query'
import useAuth from '../../../hook/useAuth'
import ErrorMsg from '../../../common/ErrorMsg'
import Loader from '../../../common/Loader'
import CDialog from '../../../common/CDialog'
import AddInfo from './AddInfo'

const MyCourse = () => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const { token } = useAuth()
  const { data: courses, isLoading, isError } = useQuery({
    queryKey: ['course'],
    queryFn: () => axiosReq.get('/course/instructor/all', { headers: { Authorization: token } })
  })

  return (
    <Box sx={{
      bgcolor: '#fff',
      p: 3, borderRadius: '16px',
      minHeight: '100vh'
    }} maxWidth='xl'>
      <Typography variant='h5' mb={2}>My Courses</Typography>
      <Stack direction='row' justifyContent='space-between'>
        <Box />
        <CButton onClick={() => setAddDialogOpen(true)} contained startIcon={<Add fontSize='small' />} >Add New Course</CButton>
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} gap={4}>
        {
          isLoading ? <Loader /> : isError ? <ErrorMsg /> :
            courses?.data?.map((item, id) => (
              <Box key={id} mt={2}>
                <CourseCardSmall data={item} />
              </Box>
            ))
        }
      </Stack>

      {/* add course */}
      <CDialog maxWidth='md' open={addDialogOpen} title='Add Course Info' onClose={() => setAddDialogOpen(false)}>
        <AddInfo onClose={() => setAddDialogOpen(false)} />
      </CDialog>

    </Box>
  )
}

export default MyCourse