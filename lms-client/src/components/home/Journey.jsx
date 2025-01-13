import { CallMade, Check } from '@mui/icons-material'
import { Box, Button, Chip, Container, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import React from 'react'
import { FadeAnimation, SlideAnimation, ZoomAnimation } from '../../common/Animation'
import CButton from '../../common/CButton'
import { Link } from 'react-router-dom'

const data = [
  {
    title: 'Expert Teacher',
    body: 'Lorem ipsum dolor sit amet, consectetur notted adipisicing elit ut labore.'
  },
  {
    title: 'Quality Education',
    body: 'Lorem ipsum dolor sit amet, consectetur notted adipisicing elit ut labore.'
  },
  {
    title: 'Remote Learning',
    body: 'Lorem ipsum dolor sit amet, consectetur notted adipisicing elit ut labore.'
  },
  {
    title: 'Life Time Support',
    body: 'Lorem ipsum dolor sit amet, consectetur notted adipisicing elit ut labore.'
  },
]

const Journey = () => {

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
        backgroundImage: `url(/bg3.png)`,
        // backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url(/bg.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        // backgroundAttachment: 'fixed',
        // filter: 'brightness(0.6)',
        zIndex: -1
      }
    }}>
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: { xs: 5, md: 10 } }} maxWidth='xl'>
        <Box sx={{ fontSize: { xs: '30px', md: '40px' }, fontWeight: 600, mb: 2, textAlign: 'center' }}>
          <SlideAnimation direction='up'>
            Start your journey With us
          </SlideAnimation>
        </Box>
        <SlideAnimation direction='up' delay={100}>
          <Typography sx={{ maxWidth: '800px', textAlign: 'center' }}>We offer a brand new approach to the most basic learning paradigms. Choose from a wide range of learning options and gain new skills! Our school is know.</Typography>
        </SlideAnimation>
        <Stack direction='row' gap={4} mt={7} justifyContent={{ xs: 'center', md: 'space-between' }} flexWrap='wrap'>
          {
            data.map((item, i) => (
              <SlideAnimation key={i} direction='up' delay={100 * i}>
                <Stack sx={{
                  width: { xs: '100%', md: '230px' },
                  px: '30px',
                  py: { xs: '20px', md: '40px' },
                  bgcolor: '#fff',
                  boxShadow: 1,
                  borderRadius: '8px',
                  gap: 2
                }} alignItems='center'>
                  <Stack direction='row' gap={2} alignItems='center'>
                    <Stack alignItems='center' justifyContent='center' sx={{
                      bgcolor: i === 0 ? '#FFEFEE' : i === 1 ? '#ECEDFF' : i == 2 ? '#FDF3FA' : i == 3 ? '#EAFEFF' : '',
                      padding: '10px',
                      borderRadius: '50%'
                    }}>
                      <Typography sx={{ lineHeight: '35px', fontSize: '30px', color: i === 0 ? '#F26B65' : i === 1 ? '#5266E7' : i == 2 ? '#57216C' : i == 3 ? '#448BB7' : '', fontWeight: 600 }}>0{i + 1}</Typography>
                    </Stack>
                    <Typography sx={{ fontSize: '18px', fontWeight: 600, lineHeight: '22px' }}>{item.title}</Typography>
                  </Stack>
                  <Typography variant='body2'>{item.body}</Typography>
                </Stack>
              </SlideAnimation>
            ))
          }
        </Stack>

        <Stack direction={{ xs: 'column', md: 'row' }} alignItems='center' gap={10} mt={15}>
          <Box sx={{ width: { xs: '100%', md: '500px', } }}>
            <ZoomAnimation >
              <img style={{ width: '100%' }} src="/about1.png" alt="" />
            </ZoomAnimation>
          </Box>
          <Stack sx={{ flex: 2 }}>
            <SlideAnimation direction='up' >
              <Typography sx={{ fontSize: { xs: '30px', md: '40px' }, mb: 3, fontWeight: 600, }}>
                We Are Providing The Online Course In Global World
              </Typography>
            </SlideAnimation>
            <SlideAnimation direction='up' delay={100}>
              <Typography sx={{ mb: 3 }}>We offer a brand new approach to the most basic learning paradigms. Choose from a wide range of learning options and gain new skills! Our school is know.</Typography>
            </SlideAnimation>
            <SlideAnimation direction='up' delay={200}>
              <Typography sx={{ mb: 3 }}>We offer a brand new approach to the most basic learning paradigms. Choose from a wide range of learning options and gain new skills! Our school is know.</Typography>
            </SlideAnimation>
            <List sx={{ mb: 3 }}>
              <SlideAnimation direction='up' delay={300}>
                <ListItem>
                  <ListItemIcon><Check /></ListItemIcon>
                  <ListItemText>Get access to 12,000+ of our top courses</ListItemText>
                </ListItem>
              </SlideAnimation>
              <SlideAnimation direction='up' delay={400}>
                <ListItem>
                  <ListItemIcon><Check /></ListItemIcon>
                  <ListItemText> Popular topic to learn now in our online courses for student</ListItemText>
                </ListItem>
              </SlideAnimation>
              <SlideAnimation direction='up' delay={500}>
                <ListItem>
                  <ListItemIcon><Check /></ListItemIcon>
                  <ListItemText> Find the right instructor for you</ListItemText>
                </ListItem>
              </SlideAnimation>
            </List>
            <SlideAnimation direction='up' delay={600}>
              <Link to='/course'>
                <CButton style={{ width: 'fit-content' }} rounded large contained endIcon={<CallMade />} >View All Course</CButton>
              </Link>
            </SlideAnimation>
          </Stack>
        </Stack>

      </Container>
    </Box>
  )
}

export default Journey