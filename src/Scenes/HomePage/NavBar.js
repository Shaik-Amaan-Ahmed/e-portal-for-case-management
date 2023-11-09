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
import { red } from "@mui/material/colors";

const NavBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (

    <div className="p-2 flex justify-between items-center w-screen fixed" style={{backgroundColor: 'rgba(70, 130, 180, 0.8)'}}>
      <ul>
        <li className="text-xl inline-flex p-2 mx-5"><a href="/causelist">Cause List</a></li>
        <li className="text-xl inline-flex p-2 mx-5"><a href="/profiles">Profiles</a></li>
      </ul>
      {/* LOGO */}
      <div className="flex items-center">
        <a href="/"><img className="rounded-full w-20 h-20" src={Logo} alt="Logo" /></a>
        <Typography variant="h4" style={{ marginLeft: "10px" }}><span style={{ fontWeight: "bold", fontSize: "1.9em" }}>HIGH COURT</span><br></br>For The State of Telangana</Typography>
      </div>
      <ul className="mr-4">
        <li className="text-xl inline-flex p-2 mx-5"><a href="/judgments">Judgements</a></li>
        <li className="text-xl inline-flex p-2 mx-5"><button className="bg-orange-700 py-1 px-5 rounded-lg">Login</button></li>
      </ul>
    </div>

  );
};

export default NavBar;