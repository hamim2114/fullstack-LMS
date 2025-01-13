import React, { useState } from 'react'
import { axiosReq } from '../../../utils/axiosReq'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import Loader from '../../../common/Loader'
import ErrorMsg from '../../../common/ErrorMsg'
import { Accordion, AccordionSummary, Typography, Stack, Box, Divider, Link, AccordionDetails, List, ListItem, ListItemText, Grid, CardContent, Button } from '@mui/material'
import { AccessTime, ExpandMore, PictureAsPdf, PlayArrow } from '@mui/icons-material'
import useAuth from '../../../hook/useAuth'
import toast from 'react-hot-toast'
import { format } from 'date-fns'

const LearnCourse = () => {
  const [expandedSection, setExpandedSection] = useState(null)
  const [expandedContent, setExpandedContent] = useState(null)
  const [selectedVideo, setSelectedVideo] = useState(null)

  const { token } = useAuth()

  const { id } = useParams()
  const { data: course, isLoading: courseLoading, isError: courseError } = useQuery({
    queryKey: ['course', id],
    queryFn: () => axiosReq.get(`/course/${id}`)
  })

  const { data: contentData, isLoading: contentLoading, error: contentError } = useQuery({
    queryKey: ['content', id],
    queryFn: async () => {
      const response = await axiosReq.get(`/course/content/${id}`, { headers: { Authorization: token } });
      return response.data.status === 'published' ? response.data : null;
    },
  });

  const handleSectionChange = (panel) => (event, isExpanded) => {
    setExpandedSection(isExpanded ? panel : null);
  };

  const handleContentChange = (panel) => (event, isExpanded) => {
    setExpandedContent(isExpanded ? panel : null);
  };

  if (courseLoading) return <Loader />
  if (courseError) return <Typography variant='h5' sx={{ textAlign: 'center', mt: 6, color: 'red' }}>{courseError?.response?.data}</Typography>

  return (
    <Box maxWidth='lg' sx={{
      bgcolor: '#fff',
      p: 3, borderRadius: '16px',
      minHeight: '100vh'
    }}>
      <Grid container spacing={2}>
        {/* <Grid item xs={12} sm={5}>
          <img
            src={course?.data?.cover}
            alt={course?.data?.title}
            style={{ width: '100%', borderRadius: '8px', height: '250px', objectFit: 'cover' }}
          />
        </Grid> */}

        <Grid item xs={12} sm={7}>
          <CardContent>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
              {course?.data?.title}
            </Typography>
            <Typography sx={{ border: '1px solid lightgray', width: 'fit-content', px: 1, borderRadius: '8px', mb: 2 }}>
              {course?.data?.category?.name}
            </Typography>

            {/* <Typography variant="body1" sx={{ mb: 2 }}>
              Start Date: {course?.data?.startDate && format(new Date(course?.data?.startDate), 'yyyy-MM-dd')} <br />
              End Date: {course?.data?.endDate && format(new Date(course?.data?.endDate), 'yyyy-MM-dd')}
            </Typography> */}

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
                  }[course?.data?.status],
                  color: 'white',
                  width: '120px',
                  textAlign: 'center',
                  borderRadius: '50px',
                  fontWeight: 'medium',
                  px: 1,
                  py: 0.5,
                }}
              >
                {course?.data?.status}
              </Typography>
            </ListItem>
          </CardContent>
        </Grid>
      </Grid>

      <Divider sx={{ mt: 3, mb: 3 }} />
      {!contentData && <Typography sx={{ textAlign: 'center', mt: 2 }}>No content found</Typography>}
      {contentError && <Typography sx={{ textAlign: 'center', mt: 2, color: 'red' }}>{contentError?.response?.data}</Typography>}
      {contentData && contentData?.sections.map((section) => (
        <Accordion
          key={section._id}
          sx={{ mb: 2, maxWidth: '900px', boxShadow: 0, border: '1px solid lightgray', borderRadius: 2 }}
          expanded={expandedSection === section._id}
          onChange={handleSectionChange(section._id)}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">
              <b>{section.order}. </b> {section.title}
            </Typography>
            {/* <Typography variant="body2" sx={{ ml: 2, fontWeight: 300, display: 'flex', gap: 1, alignItems: 'center' }}>
              (Est. Duration: {section.estimatedDuration} mins)
            </Typography> */}
          </AccordionSummary>
          <AccordionDetails>
            {section.content.map((item) => (
              <Accordion
                key={item._id}
                sx={{ mb: 2, boxShadow: 0, border: '1px solid lightgray', borderRadius: 2 }}
                expanded={expandedContent === item._id}
                onChange={handleContentChange(item._id)}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    <b>{item?.order}. </b> {item?.title}
                  </Typography>
                  <Typography variant="body2" sx={{ ml: 2, fontWeight: 300, display: 'flex', gap: 1, alignItems: 'center' }}>
                    <AccessTime fontSize='small' /> {item?.duration} mins
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ mb: 1, border: '1px solid lightgray', px: 1, borderRadius: 2, width: 'fit-content' }}>
                    Type: {item?.type}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {item?.description}
                  </Typography>

                  {item?.type === 'video' ? (
                    <Box>
                      <Button
                        size='small'
                        variant="contained"
                        startIcon={<PlayArrow />}
                        onClick={() => setSelectedVideo(item?.url)}
                      >
                        Play
                      </Button>
                      {selectedVideo === item.url && (
                        <Box sx={{ mt: 2 }}>
                          <iframe
                            width="100%"
                            height="412"
                            src={`https://www.youtube.com/embed/${item?.url.split('v=')[1].split('&')[0]}?modestbranding=1&rel=0&controls=1&disablekb=1`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={item.title}
                          ></iframe>
                        </Box>
                      )}
                    </Box>
                  ) : (
                    <Box>
                      <Button
                        size='small'
                        variant="contained"
                        startIcon={<PictureAsPdf />}
                        href={item.url}
                        target="_blank"
                      // rel="noopener noreferrer"
                      >
                        Download
                      </Button>
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}

export default LearnCourse