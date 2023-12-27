import React from 'react'
import JudgeItem from './ProfileCard'
import judgeProfile from './judgeProfiles.json'
import { Typography } from '@mui/material'
import Footer from '../HomePage/Footer'
import { ColorModeContext,useMode } from '../../themes'
import { CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from '../HomePage/NavBar'
import { useState, useEffect } from "react";
import { ArrowUpwardRounded } from "@mui/icons-material";

function Profiles() {
const [theme, colorMode] = useMode();
const [isVisible, setIsVisible] = useState(false);

// Show button when page is scrolled up to given distance
const toggleVisibility = () => {
  if (window.scrollY) {
    setIsVisible(true);
  } else {
    setIsVisible(false);
  }
};

  // Event to listen to scroll
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  return (
    <>
     <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
      <NavBar/>
      <div style={{paddingTop:'110px'}}>
        <Typography variant='h1' fontWeight='bold' sx={{textAlign:'center'}}>
            Judges
        </Typography>
        <div className='flex mx-auto p-8'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
                {
                    judgeProfile.map((judge) => (
                        <JudgeItem name={judge.name} description ={judge.description} imageUrl = {judge.imgUrl} key={judge.id} judge={judge} />
                    ))
                }
            </div>
            {isVisible && (
              <button
                className="bg-orange-700 py-2 px-2 rounded-full"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                style={{ position: "fixed", bottom: "20px", right: "20px", zIndex:1 }}
              >
                <ArrowUpwardRounded fontSize="large" />
              </button>
            )}
        </div>
      </div>
        <Footer/>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  )
}

export default Profiles

