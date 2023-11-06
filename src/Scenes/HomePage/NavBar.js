import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../themes";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "./logo3.jpg";

const NavBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* LOGO */}
      {/* <Box display="inline-flex">
        <img src={Logo} style={{width:"100px",height:"100px"}}></img>
        <Typography variant="h5">HIGH COURT</Typography>
      </Box> */}
      <Box style={{ display: "flex", alignItems: "center" }}>
  <img src={Logo} style={{ width: "100px", height: "100px" }} alt="Logo" />
  <Typography variant="h4" style={{ marginLeft: "10px" }}>HIGH COURT</Typography>
</Box>

      

      {/* ICONS */}
      <Box display="flex">
        <IconButton>
          <LightModeOutlinedIcon/>
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default NavBar;