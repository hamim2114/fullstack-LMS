import { ArrowOutwardOutlined, CalendarMonthOutlined } from '@mui/icons-material'
import { Box, Button, Container, ListItem, Stack, Typography } from '@mui/material'
import React from 'react'
import { SlideAnimation } from '../../common/Animation'
import BlogCard from '../BlogCard'
import { axiosReq } from '../../utils/axiosReq'
import Loader from '../../common/Loader'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

const Blog = () => {
  const { data: blogs, isLoading } = useQuery({
    queryKey: ['blog'],
    queryFn: async () => {
      const res = await axiosReq.get('/blog/all')
      return res.data
    }
  })

  if (!blogs) return null
  return (
    <Box sx={{
      position: 'relative',
      // height: { xs: '1044px', md: '800px' },
      '::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // backgroundImage: `url(/course-bg.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        zIndex: -1
      }
    }}>
      <Container sx={{ py: { xs: 5, md: 10 } }} maxWidth='xl'>
        <SlideAnimation direction='up'>
          <Typography sx={{ fontSize: { xs: '30px', md: '40px' }, fontWeight: 600, mb: 2, textAlign: 'center' }}>Latest Blogs
          </Typography>
        </SlideAnimation>
        <Stack alignItems='center'>
          <SlideAnimation direction='up' delay={100}>
            <Typography sx={{ maxWidth: '800px', textAlign: 'center' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean accumsan bibendum gravida maecenas augue elementum et neque. Suspendisse imperdiet.</Typography>
          </SlideAnimation>
        </Stack>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent='center' mt={6} gap={3} flexWrap='wrap'>
          {
            isLoading ? <Loader /> :
              blogs?.slice(0, 3).map((item, i) => (
                <SlideAnimation key={i} direction='up' delay={100 * i}>
                  <BlogCard item={item} />
                </SlideAnimation>
              ))
          }
        </Stack>
        <Stack direction='row' justifyContent='center' mt={4}>
          <SlideAnimation direction='up' delay={400}>
            <Link to='/blog'>
              <Button sx={{ borderRadius: '50px' }} endIcon={<ArrowOutwardOutlined />} variant='outlined'>All Blogs</Button>
            </Link>
          </SlideAnimation>
        </Stack>
      </Container>
    </Box >
  )
}

export default Blog