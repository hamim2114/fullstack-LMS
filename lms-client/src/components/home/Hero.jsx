import { Box, Button, Container, Stack, Typography } from '@mui/material'
import Navbar from './Navbar'
import { FadeAnimation, SlideAnimation, ZoomAnimation } from '../../common/Animation'
import { ArrowForward, Star } from '@mui/icons-material'
import * as herojson from '../../json/herojson.json'
import Lottie from 'react-lottie'
import { Link } from 'react-router-dom'
import { axiosReq } from '../../utils/axiosReq'
import { useQuery } from '@tanstack/react-query'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: herojson,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const Hero = () => {
  const { data: info } = useQuery({
    queryKey: ['info'],
    queryFn: async () => {
      const res = await axiosReq.get('/info/get')
      return res.data
    }
  })

  return (
    <Box maxWidth='xxl' sx={{
      position: 'relative',
      height: { xs: '700px', md: '750px' },
      '::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(/bg2.jpg)`,
        // backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url(/bg.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        // backgroundAttachment: 'fixed',
        // filter: 'brightness(0.6)',
        zIndex: -1
      }
    }}>
      {/* <Navbar /> */}

      <Container maxWidth='xl'>
        <Stack sx={{ height: { xs: '500px', md: '750px' } }} direction={{ xs: 'column', md: 'row' }} alignItems='center' justifyContent='space-between' gap={5}>
          <Stack sx={{
            flex: 1.5,
            color: '#fff',
            width: { xs: '100%', md: '50%' },
            gap: { xs: 3, md: 3 },
            justifyContent: 'center'
          }}>
            <Box sx={{ fontSize: '20px', color: 'primary.main', fontWeight: 600, mt: { xs: 5, md: 0 }, }}>
              <SlideAnimation direction='up'>
                {info?.welcomeMessage}
              </SlideAnimation>
            </Box>
            <Box sx={{
              fontSize: { xs: '32px', md: '68px' },
              fontWeight: 800,
              lineHeight: { xs: '40px', md: '80px' },
              color: 'text.main'
            }}>
              <FadeAnimation damping={.1} delay={100} cascade={'cascade'}>
                Engaging &
              </FadeAnimation>
              <FadeAnimation damping={.1} delay={500} cascade={'cascade'}>
                Accessible Online
              </FadeAnimation>
              <FadeAnimation damping={.1} delay={1000} cascade={'cascade'}>
                Courses For All
              </FadeAnimation>
            </Box>
            <SlideAnimation direction='up' delay={500}>

              <Typography sx={{ color: 'primary.main', fontSize: { xs: '14px', md: '18px' }, mb: 1 }}>
                {info?.description}
              </Typography>
            </SlideAnimation>

            <Stack direction='row' gap={2}>
              <SlideAnimation direction='up' delay={600}>
                <Link to='/signin'>
                  <Button sx={{ height: { xs: '40px', md: '50px' }, borderRadius: '50px', whiteSpace: 'nowrap', width: { xs: '130px', md: '170px' } }} variant='contained' endIcon={<ArrowForward />} >Get Started</Button>
                </Link>
              </SlideAnimation>
              <SlideAnimation direction='up' delay={700}>
                <Link to='/course'>
                  <Button sx={{ height: { xs: '40px', md: '50px' }, borderRadius: '50px', whiteSpace: 'nowrap', width: { xs: '150px', md: '170px' } }} variant='outlined' endIcon={<ArrowForward />} >Explore Course</Button>
                </Link>
              </SlideAnimation>
            </Stack>

          </Stack>

          {/* <Box sx={{ flex:1,height:'100%',overflow:'hidden' }}>
            <HeroGif />
          </Box> */}


          <ZoomAnimation>
            <Box sx={{
              display: { md: 'none', lg: 'block' },
              ml: { xs: 0, lg: 10 },
              width: { xs: '100%', sm: '400px', md: '400px', lg: '500px' },
              height: { xs: '280px', sm: '300px', lg: '500px' }
            }}>
              <Lottie options={defaultOptions} />
              {/* <img style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '20px'
              }} src="/hero-bg1.png" alt="" /> */}
            </Box>
          </ZoomAnimation>

        </Stack>
      </Container>

    </Box>
  )
}

export default Hero