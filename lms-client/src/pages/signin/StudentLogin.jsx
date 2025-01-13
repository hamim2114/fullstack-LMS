/* eslint-disable react/prop-types */
import { Box, Button, Container, IconButton, Input, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Google, KeyboardArrowLeft, Visibility, VisibilityOff } from '@mui/icons-material';
import toast from 'react-hot-toast';
import CButton from '../../common/CButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../hook/useAuth';
import { axiosReq } from '../../utils/axiosReq';

const StudentLogin = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [forgotePassSecOpen, setForgotePassSecOpen] = useState(false);
  const [payload, setPayload] = useState({ email: '', password: '' });
  const [payloadError, setPayloadError] = useState({ email: "", password: "" });
  const [emailNotReceivedSecOpen, setEmailNotReceivedSecOpen] = useState(false);
  const [disableResendBtn, setDisableResendBtn] = useState(false);

  const { setToken } = useAuth()

  const mutation = useMutation({
    mutationFn: (input) => axiosReq.post('/auth/login', input),
    onSuccess: (res) => {
      if (res.data.user.role === 'student') {
        if (res.data.user.isVerified) {
          setToken(res.data.jwt)
          toast.success(res.data.message)
        } else {
          setEmailNotReceivedSecOpen(true)
          toast.error('Please Verify Your Email')
        }
      } else {
        toast.error('Please Login With Student Account')
      }
    },
    onError: (err) => {
      toast.error(err.response.data)
    }
  })

  const resendEmailMutation = useMutation({
    mutationFn: (email) => axiosReq.post('/auth/resend-verify-email', email),
    onSuccess: (res) => {
      toast.success(res.data)
    },
    onError: (err) => {
      toast.error(err.response.data)
    }
  })


  const handleResendMail = () => {
    resendEmailMutation.mutate({ email: payload.email })
  }

  const handleInputChange = (e) => {
    setPayloadError({ ...payloadError, [e.target.name]: '' });
    setPayload({ ...payload, [e.target.name]: e.target.value })
  }


  const handleLogin = () => {
    if (!payload.email) {
      setPayloadError({ ...payloadError, email: 'Please enter email!' });
      return;
    }
    if (!payload.password) {
      setPayloadError({ ...payloadError, password: 'Please enter password!' })
      return;
    }
    mutation.mutate(payload)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <Container sx={{
      width: '100%',
      height: { xs: '100%', lg: '100vh' },
      display: 'flex',
      flexDirection: { xs: 'column', lg: 'row' },
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
      py: { xs: 5, lg: 0 },
      background: { xs: 'linear-gradient(90deg, #EDF3FF 0%, #FFE8D7 100%, #F0FFDF 100%)', lg: 'none' }
    }} maxWidth='xxl'>
      <Stack sx={{ width: '100%', display: { xs: 'flex', md: 'none' } }} direction='row' alignItems='center' justifyContent='space-between'>
        <Link to='/'>
          <CButton startIcon={<KeyboardArrowLeft />}>Home</CButton>
        </Link>
        <Box sx={{
          width: '150px',
          mb: 2
        }}>
          <img width='100%' src="/logo.svg" alt="" />
        </Box>
        <Box />
      </Stack>
      <Stack alignItems='center' justifyContent='center' sx={{
        width: { xs: '100%', md: '50%' },
        height: '100%',
        backgroundImage: 'url(/login-bg.png)',
      }}>
        <Box sx={{
          width: { xs: '100%', md: '400px' }
        }}>
          <img style={{ width: '100%', height: '100%' }} src="/login-img.png" alt="" />
        </Box>
        <Typography sx={{ fontSize: '30px', fontWeight: 500, mt: 6, textAlign: 'center' }}>Welcome to <br /> DreamLMS Course</Typography>
        <Typography sx={{ mt: 3, textAlign: 'center', maxWidth: '500px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam.</Typography>
      </Stack>
      <Stack alignItems='center' sx={{ width: { xs: '100%', md: '50%' } }}>
        <Stack sx={{
          width: { xs: '100%', md: '480px' },
          justifyContent: 'center',
        }}>
          <Stack sx={{ width: '100%', display: { xs: 'none', md: 'flex' } }} direction='row' alignItems='center' justifyContent={'space-between'} mb={4}>
            <Box sx={{
              width: { xs: '70%', md: '200px' },
              mb: 2
            }}>
              <Typography sx={{ fontSize: '35px', color: 'primary.main', fontWeight: 600 }}>Edu-Quest</Typography>
              {/* <img width='100%' src="logo.svg" alt="" /> */}
            </Box>
            <Link to='/'>
              <Button sx={{
                color: 'primary.main',
                mb: 2,
              }} startIcon={<KeyboardArrowLeft />}> Back to Home </Button>
            </Link>
          </Stack>
          <TextField
            onChange={handleInputChange}
            name='email'
            value={payload.email}
            error={payloadError.email !== ''}
            helperText={payloadError && payloadError.email}
            sx={{ mb: 2 }}
            fullWidth
            label="Email"
            variant="standard"
            onKeyDown={handleKeyPress}
          />
          <TextField
            sx={{ mb: 1 }}
            variant="standard"
            type={passwordVisibility ? "text" : "password"}
            name="password"
            label="Password"
            fullWidth
            value={payload.password}
            error={payloadError.password !== ""}
            helperText={payloadError && payloadError.password}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setPasswordVisibility(!passwordVisibility)}
                    edge="end"
                  >
                    {passwordVisibility ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Link className='link' to='/forgot-password'>
            <Typography sx={{ fontSize: '15px', mt: 1, mb: 2, color: 'primary.main ', cursor: 'pointer' }}>
              Forgote Password?
            </Typography>
          </Link>
          {emailNotReceivedSecOpen &&
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              padding: '16px 24px',
              bgcolor: 'light.main',
              borderRadius: '8px',
              fontSize: '18px',
              color: 'primary.main',
              textAlign: 'center'
            }}>
              <Typography sx={{ mb: 1, color: 'coral' }}>Email not verified!</Typography>
              <Typography variant='body2'>Didn't receive the verification email?</Typography>
              <Typography variant='body2' sx={{ color: 'gray' }}>Please check your spam folder or click the button below to resend the email.</Typography>
              <Button
                color="primary"
                onClick={() => {
                  handleResendMail();
                  setDisableResendBtn(true);
                  setTimeout(() => setDisableResendBtn(false), 30000);
                }}
                disabled={disableResendBtn}
              >
                Resend Email
              </Button>
            </Box>
          }
          <CButton style={{ mb: 2, width: '100%' }}
            onClick={handleLogin}
            loading={mutation.isPending}
            variant='contained'
          >
            Sign In
          </CButton>
          <Box sx={{ width: '100%' }}>
            {/* <GoogleLogin
                  onSuccess={res => googleLoginHandler(res)}
                  onError={() => {
                    toast.error('Innlogging mislyktes');
                  }}
                /> */}
          </Box>

          <CButton startIcon={<Google />} variant='outlined'>Login with Google</CButton>
          <Typography sx={{ mt: 2, textAlign: 'center' }}>New User? <Link to='/signup' style={{ color: 'primary.main' }}>Create an Account</Link></Typography>
          <Typography sx={{ mt: 2, textAlign: 'center' }}>Instructor <Link to='/instructor/login' style={{ color: 'primary.main' }}>login</Link></Typography>
        </Stack>
      </Stack>
    </Container>

  )
}

export default StudentLogin