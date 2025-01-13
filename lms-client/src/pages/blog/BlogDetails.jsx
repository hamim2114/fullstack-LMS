import { Box, Container, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import BreadCrumb from '../../common/BreadCrumb'
import { CalendarMonthOutlined } from '@mui/icons-material'
import { axiosReq } from '../../utils/axiosReq'
import Loader from '../../common/Loader'
import { format } from 'date-fns'

const BlogDetails = () => {
  const { id } = useParams()
  const { data: blog, isLoading } = useQuery({
    queryKey: ['blog', id],
    queryFn: async () => {
      const res = await axiosReq.get(`/blog/details/${id}`)
      return res.data
    }
  })

  if (isLoading) return <Loader />

  return (
    <>
      <Stack mb={10} sx={{
        backgroundImage: 'url(/section-top.jpg)',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}>
        <Container maxWidth='lg'>
          <Stack direction={{ xs: 'column', lg: 'row' }} py={5} gap={5}>
            <Box sx={{ flex: 1 }}>
              <BreadCrumb style={{ mb: 5 }} />
              <Typography variant='body2' mb={1} sx={{ bgcolor: '#fff', px: 2, py: .5, borderRadius: '4px', width: 'fit-content' }}>{blog?.category}</Typography>
              <Typography variant='h4' sx={{ maxWidth: '500px' }}>{blog?.title}</Typography>
              <Stack direction='row' gap={.5} alignItems='center'>
                <CalendarMonthOutlined sx={{ color: 'gray' }} fontSize='small' />
                <Typography sx={{ fontSize: '14px', color: 'gray' }}>{format(blog?.updatedAt, 'dd MMM yyyy')}</Typography>
              </Stack>
            </Box>
            <Box sx={{
              width: { xs: '100%', lg: '500px' },
              maxWidth: '500px',
              height: '250px',
              mb: 1.5
            }}>
              <img style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} src={blog?.image ?? '/no-image.jpg'} alt="" />
            </Box>
          </Stack>
        </Container>
      </Stack>

      <Container maxWidth='md' sx={{ mb: 10 }}>
        <div dangerouslySetInnerHTML={{ __html: blog?.content }} />
      </Container>

    </>
  )
}

export default BlogDetails