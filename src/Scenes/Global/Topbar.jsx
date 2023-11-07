import { Box, IconButton, rgbToHex, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../themes";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2} position="sticky">
      {/* SEARCH BAR */}
      <Box
        display="flex"
        borderRadius="3px"
      >
        <InputBase style={{borderRadius:15, width:200, border:"solid", placeContent:"center"}} placeholder="Search" id="search-main"/>
        <IconButton type="button" sx={{border:"solid"}}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton sx={{ml:8}} onClick={colorMode.toggleColorMode}>
          {theme.palette.mode==="dark"?<LightModeOutlinedIcon/>: <DarkModeOutlinedIcon/>}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon/>
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon/>
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon/>
        </IconButton>
      </Box>
    </Box>
  );
};


export default Topbar;