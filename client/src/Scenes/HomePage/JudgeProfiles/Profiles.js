import React from 'react'
import JudgeItem from './ProfileCard'
import judgeProfile from './profiles.json'
import { Typography } from '@mui/material'
import Footer from '../Footer'
import { ColorModeContext,useMode } from '../../../themes'
import { CssBaseline, ThemeProvider } from "@mui/material";
function Profiles() {
    const [theme, colorMode] = useMode();
  return (
    <>
     <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
    <Typography variant='h2' fontWeight='bold' sx={{textAlign:'center'}}>
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


// import * as React from 'react';
// import JudgeItem from './ProfileCard'
// import judgeProfile from './profiles.json'
// import { experimentalStyled as styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';


// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(2),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

// export default function Profiles() {
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
//         {judgeProfile.map((judge) => (
//           <Grid item xs={2} sm={4} md={4} key={judge.id}>
//             <Item>
//                 <JudgeItem name={judge.name} description ={judge.description} imageUrl = {judge.imgUrl} key={judge.id} judge={judge} />
//             </Item>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }


// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';
// import ButtonBase from '@mui/material/ButtonBase';
// import Button from '@mui/material/Button';
// import { useState } from 'react';
// import { Popover } from '@mui/material';
// const Img = styled('img')({
//   margin: 'auto',
//   display: 'block',
//   maxWidth: '100%',
//   maxHeight: '100%',
// });
// export default function JudgeItem(props) {
//     const [open, setOpen] = useState(false);
//     const [anchorPosition, setAnchorPosition] = useState({
//       top: 0,
//       left: 0,
//     });
//     const [popoverContent, setPopoverContent] = useState("");
//     const {name, description, imageUrl} = props;
//     // const [judgeDescription, setJudgeDescription] = useState("");
//     const handleEventClick = (info) => {
//       setPopoverContent(info.name);
//       setAnchorPosition({
//         top: info.clientY,
//         left: info.clientX,
//       });
//       // setJudgeDescription(info.description);
//       setOpen(true);
//     };
//     const handleClose = () => {
//       setOpen(null);
//     };
//   return (
//     <Paper
//       sx={{
//         p: 2,
//         margin: 'auto',
//         maxWidth: 500,
//         flexGrow: 1,
//         backgroundColor: (theme) =>
//           theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//       }}
//     >
//       <Grid container spacing={2}>
//         <Grid item>
//           <ButtonBase sx={{ width: 128, height: 128 }}>
//             <Img alt="complex" src={imageUrl} />
//           </ButtonBase>
//         </Grid>
//         <Grid item xs={12} sm container>
//           <Grid item xs container direction="column" spacing={2}>
//             <Grid item xs>
//               <Typography gutterBottom variant="subtitle1" component="div">
//                 {name}
//                 </Typography>
//             </Grid>
//             <Grid item>
//             <Button size="small" onClick={handleEventClick}  sx={{border:'1px solid black'}}>About</Button>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//       <Popover
//         open={open}
//         anchorReference="anchorPosition"
//         anchorPosition={anchorPosition}
//         onClose={handleClose}
//         sx={{
//           "& .MuiPopover-paper": {
//             maxHeight: "50vh", // Adjust this value as needed
//             overflow: "auto",
//             backgroundColor: "rgba(255,255,255,0.9)",
//             background: "",
//             borderRadius: "10px",
//             backdropFilter: "blur(5px)",
//             padding:'10px',
//             WebkitFilter: "blur(0px)",
//           },
//         }}
//       >
//         <div style={{ display: "flex", justifyContent: "space-between"}}>
//           <Typography fontWeight="bold">
//             {popoverContent}
//           </Typography>
//         </div>
//         <Typography>
//           <Typography variant='h5'>
//             {name}
//           </Typography>
//           {description}
//           </Typography>
//       </Popover>
//     </Paper>
//   );
// }