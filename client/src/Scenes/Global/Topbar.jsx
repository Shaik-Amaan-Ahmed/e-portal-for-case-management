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
      backgroundColor="transparent"
      justifyContent="space-between"
      borderBottom="0.11px solid grey"
    >
      {/* SEARCH BAR */}
      <Box display="flex" borderRadius="3px" align="center">
        <input
          style={{
            width: "100%",
            border: "0.1px solid grey",
            height: "40px",
            padding: "10px",
            borderRadius: "10px",
            margin: "10px 10px 10px 10px",
            justifyContent: "center",
            color: "inherit",
            backgroundColor: "transparent",
            textAlign: "center"
          }}
          placeholder="Search"
        />
        <IconButton
          type="button"
          sx={{
            display: "flex",
            border: "solid",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto"
          }}
        >
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
