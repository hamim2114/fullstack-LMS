import { useMediaQuery } from "@mui/material";
import React from 'react'



const useIsMobile = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'))
  return isMobile
}

export default useIsMobile