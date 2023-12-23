import * as React from 'react';
import { ThemeProvider, styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Popover } from '@mui/material';
import { ColorModeContext,useMode } from '../../themes'
import { CssBaseline} from "@mui/material";
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});
export default function JudgeItem(props) {
    const [open, setOpen] = useState(false);
    const [anchorPosition, setAnchorPosition] = useState({
      top: 0,
      left: 0,
    });
    const [theme, colorMode] = useMode();
    const [popoverContent, setPopoverContent] = useState("");
    const {name, description, imageUrl} = props;
    // const [judgeDescription, setJudgeDescription] = useState("");
    const handleEventClick = (info) => {
      setPopoverContent(info.name);
      setAnchorPosition({
        top: info.clientY,
        left: info.clientX,
      });
      // setJudgeDescription(info.description);
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(null);
    };
  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        border:'2px solid',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="judge" src={imageUrl} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={4}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {name}
                </Typography>
            </Grid>
            <Grid item>
            <Button size="small" onClick={handleEventClick}  sx={{border:'0.1px solid white',color:'white'}}>About</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Popover
        open={open}
        anchorReference="anchorPosition"
        anchorPosition={anchorPosition}
        onClose={handleClose}
        sx={{
          "& .MuiPopover-paper": {
            maxHeight: "50vh", // Adjust this value as needed
            overflow: "auto",
            backgroundColor: "black",
            background: "",
            borderRadius: "10px",
            backdropFilter: "blur(5px)",
            padding:'10px',
            WebkitFilter: "blur(0px)",
          },
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between"}}>
          <Typography fontWeight="bold">
            {popoverContent}
          </Typography>
        </div>
        <Typography>
          <Typography variant='h5'>
            {name}:
          </Typography>
          {description}
          </Typography>
      </Popover>
    </Paper>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
