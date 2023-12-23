import React from 'react'
import JudgeItem from './ProfileCard'
import judgeProfile from './judgeProfiles.json'
import { Typography } from '@mui/material'
import Footer from '../HomePage/Footer'
import { ColorModeContext,useMode } from '../../themes'
import { CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from '../HomePage/NavBar'
function Profiles() {
    const [theme, colorMode] = useMode();
  return (
    <>
     <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
      <NavBar/>
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
    </div>
        <Footer/>
        </ThemeProvider>
      </ColorModeContext.Provider>

    </>
  )
}

export default Profiles

