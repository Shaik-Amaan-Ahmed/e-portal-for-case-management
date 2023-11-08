import React from 'react';
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from '../../themes';
import NavBar from './NavBar';
import Header from '../../Components/Header';
import "./homepage.css"
import NoticeBoard from './NoticeBoard';
import Slider from './Slider';

export default function HomePage() {
  return (
    <>
      <div>
      <NavBar/>
      <Slider/>
      {/* <div className='flex p-1 w-30'>
        <h2 className=''>Updates and Notifications</h2>
        <br/>
        <ul>
          <li>
            <a href="http://" target="_blank" rel="noopener noreferrer">"NJA, BHOPAL - Relief Arrangements - Nomination of (02) Judicial Officers of the District Judiciary to participate in the Academic Programme (No.P-1372) scheduled on 18.11.2023 and 19.11.2023 at NJA, Bhopal - Orders - Issued - B.Spl., dated 07-11-2023"</a>
          </li>
        </ul>
      </div> */}
      <NoticeBoard/>
      <NoticeBoard/>
      <NoticeBoard/>      
      </div>
      </>
    
  )
}
