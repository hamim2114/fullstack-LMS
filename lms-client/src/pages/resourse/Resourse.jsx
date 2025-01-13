import { Box, Button, Container, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import BreadCrumb from '../../common/BreadCrumb'
import useIsMobile from '../../hook/useIsMobile'
import { ContentCopyOutlined, DownloadOutlined, GetAppOutlined, InsertDriveFileOutlined, Person2Outlined, Search } from '@mui/icons-material'
import DataTable from '../../common/DataTable'
import { useQuery } from '@tanstack/react-query'
import { axiosReq } from '../../utils/axiosReq'

const Resourse = () => {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const { data: resourses, isLoading } = useQuery({
    queryKey: ['resourse', search, selectedCategory],
    queryFn: async () => {
      const res = await axiosReq.get('/resourse/all', {
        params: {
          search: search,
          category: selectedCategory === 'All' ? '' : selectedCategory
        }
      })
      return res.data
    }
  })

  const { data: category, } = useQuery({
    queryKey: ['resourse/category'],
    queryFn: async () => {
      const res = await axiosReq.get('/resourse/all')
      return res.data.map(item => item.category)
    }
  })

  const columns = [
    {
      field: 'Files', headerName: 'Files', width: 500,
      renderCell: (params) => (
        <Stack sx={{ height: '100%' }} direction='row' gap={1.5} alignItems='center'>
          <img style={{ width: '30px' }} src="/file2.svg" alt="" />
          <Stack >
            <Typography >{params.row.name}</Typography>
            {params.row.files && (
              <Typography sx={{ fontSize: '12px', display: 'inline-flex', gap: .5, alignItems: 'center' }}>
                <ContentCopyOutlined sx={{ fontSize: '12px' }} /> {params.row.files} files(s)
              </Typography>
            )}
          </Stack>
        </Stack>
      )
    },
    {
      field: 'Categories', headerName: 'Categories', width: 250,
      renderCell: (params) => (
        <Stack sx={{ height: '100%' }} direction='row' gap={1} alignItems='center'>
          <Typography>{params.row.category}</Typography>
        </Stack>
      )
    },
    // {
    //   field: 'updateOn', headerName: 'Update On', width: 200,
    //   renderCell: (params) => (
    //     <Stack sx={{ height: '100%' }} direction='row' gap={1} alignItems='center'>
    //       <Typography>{params.row.updateOn}</Typography>
    //     </Stack>
    //   )
    // },
    {
      field: 'version', headerName: 'Version', width: 200,
      renderCell: (params) => (
        <Stack sx={{ height: '100%' }} justifyContent='center'>
          <Typography>{params.row.version}</Typography>
        </Stack>
      )
    },

    {
      field: 'Download', headerName: '', width: 150,
      renderCell: (params) => <IconButton onClick={() => window.open(params.row.url, '_blank')} ><DownloadOutlined /></IconButton>
    },
  ];

  return (
    <Box>
      <Stack alignItems='center' justifyContent='center' sx={{
        height: '200px',
        backgroundImage: 'url(/section-top.jpg)',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}>
        <Typography sx={{ fontSize: { xs: '20px', md: '30px' }, color: 'primary.main', fontWeight: 600, mb: 2 }}>Downloadable Resources</Typography>
        <BreadCrumb page='Resourse' />
      </Stack>

      <Container maxWidth='xl' sx={{ py: 4 }}>
        <Typography variant='h5' sx={{ textAlign: 'center' }}>Total Resources: {resourses?.length}</Typography>

        <Box display='flex' alignItems='center' gap={2} my={2}>
          <TextField
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
          <FormControl sx={{ width: 150 }} size='small' >
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value='All' onClick={() => setSelectedCategory('All')}>All</MenuItem>
              {category?.map((item, index) => (
                <MenuItem key={index} value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box mt={4}>
          <DataTable
            columns={columns}
            rows={resourses}
            rowHeight={70}
            getRowId={row => row._id}
            loading={isLoading}
          />
        </Box>

      </Container>
    </Box>
  )
}

export default Resourse