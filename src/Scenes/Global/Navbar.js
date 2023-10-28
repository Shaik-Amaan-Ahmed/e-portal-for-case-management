import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext,tokens } from "../../themes";
import { LightModeOutlined   } from "@mui/icons-material/LightModeOutlined";
import { DarkModeOutlined   } from "@mui/icons-material/DarkModeOutlined";
import { NotificationsOutlined   } from "@mui/icons-material/NotificationsOutlined";
import { SettingsOutlined   } from "@mui/icons-material/SettingsOutlined";
import { PersonOutlined   } from "@mui/icons-material/PersonOutlined";
import { SearchIcon } from "@mui/icons-material/Search";

 const Topbar = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const colorMode = useContext(ColorModeContext);

    return (
      <Box display="flex" justifyContent="space-between" p={2}>
         
      </Box>
    );
 }

 export default Topbar;