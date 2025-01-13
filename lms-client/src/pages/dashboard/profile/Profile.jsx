import { Avatar, Box, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import useUser from '../../../hook/useUser'
import { format } from 'date-fns'

const Profile = () => {
  const { user } = useUser()

  return (
    <Box sx={{
      bgcolor: '#fff',
      p: 3, borderRadius: '16px',
      minHeight: '80vh'
    }} maxWidth='lg'>
      <Typography variant='h5' mb={2}>My Profile</Typography>
      <Divider />

      <Box>
        <Avatar src={user?.img ?? ''} sx={{ width: 100, height: 100, my: 2 }} />
        <Stack direction={{ xs: 'column', md: 'row', mb: 2 }}>
          <Box mt={4}>
            <Typography sx={{ fontWeight: 600, mb: .5, minWidth: '600px' }}>First Name</Typography>
            <Typography variant='body'>{user?.name ?? '---'}</Typography>
          </Box>
          <Box mt={4}>
            <Typography sx={{ fontWeight: 600, mb: .5, minWidth: '200px' }}>User Name</Typography>
            <Typography variant='body'>@{user?.username}</Typography>
          </Box>
        </Stack>
        <Stack direction={{ xs: 'column', md: 'row', mb: 2 }}>
          <Box mt={4}>
            <Typography sx={{ fontWeight: 600, mb: .5, minWidth: '600px' }}>Registerion Date</Typography>
            <Typography variant='body'>{user?.createdAt && format(user?.createdAt, 'MMM dd, yyyy')}</Typography>
          </Box>
          <Box mt={4}>
            <Typography sx={{ fontWeight: 600, mb: .5, minWidth: '600px' }}>Email</Typography>
            <Typography variant='body'>{user?.email}</Typography>
          </Box>

        </Stack>
        <Stack direction={{ xs: 'column', md: 'row', mb: 2 }}>
          <Box mt={4}>
            <Typography sx={{ fontWeight: 600, mb: .5, minWidth: '200px' }}>Phone Number</Typography>
            <Typography variant='body'>{user?.phone ?? '---'}</Typography>
          </Box>
        </Stack>
        <Typography sx={{ fontWeight: 600, mb: .5, mt: 4 }}>Address</Typography>
        <Typography variant='body' sx={{ width: '100px' }}>{user?.address ?? '---'}</Typography>
      </Box>

    </Box>
  )
}

export default Profile