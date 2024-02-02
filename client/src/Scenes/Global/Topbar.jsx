import {
  Box,
  Divider,
  Icon,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  rgbToHex,
  useTheme,
} from "@mui/material";
import {EmailContext} from "../../hooks/emailContext";
import { useContext, React } from "react";
import { ColorModeContext, tokens } from "../../themes";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import { PasswordRounded } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SpringModal from "../../Components/Modals/springModal";
import { Logout, Settings } from "@mui/icons-material";
import "./Topbar.css";
const Topbar = () => {
  const name = useContext(EmailContext).name.toUpperCase();
  console.log("topbar "+name);
  const email = useContext(EmailContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const   handleClose = () => setOpen(false);
  async function handleChangePassword() {
    // console.log(email);
    try {
      const res = await axios.post("http://localhost:64000/change-password", {email: email});
      if (res.status === 200) {
        handleClose();
      }
    }
    catch (err) {
      console.log(err.message);
    }
  }

  function handleLogout() {
    handleClose();        
    axios
      .get("http://localhost:64000/logout")
      .then((res) => {
        if (res.status === 200) {
          window.location.reload(true);
        }
      })      .catch((err) => {
        console.log(err.message);
      });
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const Open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  }

  return (
    <>
      <Box
        display="flex"
        backgroundColor="transparent"
        justifyContent="space-between"
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
            className="search-bar"
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
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={Open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={Open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>{name[0]}</Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Open}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        slotProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Divider />
        <MenuItem onClick={handleOpen}>
          <ListItemIcon>
            <PasswordRounded />
          </ListItemIcon>
          Change Password
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Box>
        <SpringModal
          handleOpen={handleOpen}
          handleClose={handleClose}
          handleSubmit={handleChangePassword}
          open={open}
          message="Change Password?"
          notif="Mail for changing password sent Successfully"
        />
      </Box>
    </>
  );
};

export default Topbar;