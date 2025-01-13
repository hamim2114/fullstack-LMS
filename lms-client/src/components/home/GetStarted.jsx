import { CallMade } from '@mui/icons-material'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { SlideAnimation } from '../../common/Animation'
import CButton from '../../common/CButton'
import { Link } from 'react-router-dom'

const GetStarted = () => {
  return (
    <Container maxWidth='lg'>
      <Stack gap={3} sx={{
        p: { xs: 3, md: 6 },
        my: 5,
        color: '#fff',
        position: 'relative',
        '::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '15px',
          backgroundImage: `url(/h15.jpg)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          zIndex: -1
        }
      }} direction={{ xs: 'column', md: 'row' }} justifyContent='space-between' alignItems='center'>
        <Box sx={{ maxWidth: '400px', }}>
          <SlideAnimation direction='up'>
            <Typography mb={2} variant='h5'>Join more than 1 million
              learners worldwide</Typography>
          </SlideAnimation>
          <SlideAnimation direction='up' delay={100}>
            <Typography variant='body2'>Effective learning starts with assessment. Learning a new skill is hard work—Signal makes it easier.</Typography>
          </SlideAnimation>
        </Box>
        <SlideAnimation direction='up' delay={200}>
          <Link to='/signup'>
            <CButton rounded style={{ height: { xs: '40px', md: '50px' }, px: 4 }} color='secondary' contained endIcon={<CallMade />}>Get Started Now</CButton>
          </Link>
        </SlideAnimation>
      </Stack>
    </Container>
  )
}

export default GetStarted