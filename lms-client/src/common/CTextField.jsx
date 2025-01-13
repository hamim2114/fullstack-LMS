/* eslint-disable react/prop-types */
import React from 'react';
import { Stack, TextField, Typography } from '@mui/material';

const CTextField = ({
  label = '',
  topLabel = '',
  value = '',
  onChange = () => { },
  name = '',
  variant = 'outlined',
  fullWidth = true,
  error = false,
  helperText = '',
  ...props
}) => {
  return (
    <Stack width='100%'>
      {topLabel && (
        <Typography variant="subtitle2" color="textSecondary">
          {topLabel}
        </Typography>
      )}
      <TextField
        label={label}
        value={value}
        onChange={onChange}
        name={name}
        variant={variant}
        fullWidth={fullWidth}
        error={error}
        helperText={helperText}
        {...props}
      />
    </Stack>
  );
};

export default CTextField;
