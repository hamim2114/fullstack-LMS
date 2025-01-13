/* eslint-disable react/prop-types */
import { Assignment, FiberManualRecord, Home, KeyboardArrowRight, KeyboardArrowRightOutlined, LibraryAddOutlined, PersonOutlineOutlined, SchoolOutlined, Settings, SpaceDashboardOutlined } from '@mui/icons-material';
import { Avatar, Badge, Box, Collapse, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import { Link, NavLink } from 'react-router-dom';
import useUser from '../../hook/useUser';
import { useState } from 'react';

const CDrawer = ({ drawerClose }) => {
  const [expandedNavlinkIndex, setExpandedNavlinkIndex] = useState(null);


  const handleExpandedNavlink = (index) => {
    setExpandedNavlinkIndex(expandedNavlinkIndex === index ? null : index);
  };

  const { user } = useUser()

  const isInstructor = user?.role === 'instructor'

  const links = [
    { name: 'Dashboard', icon: <SpaceDashboardOutlined fontSize='small' />, path: '', end: true },
    { name: 'My Profile', icon: <PersonOutlineOutlined fontSize='small' />, path: 'profile' },
    ...(user ? (
      isInstructor ? [
        { name: 'My Course', icon: <LibraryAddOutlined fontSize='small' />, path: 'my-course' },
      ] : [
        { name: 'Enrolled Course', icon: <SchoolOutlined fontSize='small' />, path: 'enrolled' },
      ]
    ) : []),
    { name: 'Setting', icon: <Settings fontSize='small' />, path: 'settings' },
  ]


  return (
    <Stack>
      <Stack alignItems='center'>
        <Box sx={{
          width: '100%',
          bgcolor: 'primary.main',
          height: '100px'
        }} />
        <Avatar src={user?.img ?? ''} sx={{
          width: '100px',
          height: '100px',
          marginTop: -6.5
        }} />
        <Typography sx={{ fontSize: '25px', textAlign: 'center', fontWeight: 600, mt: 1, color: 'text.main' }}>
          {user?.name}
        </Typography>
        <Typography sx={{ fontSize: '14px', mt: 1, color: 'text.main' }}>
          {user?.email}
        </Typography>
        <Typography sx={{ color: 'text.main', border: '1px solid lightgray', borderRadius: '10px', px: 1, mt: 1 }}>{user?.role}</Typography>
        <Link to='/'>
          <IconButton sx={{
            position: 'absolute',
            left: 10,
            top: 10
          }}>
            <Home sx={{ color: '#fff' }} />
          </IconButton>
        </Link>
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
                        onClick={drawerClose}
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
                    onClick={drawerClose}
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