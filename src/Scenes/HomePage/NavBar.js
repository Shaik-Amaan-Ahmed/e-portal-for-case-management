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
    
    <div className=" p-2 flex justify-start w-screen bg-orange-700">
      {/* LOGO */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={Logo} style={{ width: "100px", height: "100px" }} alt="Logo" />
        <Typography variant="h4" style={{ marginLeft: "10px" }}><span style={{fontWeight:"bold", fontSize:"1.9em"}}>HIGH COURT</span><br></br>For The State of Telangana</Typography>
      </div>
      <div className="ml-9">
        <ul className="mt-7">
            <li className="text-xl inline-flex p-2"><a href="/causelist">Cause List</a></li>
            <li className="text-xl inline-flex p-2"><a href="/profiles">Profiles</a></li>
            <li className="text-xl inline-flex p-2"><a href="/judgments">Judgements</a></li>
            <li className="text-xl inline-flex p-2"><a href="/login">Login</a></li>
        </ul>
      </div>
            
      

      {/* ICONS
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
      </Box> */}
    </div>
    
  );
};

export default NavBar;