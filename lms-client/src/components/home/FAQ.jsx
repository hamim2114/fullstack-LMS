import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import useIsMobile from '../../hook/useIsMobile'
import { CallMade, ExpandMore } from '@mui/icons-material'
import { SlideAnimation } from '../../common/Animation'
import { useQuery } from '@tanstack/react-query'
import { axiosReq } from '../../utils/axiosReq'
import Loader from '../../common/Loader'
import ErrorMsg from '../../common/ErrorMsg'

const FAQ = () => {
  const { data: faq, isLoading } = useQuery({
    queryKey: ['faq'],
    queryFn: async () => {
      const res = await axiosReq.get('/faq/all')
      return res.data
    }
  })
  if (isLoading) return <Loader />
  if (!faq) return null
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
        backgroundImage: `url(/shape-5.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        zIndex: -1
      }
    }}>
      <Container sx={{ py: { xs: 5, md: 10 } }} maxWidth='lg'>
        <SlideAnimation direction='up'>
          <Typography sx={{ fontSize: { xs: '30px', md: '40px' }, fontWeight: 600, mb: 2, textAlign: 'center' }}>Some Most Asked Question
          </Typography>
        </SlideAnimation>
        <Grid container spacing={4} mt={2}>
          {
            faq.map((item, id) => (
              <Grid item key={id} xs={12} md={6} >
                <SlideAnimation delay={100 * id} direction='up'>
                  <Accordion sx={{ px: 2, border: '1px solid lightgray', boxShadow: 'none' }} >
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      sx={{ fontWeight: 'bold', color: 'primary.main', p: 0 }}
                    >
                      {item.question}
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>{item.answer}</AccordionDetails>
                  </Accordion>
                </SlideAnimation>
              </Grid>
            ))
          }
        </Grid>

      </Container>
    </Box>
  )
}

export default FAQ