import { Add, EditOutlined } from '@mui/icons-material'
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import DataTable from '../../../common/DataTable';


const EnrolledStudent = ({ course }) => {

  const columns = [
    {
      field: 'Students',
      headerName: 'Students',
      width: 250,
      renderCell: (params) => {
        const student = params.row.student
        return (
          <Stack direction='row' alignItems='center' height='100%'>
            <Avatar src={student.img ?? ''} sx={{ mr: 1 }} />
            <Box>
              <Link to={`/dashboard/student/${student._id}`} style={{ textDecoration: 'none' }}>
                <Typography>@{student.username}</Typography>
              </Link>
              <Typography variant='body2' color='text.secondary'>{params.row.student.email}</Typography>
            </Box>
          </Stack>
        )
      },
    },
    {
      field: 'EnrolledAt',
      headerName: 'Enrolled At',
      width: 200,
      renderCell: (params) => {
        return (
          <Stack height='100%' justifyContent='center'>
            <Typography>{format(params.row.enrolledAt, 'dd MMM, yyyy')}</Typography>
          </Stack>
        )
      },
    },
    {
      field: 'EnrollmentStatus',
      headerName: 'Enrollment Status',
      width: 200,
      renderCell: (params) => {
        return (
          <Stack height='100%' justifyContent='center'>
            <Typography sx={{
              color: params.row.enrollmentStatus === 'approved' ?
                'success.main' : params.row.enrollmentStatus === 'pending' ? 'warning.main' : '',
              // border: params.row.enrollmentStatus === 'pending' ? '1px solid red' : params.row.enrollmentStatus === 'approved' ? '1px solid green' : '',
              borderRadius: '4px',
              padding: '2px 20px',
              fontWeight: 'bold',
              width: 'fit-content'
            }}>{params.row.enrollmentStatus}</Typography>
          </Stack>
        )
      },
    },
    {
      field: 'PaymentStatus',
      headerName: 'Payment Status',
      width: 200,
      renderCell: (params) => {
        return (
          <Stack height='100%' justifyContent='center'>
            <Typography sx={{
              bgcolor: params.row.paymentStatus === 'paid' ?
                'success.main' : params.row.paymentStatus === 'unpaid' ? 'warning.main' : '',
              color: 'white',
              borderRadius: '4px',
              padding: '2px 20px',
              fontWeight: 'bold',
              width: 'fit-content',
            }}>{params.row.paymentStatus}</Typography>
          </Stack>
        )
      },
    },
  ];


  return (
    <Box maxWidth='xl'>
      <Stack direction={{ xs: 'column', md: 'row' }} gap={2} alignItems='center' justifyContent='space-between'>
        <Box>
          <Typography variant='h5'>Enrollment List</Typography>
          <Typography variant='body2'>Total Enrollments ({course?.studentsEnrolled?.length})</Typography>
        </Box>
      </Stack>

      <Box mt={4}>
        <DataTable
          rows={course?.studentsEnrolled ?? []}
          columns={columns}
          getRowId={(row) => row?._id}
          rowHeight={70}
          noRowsLabel='No Student Enrolled'
        />
      </Box>

    </Box>
  )
}

export default EnrolledStudent