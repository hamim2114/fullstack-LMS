import { AccessTime, ArrowBack, ArrowBackIos, ArrowForward, ArrowForwardIos, ArrowOutwardOutlined, Book, ImportContacts } from '@mui/icons-material'
import { Box, Button, Container, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import useIsMobile from '../../hook/useIsMobile';
import { FadeAnimation, SlideAnimation } from '../../common/Animation';
import { Link } from 'react-router-dom';
import CourseCard from '../CourseCard';
import { useQuery } from '@tanstack/react-query';
import { axiosReq } from '../../utils/axiosReq';
import Loader from '../../common/Loader';
import ErrorMsg from '../../common/ErrorMsg';

const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
  const { carouselState: { currentSlide } } = rest;
  return (

    <Stack direction='row' sx={{
      display: { xs: 'none', md: 'block' },
      ml: 2,
      position: 'absolute', top: 0, right: 0
    }}>
      <IconButton disable={currentSlide === 0 ? true : false} onClick={() => previous()} style={{ height: '40px', mr: 2, borderRadius: '50px', width: '90px' }}>
        <ArrowBackIos />
      </IconButton>
      <IconButton onClick={() => next()} style={{ height: '40px', borderRadius: '50px', width: '90px' }}>
        <ArrowForwardIos />
      </IconButton>
    </Stack>
  );
};

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3
  },
  desktop: {
    breakpoint: { max: 3000, min: 1278 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1074, min: 700 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    partialVisibilityGutter: 10,
    items: 1
  }
};

const FeaturedCourses = (props) => {
  const { data: courses, isLoading, isError } = useQuery({
    queryKey: ['course'],
    queryFn: async () => {
      const res = await axiosReq.get('/course/all')
      return res?.data.filter(course => course.status === 'running' || course.status === 'upcoming')
    }
  })
  if (!courses) return null
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
        backgroundImage: `url(/course-bg.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        zIndex: -1
      }
    }}>
      <Container sx={{ position: 'relative', px: .5, py: { xs: 5, md: 10 } }} maxWidth='xl'>
        <Typography sx={{ fontSize: { xs: '30px', md: '40px' }, fontWeight: 600, mb: 2, textAlign: 'center' }}>
          <SlideAnimation direction='up'>
            Featured Courses
          </SlideAnimation>
        </Typography>
        <Stack alignItems='center'>
          <SlideAnimation direction='up' delay={100}>
            <Typography sx={{ maxWidth: '800px', textAlign: 'center' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean accumsan bibendum gravida maecenas augue elementum et neque. Suspendisse imperdiet.</Typography>
          </SlideAnimation>
        </Stack>
        <Box sx={{ position: 'relative' }} px={1} pt={4}>
          <Carousel
            swipeable
            // draggable={true}
            showDots
            arrows={false}
            infinite
            responsive={responsive}
            // centerMode={!isMobile}
            renderButtonGroupOutside
            autoPlay
            customButtonGroup={<ButtonGroup />}
            // autoPlay={props.deviceType !== "mobile" ? true : false}
            autoPlaySpeed={2000}
            keyBoardControl
            renderDotsOutside
            customTransition="all 1s"
            transitionDuration={1000}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            deviceType={props.deviceType}
          >
            {
              courses?.length === 0 ? <Typography sx={{ textAlign: 'center', mt: 2 }}>No course found</Typography> :
                isLoading ? <Loader /> : isError ? <ErrorMsg /> :
                  courses?.map(item => (
                    <Box key={item} mx={1} pb={4} pt={1.5}>
                      <CourseCard data={item} />
                    </Box>
                  ))
            }
          </Carousel>
        </Box>
        <Stack direction='row' justifyContent='center' mt={4}>
          <SlideAnimation direction='up'>
            <Link to='/course'>
              <Button sx={{ borderRadius: '50px' }} endIcon={<ArrowOutwardOutlined />} variant='outlined'>All Course</Button>
            </Link>
          </SlideAnimation>
        </Stack>
      </Container>
    </Box>
  )
}

export default FeaturedCourses