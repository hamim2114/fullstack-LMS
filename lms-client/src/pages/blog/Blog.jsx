import { Box, Chip, Container, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import BreadCrumb from '../../common/BreadCrumb'
import { SlideAnimation } from '../../common/Animation'
import BlogCard from '../../components/BlogCard'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { axiosReq } from '../../utils/axiosReq'
import { Search } from '@mui/icons-material'
import Loader from '../../common/Loader'
import ErrorMsg from '../../common/ErrorMsg'

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [category, setCategory] = useState([])
  const [search, setSearch] = useState('')

  const { data: blogs, isLoading, isError } = useQuery({
    queryKey: ['blog', search, selectedCategory],
    queryFn: async () => {
      const res = await axiosReq.get('/blog/all', {
        params: {
          search: search,
          category: selectedCategory === 'All' ? '' : selectedCategory
        }
      })
      return res.data
    }
  })
  useQuery({
    queryKey: ['blog/category'],
    queryFn: async () => {
      const res = await axiosReq.get('/blog/all')
      setCategory(res.data.map(item => item.category))
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
        <Typography sx={{ fontSize: { xs: '20px', md: '30px' }, color: 'primary.main', fontWeight: 600, mb: 2 }}>Our Blogs</Typography>
        <BreadCrumb />
      </Stack>
      <Container maxWidth='xl'>
        <Stack mt={{ xs: 5, lg: 10 }} direction='row' flexWrap='wrap' gap={2} justifyContent='center'>
          <Typography sx={{
            bgcolor: selectedCategory === 'All' ? 'primary.main' : '',
            color: selectedCategory === 'All' ? '#fff' : '',
            border: '1px solid lightgray',
            px: 2, py: .5, borderRadius: '50px',
            cursor: 'pointer',
          }} onClick={() => setSelectedCategory('All')} variant='outlined' label='All'>
            All
          </Typography>
          {
            category?.map((item, id) => (
              <Typography sx={{
                bgcolor: selectedCategory === item ? 'primary.main' : '',
                color: selectedCategory === item ? '#fff' : '',
                border: '1px solid lightgray',
                px: 2, py: .5, borderRadius: '50px',
                cursor: 'pointer',
              }} onClick={() => setSelectedCategory(item)} variant='outlined' key={id} label={item}>
                {item}
              </Typography>
            ))
          }
        </Stack>
        {/* search */}
        <Box display='flex' justifyContent='center' mt={4}>
          <TextField
            sx={{ width: { xs: '100%', md: '50%' } }}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent='center' mt={6} gap={6} flexWrap='wrap'>
          {
            isLoading ? <Loader /> : isError ? <ErrorMsg /> :
              blogs?.length === 0 ? <Typography variant='h5' textAlign='center'>No Blogs Found</Typography> :
                blogs?.map((item, i) => (
                  <SlideAnimation key={i} direction='up' delay={100 * i}>
                    <BlogCard item={item} />
                  </SlideAnimation>
                ))
          }
        </Stack>
      </Container>
    </Box>
  )
}

export default Blog