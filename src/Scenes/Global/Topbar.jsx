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
    <Box display="flex" justifyContent="end" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
<<<<<<< HEAD
        <InputBase sx={{textAlign:"center",width:200}} placeholder="   Search" id="search-main" />
=======
        <InputBase sx={{textAlign:"center",width:200}} placeholder="Search" id="search-main" />
>>>>>>> main
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton sx={{ml:8}}>
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


export default Topbar;