import { Box, Button, Container, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import BreadCrumb from '../../common/BreadCrumb'
import { LocationOnOutlined, MailOutlined, SettingsPhoneOutlined } from '@mui/icons-material'
import CButton from '../../common/CButton'
import { axiosReq } from '../../utils/axiosReq'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const Contact = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false
  });


  const mutation = useMutation({
    mutationFn: (input) => axiosReq.post('/contact/create', input),
    onSuccess: (res) => {
      toast.success(res.data);
      setFormData({ name: '', email: '', message: '' });
    },
    onError: (error) => {
      toast.error(error.response.data);
    }
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {
      name: formData.name === '',
      email: formData.email === '' || !/\S+@\S+\.\S+/.test(formData.email),
      message: formData.message === ''
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      mutation.mutate(formData);
    }
  };
  return (
    <Box mb={10}>
      <Stack alignItems='center' justifyContent='center' sx={{
        height: '200px',
        backgroundImage: 'url(/section-top.jpg)',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}>
        <Typography sx={{
          fontSize: { xs: '20px', md: '30px' }, color: 'primary.main', fontWeight: 600, mb: 2
        }}>Contact Us</Typography>
        <BreadCrumb />
      </Stack>

      <Container sx={{ my: 10 }} maxWidth='lg'>
        <Typography sx={{
          fontSize: '18px',
          textAlign: 'center',
          color: 'secondary.main',
          letterSpacing: 5,
          mb: 3,
          fontWeight: '500',
          textTransform: 'uppercase'
        }}>Get in touch with us</Typography>
        <Typography variant='h4' textAlign='center'>We're Always Eager To Hear From You!</Typography>

        <Stack direction={{ xs: 'column', md: 'row' }} alignItems='center' gap={10} my={10}>
          <Stack flex={1} gap={2}>
            <Stack sx={{ border: '1px solid lightgray', p: 2, borderRadius: '8px' }} direction='row' alignItems='center' gap={2}>
              <LocationOnOutlined sx={{ fontSize: '3rem', color: '#00A556' }} />
              <Box>
                <Typography variant='h6'>Office Address</Typography>
                <Typography variant='body'>Office: Rajmoni Super market
                  (3rd Floor) House # 174 , Road #128 Mymensingh, Trishal- 2220</Typography>
              </Box>
            </Stack>
            <Stack sx={{ border: '1px solid lightgray', p: 2, borderRadius: '8px' }} direction='row' alignItems='center' gap={2}>
              <SettingsPhoneOutlined sx={{ fontSize: '3rem', color: '#3DAFC1' }} />
              <Box>
                <Typography variant='h6'>Phone number</Typography>
                <Typography variant='body'>01764-740380</Typography>
              </Box>
            </Stack>
            <Stack sx={{ border: '1px solid lightgray', p: 2, borderRadius: '8px' }} direction='row' alignItems='center' gap={2}>
              <MailOutlined sx={{ fontSize: '3rem', color: '#F8A858' }} />
              <Box>
                <Typography variant='h6'>Office Address</Typography>
                <Typography variant='body'>1201 park street, Fifth Avenue</Typography>
              </Box>
            </Stack>
          </Stack>
          <Box
            flex={1.3}
            component="form"
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  helperText={errors.name ? 'Name is required' : ''}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  helperText={errors.email ? 'Enter a valid email' : ''}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  error={errors.message}
                  helperText={errors.message ? 'Message is required' : ''}
                  multiline
                  rows={4}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button disabled={mutation.isPending} type="submit" variant="contained" color="primary" fullWidth>
                  {mutation.isPending ? 'Submitting...' : 'Submit'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Stack>
        <iframe style={{ height: '400px', width: '100%', border: 'none' }} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2154.4775097043084!2d90.40665616631503!3d24.747991356705068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37564ffd7b6d4c4f%3A0x9e3e620db4c7cbc5!2sShwapno%2C%20Charpara%2C%20Mymensingh!5e0!3m2!1sen!2sbd!4v1725513081924!5m2!1sen!2sbd"></iframe>



      </Container>
    </Box>
  )
}

export default Contact