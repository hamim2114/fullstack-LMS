/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { AccessTime, ArrowRightAlt, CalendarMonth, DeleteOutline, Edit, ImportContacts, PlayCircleOutline, PodcastsOutlined } from "@mui/icons-material";
import { Box, Button, Chip, LinearProgress, linearProgressClasses, List, ListItem, Stack, styled, Typography } from "@mui/material"
import { useState } from "react";
import { Link } from "react-router-dom";
import CButton from "../common/CButton";
import useUser from "../hook/useUser";
import CDialog from "../common/CDialog";
import EditInfo from "../pages/dashboard/myCourse/EditInfo";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: 'primary.main',
    ...theme.applyStyles('dark', {
      backgroundColor: '#308fe8',
    }),
  },
}));


function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{ color: 'text.primary' }}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
      <Box sx={{ width: '100%', mr: 1 }}>
        <BorderLinearProgress variant="determinate" {...props} />
      </Box>
    </Box>
  );
}



const CourseCardSmall = ({ data }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [progress, setProgress] = useState(30);
  const { user } = useUser()

  const handleDialog = () => setEditDialogOpen(false);

  return (
    <Stack justifyContent='space-between' sx={{
      width: { xs: '100%', sm: '270px' },
      height: '100%',
      border: '1px solid lightgray',
      bgcolor: '#fff',
      borderRadius: '16px',
      position: 'relative',
      // overflow: 'hidden'
    }}>
      <Box>
        <Box sx={{
          height: { xs: '300px', md: '140px' },
          m: 1,
          borderRadius: '10px',
          border: '1px solid lightgray',
          bgcolor: 'bg'
        }}>
          <img style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }} src={data?.cover || '/no-image.png'} alt="" />
        </Box>
        <Stack sx={{ m: 1.5, }} justifyContent='space-between'>
          <Box>
            <Typography variant="body" sx={{
              fontSize: '14px',
              px: 1,
              mb: 1,
              width: 'fit-content',
              bgcolor: '#DCFCE7',
              borderRadius: '8px',
            }}>{data?.category?.name}
            </Typography>
            <Link to={`/course/${data?._id}`}>
              <Typography sx={{ fontSize: '16px', my: 1, lineHeight: '20px', fontWeight: '600' }}>{data?.title}</Typography>
            </Link>
          </Box>
          {user && (
            user?.role === 'student' ?
              <Box>
                {/* <Box sx={{ width: '100%', my: 2 }}>
                  <LinearProgressWithLabel value={progress} />
                </Box> */}
                <Link to={`/dashboard/enrolled/${data?._id}`}>
                  <Button variant="outlined" sx={{ width: '100%', borderRadius: '50px' }} size='small'>Continue Watching</Button>
                </Link>
              </Box> :
              <Box>
                <Stack direction='row' gap={2} mt={.5} justifyContent='space-between'>
                  <Chip size="small" sx={{ px: 1 }} label={data?.status} color={data?.status === 'active' ? 'success' : data?.status === 'pending' ? 'warning' : 'default'} />

                  {/* <ListItem sx={{ pr: 0 }}>
                  <AccessTime fontSize="small" />
                  <Typography sx={{ fontSize: '12px', whiteSpace: 'nowrap', ml: 1 }}>40hr 10min</Typography>
                </ListItem> */}
                </Stack>
              </Box>
          )
          }
        </Stack>
      </Box>
      {
        user?.role === 'instructor' && (
          <Stack sx={{ mx: 1.5, mb: 1.5 }} direction='row' justifyContent='space-between'>
            <Link className="link" to={`/dashboard/my-course/${data?._id}`}>
              <CButton endIcon={<ArrowRightAlt />} >Details</CButton>
            </Link>
            <CButton onClick={() => setEditDialogOpen(true)} outlined startIcon={<Edit fontSize="small" />} >Edit</CButton>
          </Stack>
        )
      }
      {/* edit course */}
      <CDialog maxWidth='md' open={editDialogOpen} title='Edit Course' onClose={handleDialog}>
        <EditInfo course={data} onClose={handleDialog} />
      </CDialog>
    </Stack>
  )
}

export default CourseCardSmall;