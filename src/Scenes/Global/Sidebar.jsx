import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import MyImage from "../../assets/user.png"
import { Link } from "@mui/material";
import { tokens } from "../../themes";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import { CalendarTodayOutlinedIcon } from "@mui/icons-material/CalendarTodayOutlined";
import { HelpOutlined } from "@mui/icons-material/HelpOutlined";
import { BarChartOutlined } from "@mui/icons-material/BarChartOutlined";
import { PieChartOutlineOutlined } from "@mui/icons-material/PieChartOutlineOutlined";
import { TimelineOutlined } from "@mui/icons-material/TimelineOutlined";
import  MenuOutlined  from "@mui/icons-material/MenuOutlined";
import { MapOutlined } from "@mui/icons-material/MapOutlined";


 const Sidebar = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [isCollapsed, setIsCollapsed] = useState(false);
   const [selected, setSelected] = useState("Dashboard");

    return (
      <Box
         sx={{
            "& .pro-sidebar-inner": {
               background: `${colors.primary[400]} !important`
            },
            "& .pro-icon-wrapper": {
               backgroundColor: "transparent !important"
            },
            "& .pro-inner-item": {
               padding: "5px 35px 5px 20px !important"
            },
            "& .pro-inner-item:hover": {
               color: "#868dfb !important" 
            },
            "& .pro-menu-item.active": {
               color: "#6870fa !important"
            }
         }}
      >
         {/* Start */}
         <ProSidebar collapsed={isCollapsed}>
            {/* Menu icon  */}
            <Menu iconShape="square">

               <MenuItem
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  icon= {isCollapsed? <MenuOutlined/> : undefined}
                  style={{
                     margin: "10px 0 20px 0",
                     color: colors.grey[100],
                  }} 
               >
                  {!isCollapsed && (
                     <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        ml="15px"
                     >
                        <Typography variant="h3" color={colors.grey[100]}>
                           ADMINS
                        </Typography>
                        <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                           <MenuOutlined/>
                        </IconButton>
                     </Box>
                  )}
               
               </MenuItem>
                  {/* USER */}
               {!isCollapsed && (
                  <Box mb="25px">
                     <Box display="flex" justifyContent="center" alignItems="center">
                        <img
                        alt="profile-user"
                        width="100px"
                        height="100px"
                        src={MyImage}
                        style={{ cursor: "pointer", borderRadius: "50%"}}
                        />
                     </Box>
                     <Box textAlign="center">
                        <Typography 
                        variant="h4" 
                        color={colors.grey[100]} 
                        fontWeight="bold" 
                        sx={{m: "10px 0 0 0"}}
                        >
                           Shaik Amaan Ahmed
                           </Typography>
                        <Typography
                           variant="h5"
                           color={colors.greenAccent[500]}
                        >
                           CEO
                        </Typography>
                     </Box>
                  </Box>
               )}

            </Menu>
         </ProSidebar>

      </Box>
    )
 }

 export default Sidebar;