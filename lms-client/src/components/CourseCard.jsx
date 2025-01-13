import { AccessTime, CalendarMonth, ImportContacts, KeyboardArrowRight, KeyboardDoubleArrowRight, PlayCircleOutline, PodcastsOutlined } from "@mui/icons-material";
import { Box, Button, Chip, List, ListItem, Stack, Typography } from "@mui/material"
import { Link } from "react-router-dom";
import CButton from "../common/CButton";

const CourseCard = ({ data }) => {

  return (
    <Stack sx={{
      width: { xs: '100%', sm: '470px' },
      bgcolor: '#fff',
      borderRadius: '16px',
      position: 'relative',
      border: '1px solid lightgray',
      // overflow: 'hidden'
    }}>
      <Box sx={{
        height: { xs: '300px', md: '250px' },
        border: '1px solid lightgray',
        m: 2,
        borderRadius: '16px',
        overflow: 'hidden'
      }}>
        <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={data?.cover || '/no-image.png'} alt="" />
      </Box>
      {/* <Typography sx={{
        position: 'absolute',
        top: 18, left: 18,
        fontSize: '14px',
        px: 1,
        py: .5,
        bgcolor: 'primary.main',
        color: '#fff',
        borderRadius: '4px',
      }}>অফ-লাইন</Typography> */}
      <Stack sx={{ p: '0 20px 20px' }}>
        <Typography variant="body" sx={{
          fontSize: '14px',
          px: 1,
          mb: 1,
          width: 'fit-content',
          bgcolor: '#DCFCE7',
          borderRadius: '8px',
        }}>{data?.category?.name}</Typography>
        <Typography sx={{ fontSize: '20px', lineHeight: '25px', fontWeight: '600', mb: 1.5 }}>{data?.title}</Typography>
        <Stack direction='row' gap={1} flexWrap='wrap' mb={2}>
          {
            data?.includes?.map((item, id) => (
              <Chip key={id} icon={<KeyboardDoubleArrowRight fontSize='small' />} label={item} variant="outlined" />
            ))
          }
        </Stack>
        {/* <Stack direction='row' gap={2} mt={1} justifyContent='space-between'>
          <ListItem sx={{ pl: 0 }}>
            <ImportContacts fontSize="small" />
            <Typography sx={{ fontSize: '12px', whiteSpace: 'nowrap', ml: 1 }}>12 Lesson</Typography>
          </ListItem>
          <ListItem sx={{ pr: 0 }}>
            <AccessTime fontSize="small" />
            <Typography sx={{ fontSize: '12px', whiteSpace: 'nowrap', ml: 1 }}>40hr 10min</Typography>
          </ListItem>
        </Stack> */}
        <Stack direction='row' gap={2} justifyContent='space-between' mt={1}>
          <Typography
            sx={{
              bgcolor: {
                pending: 'orange',
                upcoming: 'purple',
                running: 'steelblue',
                completed: 'green',
                inactive: 'darkgray'
              }[data?.status],
              color: 'white',
              width: '120px',
              textAlign: 'center',
              borderRadius: '50px',
              fontWeight: 'medium',
              px: 1,
              py: 0.5,
            }}
          >
            {data?.status}
          </Typography>
          <Link to={`/course/${data?._id}`}>
            <CButton endIcon={<KeyboardArrowRight />} fullWidth outlined rounded>Details</CButton>
          </Link>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default CourseCard;