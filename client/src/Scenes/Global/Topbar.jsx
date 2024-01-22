import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { useContext, React,useState } from "react";
import { ColorModeContext} from "../../themes";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";

const Topbar = () => {
  const name = useContext(EmailContext).name.toUpperCase();

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
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
  const [anchorEl, setAnchorEl] = useState(null);
  const Open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
              textAlign: "center",
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
              margin: "auto",
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

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default Topbar;
