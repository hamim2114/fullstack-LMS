import { ArrowOutward, Facebook, Instagram, LinkedIn, MailOutline, MapOutlined, PhoneEnabledOutlined, WhatsApp, YouTube } from '@mui/icons-material'
import { Box, Container, ListItem, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link } from 'react-router-dom'
import { axiosReq } from '../../utils/axiosReq'

const Footer = () => {
  const { data: info } = useQuery({
    queryKey: ['info'],
    queryFn: async () => {
      const res = await axiosReq.get('/info/get')
      return res.data
    }
  })
  console.log(info)
  return (
    <Box sx={{
      bgcolor: 'primary.main',
      color: '#fff',
      pb: 5
    }}>

      <Container sx={{ pt: { xs: 5, md: 10 } }} maxWidth='xl'>
        <Stack direction={{ xs: 'column', md: 'row' }}>

          <Box flex={1.5} sx={{ mb: { xs: 4, md: 0 } }}>
            <img style={{ height: '50px', objectFit: 'contain' }} src={info?.logo ?? ''} alt="Logo" />
            <Typography sx={{ maxWidth: '300px', my: 2 }}>{info?.description}</Typography>
            <Stack direction='row' flexWrap='wrap' mt={4} gap={3}>
              {info?.facebook && (
                <Facebook onClick={() => window.open(info?.facebook, '_blank')} sx={{ cursor: 'pointer' }} />
              )}
              {info?.youtube && (
                <YouTube onClick={() => window.open(info?.youtube, '_blank')} sx={{ cursor: 'pointer' }} />
              )}
              {info?.instagram && (
                <Instagram onClick={() => window.open(info?.instagram, '_blank')} sx={{ cursor: 'pointer' }} />
              )}
              {info?.linkedin && (
                <LinkedIn onClick={() => window.open(info?.linkedin, '_blank')} sx={{ cursor: 'pointer' }} />
              )}
            </Stack>
          </Box>

          <Stack flex={1} gap={2} sx={{ mb: { xs: 4, md: 0 } }}>
            <Typography variant='h5'>Quick Links</Typography>
            <Link to='/course' className='link'>All Course</Link>
            <Link to='/resource' className='link'>Resource</Link>
            <Link to='/blog' className='link'>Blogs</Link>
            <Link to='/contact' className='link'>Contact</Link>
          </Stack>

          {/* <Stack flex={1} gap={2} sx={{ mb: { xs: 4, md: 0 } }}>
            <Typography variant='h5'>Popular Course</Typography>
            <Link to='' className='link'>Web Development</Link>
            <Link to='' className='link'>Professional Graphic Design</Link>
            <Link to='' className='link'>Digital Marketing</Link>
            <Link to='' className='link'>Mern Stack Development</Link>
            <Link to='' className='link'>Content Writing</Link>
          </Stack> */}

          <Stack flex={1} gap={2}>
            <Typography variant='h5'>Contact Info</Typography>
            {info?.address && (
              <Stack sx={{ maxWidth: '300px' }} direction='row' gap={1}>
                <MapOutlined />
                <Typography ml={1}>{info?.address}</Typography>
              </Stack>
            )}
            {info?.phone && (
              <Stack direction='row' gap={1}>
                <PhoneEnabledOutlined />
                <Typography ml={1}>{info?.phone}</Typography>
                <a href={`tel: ${info?.phone}`}><ArrowOutward sx={{ color: '#fff' }} /></a>
              </Stack>
            )}
            {info?.phone && (
              <Stack direction='row' gap={1}>
                <WhatsApp />
                <Typography ml={1}>Contact Whatsapp</Typography>
                <a target='blank' href={`https://wa.me/${info?.phone}`}><ArrowOutward sx={{ color: '#fff' }} /></a>
              </Stack>
            )}
            {info?.email && (
              <Stack direction='row' gap={1}>
                <MailOutline />
                <Typography ml={1}>{info?.email}</Typography>
                <a href={`mailto: ${info?.email}`}><ArrowOutward sx={{ color: '#fff' }} /></a>
              </Stack>
            )}
          </Stack>

        </Stack>
        <Typography sx={{ textAlign: 'center', mt: 5 }}>
          © {new Date().getFullYear()} All Rights Reserved.
        </Typography>

      </Container>
    </Box>
  )
}

export default Footer