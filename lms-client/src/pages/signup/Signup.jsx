/* eslint-disable react/prop-types */
import { Box, Button, Container, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Google, KeyboardArrowLeft, Visibility, VisibilityOff } from '@mui/icons-material';
import CButton from '../../common/CButton';
import CTextField from '../../common/CTextField';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { axiosReq } from '../../utils/axiosReq';

const SignUp = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [regSuccessMsg, setRegSuccessMsg] = useState('')
  const [payload, setPayload] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    rePassword: '',
    role: 'student'
  });
  const [payloadError, setPayloadError] = useState({
    username: '',
    email: '',
    password: '',
    rePassword: '',
  });

  const regMutation = useMutation({
    mutationFn: (input) => axiosReq.post('/auth/register', input),
    onSuccess: (res) => {
      console.log(res);
      setPayload({
        name: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        rePassword: '',
      });
      if (res.data.success) {
        setRegSuccessMsg(res.data.message)
      }
      toast.success(res.data.message);
    },
    onError: (err) => {
      const errorMsg = err.response && err.response.data ? err.response.data : 'Registration failed';
      toast.error(errorMsg);
    },
  });

  const handleInputChange = (e) => {
    setPayloadError({ ...payloadError, [e.target.name]: '' });
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const handleSignUp = () => {
    const { username, email, password, rePassword } = payload;
    if (!username) {
      setPayloadError({ ...payloadError, username: 'Please enter username!' });
      return;
    }
    if (!email) {
      setPayloadError({ ...payloadError, email: 'Please enter email!' });
      return;
    }
    if (!password) {
      setPayloadError({ ...payloadError, password: 'Please enter password!' });
      return;
    }
    if (!rePassword) {
      setPayloadError({ ...payloadError, rePassword: 'Please re-enter password!' });
      return;
    }
    if (password !== rePassword) {
      setPayloadError({ ...payloadError, rePassword: 'Passwords do not match!' });
      return;
    }
    regMutation.mutate(payload);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignUp();
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: { xs: '100%', lg: '100vh' },
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        px: { xs: 2, lg: 0 },
        py: { xs: 5, lg: 0 },
        background: { xs: 'linear-gradient(90deg, #EDF3FF 0%, #FFE8D7 100%, #F0FFDF 100%)', lg: 'none' },
        // backgroundImage: { xs: 'linear-gradient(90deg, #EDF3FF 0%, #FFE8D7 100%, #F0FFDF 100%)', lg: 'none' },
      }}
      maxWidth="xxl"
    >
      <Stack sx={{ width: '100%', display: { xs: 'flex', md: 'none' } }} direction="row" alignItems="center" justifyContent="space-between">
        <Link to="/">
          <CButton startIcon={<KeyboardArrowLeft />}>Home</CButton>
        </Link>
        <Box sx={{ width: '150px', mb: 2 }}>
          <img width="100%" src="/logo.svg" alt="Logo" />
        </Box>
        <Box />
      </Stack>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          width: { xs: '100%', md: '50%' },
          minHeight: '100vh',
          backgroundImage: { xs: 'none', lg: 'url(/login-bg.png)' },
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box sx={{ width: { xs: '100%', md: '400px' } }}>
          <img style={{ width: '100%', height: '100%' }} src="/login-img.png" alt="Login" />
        </Box>
        <Typography sx={{ fontSize: '30px', fontWeight: 500, mt: 6, textAlign: 'center' }}>
          Welcome to <br /> DreamLMS Course
        </Typography>
        <Typography sx={{ mt: 3, textAlign: 'center', maxWidth: '500px' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
        </Typography>
      </Stack>
      <Stack alignItems="center" sx={{ width: { xs: '100%', md: '50%' } }}>
        <Stack
          sx={{
            width: { xs: '100%', md: '480px' },
            justifyContent: 'center',
          }}
        >
          <Stack sx={{ width: '100%', display: { xs: 'none', md: 'flex' } }} direction="row" alignItems="center" justifyContent="space-between" mb={4}>
            <Box sx={{ width: { xs: '70%', md: '200px' }, mb: 2 }}>
              <Typography sx={{ fontSize: '35px', color: 'primary.main', fontWeight: 600 }}>Edu-Quest</Typography>
            </Box>
            <Link to="/">
              <Button sx={{ color: 'primary.main', mb: 2 }} startIcon={<KeyboardArrowLeft />}>
                Back to Home
              </Button>
            </Link>
          </Stack>
          {
            regSuccessMsg && (
              <Typography sx={{ bgcolor: 'lightgreen', p: 2, borderRadius: '5px' }}>Register successfully. Please check your email for verification.</Typography>
            )
          }
          <Typography sx={{ fontWeight: 600, fontSize: '25px', mb: 3 }}>Student Sign Up</Typography>
          <Stack gap={2}>
            <Stack direction={{ xs: 'column', lg: 'row' }} gap={2}>
              <CTextField
                onChange={handleInputChange}
                name="name"
                value={payload.name}
                fullWidth
                topLabel="Full Name"
                size="small"
              />
              <CTextField
                onChange={handleInputChange}
                name="username"
                value={payload.username}
                error={payloadError.username !== ''}
                helperText={payloadError.username}
                fullWidth
                topLabel="User Name *"
                size="small"
              />
            </Stack>
            <Stack direction={{ xs: 'column', lg: 'row' }} gap={2}>
              <CTextField
                onChange={handleInputChange}
                name="email"
                value={payload.email}
                error={payloadError.email !== ''}
                helperText={payloadError.email}
                fullWidth
                topLabel="Email *"
                size="small"
              />
              <CTextField
                onChange={handleInputChange}
                name="phone"
                value={payload.phone}
                fullWidth
                topLabel="Phone"
                size="small"
              />
            </Stack>
            <Stack direction={{ xs: 'column', lg: 'row' }} gap={2}>

              <CTextField
                size="small"
                type={passwordVisibility ? 'text' : 'password'}
                name="password"
                topLabel="Password *"
                fullWidth
                value={payload.password}
                error={payloadError.password !== ''}
                helperText={payloadError.password}
                onChange={handleInputChange}
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
              <CTextField
                size="small"
                type={passwordVisibility ? 'text' : 'password'}
                name="rePassword"
                topLabel="Repeat Password *"
                fullWidth
                value={payload.rePassword}
                error={payloadError.rePassword !== ''}
                helperText={payloadError.rePassword}
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
            </Stack>
          </Stack>

          <Typography
            onClick={() => setPayloadError({ ...payloadError, forgotePassSecOpen: true })}
            sx={{ fontSize: '15px', my: 3, color: 'primary.main', cursor: 'pointer' }}
          >
            Forgot Password?
          </Typography>
          <CButton
            onClick={handleSignUp}
            variant="contained"
            loading={regMutation.isPending}
          >
            Sign Up
          </CButton>
          <CButton startIcon={<Google />} variant="outlined" sx={{ mt: 2 }}>
            Sign up with Google
          </CButton>
          <Typography sx={{ mt: 2, textAlign: 'center' }}>
            Have an Account? <Link to="/signin" style={{ color: 'primary.main', textDecoration: 'none' }}>Login</Link>
          </Typography>
          <Typography sx={{ mt: 2, textAlign: 'center', fontWeight: 600 }}>
            Instructor <Link to="/signin" style={{ color: 'primary.main', textDecoration: 'none' }}>Sign Up</Link>
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SignUp;