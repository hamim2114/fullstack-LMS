import { Box, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import { FadeAnimation, SlideAnimation } from '../../common/Animation'

const data = [
  {
    title: 'মার্কেটপ্লেস সাপোর্ট',
    text: 'মার্কেটপ্লেস সাপোর্ট টিম দ্বারা ৩ মাস / লাইফ টাইম মার্কেটপ্লেস সাপোর্ট',
    icon: '/icon1.svg'
  },
  {
    title: 'থিম, প্লাগিন সাপোর্ট',
    text: 'থাকছে সকল ধরনের থিম, প্লাগিন এবং রিসোর্সের লাইফ টাইম সাপোর্ট',
    icon: '/icon2.svg'
  },
  {
    title: 'কন্টেন্ট অ্যাক্সেস',
    text: 'লাইফ টাইম সফটওয়্যার, কন্টেন্ট, রেকর্ডেড ক্লাসের অ্যাক্সেস',
    icon: '/icon3.svg'
  },
  {
    title: 'নিজস্ব সফটওয়্যার',
    text: 'স্টুডেন্ট দের জন্য নিজস্ব LMS সফটওয়্যার, স্মার্ট ট্রাকিং লার্নিং সিস্টেম',
    icon: '/icon4.svg'
  },
  {
    title: 'কো-ইন্সট্রাক্টর সাপোর্ট',
    text: '১২pm-১২am ওয়ান বাই ওয়ান পার্সোনাল কো-ইন্সট্রাক্টর সাপোর্ট',
    icon: '/icon5.svg'
  },
  {
    title: 'ব্যাচের মাধ্যমে ক্লাস',
    text: 'মাত্র ৮০-১০০ স্টুডেন্ট নিয়ে ছোট ছোট ব্যাচে বিভক্ত করে ক্লাস নেয়া হয়',
    icon: '/icon6.svg'
  },
]

const OurSupport = () => {
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
        backgroundImage: `url(/our-support-bg.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        zIndex: -1
      }
    }}>
      <Container sx={{ py: { xs: 5, md: 10 } }} maxWidth='xl'>
        <SlideAnimation direction='up'>
          <Typography sx={{ fontSize: { xs: '30px', md: '40px' }, fontWeight: 600, mb: 2, textAlign: 'center' }}>Master the skills to drive your career
          </Typography>
        </SlideAnimation>
        <Stack alignItems='center'>
          <SlideAnimation direction='up' delay={100}>
            <Typography sx={{ maxWidth: '800px', textAlign: 'center' }}>Get certified, master modern tech skills, and level up your career — whether you’re starting out or a seasoned pro. 95% of eLearning learners report our hands-on content directly helped their careers.</Typography>
          </SlideAnimation>
        </Stack>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent='center' mt={6} gap={3} flexWrap='wrap'>
          {
            data.map((item, i) => (
              <FadeAnimation key={i} delay={200 * i} >
                <Stack sx={{
                  width: { xs: '100%', md: '380px' },
                  border: '1px solid lightgray',
                  borderRadius: '12px',
                  p: 2
                }} direction='row' gap={3} >
                  <img style={{ width: '60px' }} src={item.icon} alt="" />
                  <Box>
                    <Typography sx={{ fontSize: '20px', fontWeight: 600 }}>{item.title}</Typography>
                    <Typography>{item.text}</Typography>
                  </Box>
                </Stack>
              </FadeAnimation>
            ))
          }
        </Stack>
      </Container>
    </Box >
  )
}

export default OurSupport