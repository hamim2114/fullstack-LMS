import { KeyboardArrowUp, NoEncryption, PanToolAlt, WhatsApp } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function ContactTop() {

  return (
    <Box sx={{
      position: 'fixed',
      bottom: 30,
      zIndex: 99999,
      right: 70, display: { xs: 'none', lg: 'block' }
    }}>
        <a className="contactTop" target='blank' href="https://wa.me/+8801640667112">
          <IconButton sx={{
            bgcolor: '#25D366',
            border: '1px solid lightgray',
            ":hover": {
              bgcolor: 'lightgray'
            }
          }}>
            <WhatsApp sx={{color:'#fff'}} fontSize="large" />
          </IconButton>
        </a>
    </Box>
  );
}