/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Chip, Container, Grid, ListItem, Paper, Stack, Typography } from '@mui/material'
import Breadcrumbs from '../../common/BreadCrumb'
import CButton from '../../common/CButton'
import { AccessTime, AddBoxSharp, ArrowRight, CalendarMonth, DoneAll, DoubleArrow, FormatListBulleted, ImportContacts, KeyboardArrowRight, KeyboardDoubleArrowRight, List, PlayCircleFilledOutlined, PlayCircleFilledWhite, PlayCircleOutline, PodcastsOutlined } from '@mui/icons-material'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths, differenceInSeconds, format, parse } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { axiosReq } from '../../utils/axiosReq'
import Loader from '../../common/Loader'
import ErrorMsg from '../../common/ErrorMsg'


const CourseDetails = () => {
  const [timeRemaining, setTimeRemaining] = useState({
    months: 0,
    days: 0,
    hours: 0,
  });

  const { id } = useParams()
  const { data: course, isLoading, isError } = useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      const res = await axiosReq.get(`/course/${id}`)
      return res.data
    }
  })

  const targetDate = course?.startDate
    ? (new Date(course.startDate) > new Date()
      ? format(new Date(course.startDate), 'yyyy.MM.dd')
      : format(new Date(), 'yyyy.MM.dd')) // Use current date if start date has passed
    : format(new Date(), 'yyyy.MM.dd'); // Use current date if no start date



  useEffect(() => {
    const calculateTimeRemaining = () => {
      const currentDate = new Date();
      const target = parse(targetDate, 'yyyy.MM.dd', new Date());

      if (target <= currentDate) {
        // Course has already started
        setTimeRemaining({ months: 0, days: 0, hours: 0 });
      } else {
        const months = differenceInMonths(target, currentDate);
        const days = differenceInDays(target, currentDate) % 30; // Approximation for days within a month
        const hours = differenceInHours(target, currentDate) % 24;

        setTimeRemaining({ months, days, hours });
      }
    };

    calculateTimeRemaining();

    const interval = setInterval(calculateTimeRemaining, 1000 * 60 * 60); // Update every hour
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [targetDate]);

  if (isLoading) return <Loader />
  if (isError) return <ErrorMsg />

  return (
    <Box mb={10}>

      <Stack alignItems='center' justifyContent='center' sx={{
        height: '200px',
        backgroundImage: 'url(/section-top.jpg)',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}>
        <Typography sx={{ fontSize: { xs: '20px', md: '30px' }, color: 'primary.main', fontWeight: 600, mb: 2 }}>Course Details</Typography>
        <Breadcrumbs page='Courses' />
      </Stack>

      <Container maxWidth='xl'>

        <Stack direction={{ xs: 'column', lg: 'row' }} gap={5} justifyContent='space-between' mt={{ xs: 10, lg: 10 }}>
          <Stack sx={{ flex: 1 }}>
            <Typography variant='h4' mb={1}>{course?.title}</Typography>
            <Typography variant="body" sx={{
              fontSize: '14px',
              px: 2, py: .5, mb: 1,
              width: 'fit-content',
              bgcolor: 'bg',
              // color: '#fff',
              borderRadius: '50px',
            }}>{course?.category?.name}</Typography>

            <Stack direction='row' flexWrap='wrap' gap={3} mt={2}>
              {
                course?.batchInfo?.map((item, id) => (
                  <Box key={id} sx={{
                    p: 2,
                    minWidth: { xs: '100%', sm: '200px' }, flex: 1,
                    borderRadius: '8px',
                    border: '1px solid green'
                  }} >
                    <Typography sx={{ fontSize: '16px', fontWeight: 600, color: 'green' }}>{item.title}</Typography>
                    <Typography variant='body' sx={{ fontSize: '16px' }}>{item.description}</Typography>
                  </Box>
                ))
              }
            </Stack>
            <Stack sx={{
              borderRadius: '16px',
              border: '1px solid lightgray',
              p: 2,
            }} gap={2} mt={3}>
              <Typography variant='h5'>Overview</Typography>
              <div dangerouslySetInnerHTML={{ __html: course?.description }} />
            </Stack>


          </Stack>

          <Box>
            <Box>
              <Box
                sx={{
                  width: { xs: '100%', sm: '470px' },
                  bgcolor: '#fff',
                  position: 'relative',
                  px: 5, py: 2, mb: 2,
                  textAlign: 'center',
                  borderRadius: '16px',
                  border: '1px solid lightgray',
                }}
              >
                <Typography variant="h4" sx={{ color: '#0f2027', fontWeight: 'bold' }}>
                  Course Start in
                  {/* Course Start in {format(parse(targetDate, 'yyyy.MM.dd', new Date()), 'MMMM do, yyyy')} */}
                </Typography>
                <Box
                  display="flex"
                  justifyContent="space-around"
                  alignItems="center"
                  sx={{ mt: 2 }}
                >
                  <Box textAlign="center">
                    <Typography variant="h3" sx={{ color: '#203a43' }}>
                      {timeRemaining.months}
                    </Typography>
                    <Typography variant="h6">Months</Typography>
                  </Box>
                  <Box textAlign="center">
                    <Typography variant="h3" sx={{ color: '#203a43' }}>
                      {timeRemaining.days}
                    </Typography>
                    <Typography variant="h6">Days</Typography>
                  </Box>
                  <Box textAlign="center">
                    <Typography variant="h3" sx={{ color: '#203a43' }}>
                      {timeRemaining.hours}
                    </Typography>
                    <Typography variant="h6">Hours</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Stack sx={{
              width: { xs: '100%', sm: '470px' },
              bgcolor: '#fff',
              position: 'relative',
              borderRadius: '16px',
              border: '1px solid lightgray',
              overflow: 'hidden'
            }}>
              <Box sx={{
                height: { xs: '300px', md: '250px' },
                // border: '1px solid lightgray',
                // m: 2,
                // borderRadius: '16px',
                overflow: 'hidden'
              }}>
                <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={course?.cover ?? ''} alt="" />
              </Box>
              <Stack sx={{ p: '0 20px 20px' }}>
                <Typography sx={{ fontWeight: 600, fontSize: '20px', color: 'green', my: 1 }}>Price: {course?.price}৳</Typography>
                <Typography sx={{ fontSize: '20px', lineHeight: '25px', fontWeight: '600', mb: 1.5 }}>{course?.title}</Typography>

                <ListItem>
                  <Typography mr={2}>Status: </Typography>
                  <Typography
                    sx={{
                      bgcolor: {
                        pending: 'orange',
                        upcoming: 'purple',
                        running: 'steelblue',
                        completed: 'green',
                        inactive: 'darkgray'
                      }[course?.status],
                      color: 'white',
                      width: '120px',
                      textAlign: 'center',
                      borderRadius: '50px',
                      fontWeight: 'medium',
                      px: 1,
                      py: 0.5,
                    }}
                  >
                    {course?.status}
                  </Typography>
                </ListItem>

                {/* <CButton rounded contained>Enrole Now</CButton> */}

                {
                  course?.startDate && <Typography variant='h6' mt={3}>Start Date: <span style={{ color: 'green' }}>{format(course?.startDate, ' dd MMM yyyy')}</span></Typography>
                }
                {
                  course?.endDate && <Typography variant='h6'>End Date: <span style={{ color: 'red' }}>{format(course?.endDate, ' dd MMM yyyy')}</span></Typography>
                }
                <Typography variant='h6' mt={3}>Includes</Typography>
                {
                  course?.includes?.map((item, id) => (
                    <ListItem key={id}>
                      <DoneAll sx={{ color: 'secondary.main', mr: 1 }} />
                      <Typography variant='body'>{item}</Typography>
                    </ListItem>
                  ))
                }
              </Stack>
            </Stack>
          </Box>
        </Stack >

      </Container >
    </Box >

  )
}

export default CourseDetails
