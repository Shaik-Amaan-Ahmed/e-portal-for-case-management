import React from 'react';
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from '../../themes';
import NavBar from './NavBar';
import Header from '../../Components/Header';

export default function HomePage() {
  return (
    <Box>
      <NavBar/>
      <div>
        <p className='italic m-40'>Updates and Notifications</p>
      </div>
    </Box>
  )
}
