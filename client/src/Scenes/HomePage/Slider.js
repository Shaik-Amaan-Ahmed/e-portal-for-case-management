import React from 'react'
import { Box } from '@mui/material'
import NoticeBoard from './NoticeBoard';

export default function Slider() {
  return (
    <div>
      <Box sx={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://tshc.gov.in/dds/images/6.jpg')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '20px',
            margin: 'auto',
            height: '69vh',
            width: '98vw',
            backgroundColor: 'rgb(0,0,0,0.5)'
            }}>
        <NoticeBoard/>
        </Box>
    </div>
  )
}