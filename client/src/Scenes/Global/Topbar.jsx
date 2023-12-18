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
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  function handleLogout() {
    axios
      .get("http://localhost:64000/logout")
      .then((res) => {
        if (res.status === 200) {
          window.location.reload(true);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <Box
      display="flex"
      backgroundColor={theme.palette.background.paper}
      justifyContent="space-between"
      borderBottom="0.1px solid grey"
    >
      {/* SEARCH BAR */}
      <Box display="flex" borderRadius="3px">
        <input
          style={{
            width: "17rem",
            border: "solid",
            borderRadius: 40,
            height: 40,
            justifyContent: "center",
          }}
          placeholder="Search"
        />
        <IconButton type="button" sx={{ border: "solid" }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton sx={{ ml: 8 }} onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
