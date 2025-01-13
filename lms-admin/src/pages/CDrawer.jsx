/* eslint-disable react/prop-types */
import { CommentBankOutlined, ExpandCircleDownOutlined, ExpandLess, ExpandMore, FiberManualRecord, GridViewOutlined, Group, GroupOutlined, ImportContactsOutlined, InsertDriveFileOutlined, KeyboardArrowRight, KeyboardArrowRightOutlined, ListAlt, NotificationsNoneOutlined, Person3, Person3Outlined, PlaylistAdd, Settings, SettingsOutlined, SpaceDashboard, SpaceDashboardOutlined } from '@mui/icons-material';
import { Badge, Box, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';


const CDrawer = ({ handleDrawerClose }) => {
  const [expandedNavlinkIndex, setExpandedNavlinkIndex] = useState(null);


  const handleExpandedNavlink = (index) => {
    setExpandedNavlinkIndex(expandedNavlinkIndex === index ? null : index);
  };


  const links = [
    { name: 'Dashboard', icon: <GridViewOutlined />, path: '', end: true },
    // { name: 'Notifications', icon: <NotificationsNoneOutlined />, path: 'notification', notification: 21 },
    {
      name: 'Courses', icon: <ListAlt />, more: [
        { name: 'Course List', path: 'course', end: true },
        { name: 'Categories', path: 'course/category' },
      ]
    },
    { name: 'Instructors', icon: <Person3Outlined />, path: 'instructor', notification: 0 },
    { name: 'Students', icon: <GroupOutlined />, path: 'student', notification: 0 },
    { name: 'Enrolment', icon: <PlaylistAdd />, path: 'enrolment' },
    { name: 'Resourses', icon: <InsertDriveFileOutlined />, path: 'resourse' },
    { name: 'Blogs ', icon: <ImportContactsOutlined />, path: '/dashboard/blog' },
    { name: 'Faq ', icon: <CommentBankOutlined />, path: '/dashboard/faq' },
    { name: 'Setting ', icon: <SettingsOutlined />, path: '/dashboard/setting' },
    //conditional route
    // ...(user ? (
    //   !isStaff ? [
    //     { name: 'Manage Staffs', icon: <PeopleAltOutlined />, path: '/dashboard/manage-staff' },
    //     { name: 'Meeting Schedule', icon: <Diversity3 />, path: '/dashboard/meetings' },
    //   ] : []
    // ) : []),
  ];


  return (
    <Stack>
      <Stack alignItems='center'>
        <Box sx={{
          width: '100%',
          bgcolor: 'primary.main',
          height: '64px'
        }}>
          <Typography sx={{ fontSize: '25px', fontWeight: 600, color: '#fff', textAlign: 'center', mt: 1.5 }}>
            Edu Quest
          </Typography>
        </Box>
      </Stack>

      <List sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 4 }}>
        {links.map((item, index) => (
          <ListItem disablePadding key={index} sx={{ display: 'block' }}>
            {item.more ? (
              <>
                <ListItemButton
                  sx={{ px: 1, mx: 2, borderRadius: '5px', mb: 0.5, color: 'gray' }}
                  onClick={() => handleExpandedNavlink(index)}
                >
                  <ListItemIcon sx={{ minWidth: 0, mr: 1.5, color: 'inherit' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                  <KeyboardArrowRightOutlined sx={{
                    transition: '.5s',
                    transform: expandedNavlinkIndex === index ? 'rotate(90deg)' : 'rotate(0deg)'
                  }} />
                </ListItemButton>
                <Collapse in={expandedNavlinkIndex === index} timeout="auto" unmountOnExit>
                  <List component="div">
                    {item.more.map((subItem, id) => (
                      <NavLink
                        end={subItem.end}
                        onClick={handleDrawerClose}
                        className="link"
                        key={id}
                        to={subItem.path}
                      >
                        {({ isActive }) => (
                          <ListItemButton
                            sx={{
                              ml: 5,
                              mr: 2,
                              mb: 0.5,
                              borderRadius: '5px',
                              bgcolor: isActive ? 'primary.main' : '',
                              color: isActive ? '#fff' : 'gray',
                              ':hover': {
                                bgcolor: isActive ? 'primary.main' : '#F5F5F5',
                              },
                            }}
                          >
                            <FiberManualRecord sx={{ fontSize: '8px', mr: 2 }} />
                            <Typography sx={{ fontSize: '14px', whiteSpace: 'nowrap' }}>
                              {subItem.name}
                            </Typography>
                          </ListItemButton>
                        )}
                      </NavLink>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <NavLink end={item.end} className="link" to={item.path}>
                {({ isActive }) => (
                  <Stack
                    direction='row'
                    alignItems='center'
                    onClick={handleDrawerClose}
                    sx={{
                      py: 1,
                      px: 1,
                      mx: 2,
                      borderRadius: '5px',
                      bgcolor: isActive ? 'primary.main' : '',
                      color: isActive ? '#fff' : 'gray',
                      ':hover': {
                        bgcolor: isActive ? 'primary.main' : '#F5F5F5',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 0, mr: 1.5, color: 'inherit' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                    <Badge sx={{ mr: 2 }} badgeContent={item.notification} color="warning" />
                  </Stack>
                )}
              </NavLink>
            )}
          </ListItem>
        ))}
      </List>

    </Stack>
  )
}

export default CDrawer