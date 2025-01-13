import { Box, Button, Container, FormControl, IconButton, Input, InputAdornment, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import BreadCrumb from '../../common/BreadCrumb'
import { Search } from '@mui/icons-material'
import CourseCard from '../../components/CourseCard'
import { SlideAnimation } from '../../common/Animation'
import { axiosReq } from '../../utils/axiosReq'
import { useQuery } from '@tanstack/react-query'
import Loader from '../../common/Loader'
import ErrorMsg from '../../common/ErrorMsg'


const Course = () => {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  const { data: categories } = useQuery({
    queryKey: ['category'],
    queryFn: () => axiosReq.get('/category/all'),
  })

  const { data: courses, isLoading, isError } = useQuery({
    queryKey: ['course', category, search],
    queryFn: async () => {
      const res = await axiosReq.get('/course/all', {
        params: {
          category: category,
          search: search
        }
      })
      return res?.data.filter(course => course.status === 'running' || course.status === 'upcoming' || course.status === 'completed')
    }
  })
  return (
    <Box mb={10}>
      <Stack alignItems='center' justifyContent='center' sx={{
        height: '200px',
        backgroundImage: 'url(/section-top.jpg)',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}>
        <Typography sx={{ fontSize: { xs: '20px', md: '30px' }, color: 'primary.main', fontWeight: 600, mb: 2 }}>All Courses</Typography>
        <BreadCrumb page='Courses' />
      </Stack>

      <Stack alignItems='center' gap={3} my={4}>
        <SlideAnimation direction='up'>
          <Typography sx={{ fontSize: { xs: '20px', md: '30px' }, fontWeight: 600, textAlign: 'center' }}>আমাদের কোর্স সমূহ</Typography>
        </SlideAnimation>
        <SlideAnimation direction='up' delay={100}>
          <Typography sx={{ maxWidth: '600px', textAlign: 'center' }}>এসাইনমেন্ট ও প্রোজেক্ট নির্ভর ইন্ডাস্ট্রি ডিমান্ড প্রফেশনাল কোর্স, ফ্রিল্যান্সিং মার্কেটপ্লেস ক্লাস, বোনাস টিউটোরিয়াল, সাপোর্ট ক্লাস, টপিক বেজড মেটেরিয়ালস এবং ওয়ার্কশীট এর সমন্বয়ে সাজানো হয়েছে অফলাইন ব্যাচের প্রতিটি কোর্স।</Typography>
        </SlideAnimation>
      </Stack>

      <Container maxWidth='xl' sx={{ py: 4 }}>
        <Stack direction='row' gap={2} mb={2}>
          <TextField
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            placeholder="Search Course..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ minWidth: 200 }} >
            <FormControl fullWidth size='small'>
              <InputLabel>category</InputLabel>
              <Select
                value={category}
                label="category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value={''}>All</MenuItem>
                {
                  categories?.data?.map(c => (
                    <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Box>
        </Stack>


        <Stack direction={{ xs: 'column', md: 'row' }} flexWrap='wrap' flex={2} gap={3}>
          {
            courses?.length === 0 ? <Typography sx={{ textAlign: 'center', mt: 2 }}>No course found</Typography> :
              isLoading ? <Loader /> : isError ? <ErrorMsg /> :
                courses?.map((item, id) => (
                  <SlideAnimation key={id} direction='up' delay={100 * id}>
                    <Box mt={2}>
                      <CourseCard data={item} />
                    </Box>
                  </SlideAnimation>
                ))
          }
        </Stack>

      </Container>
    </Box>
  )
}

export default Course