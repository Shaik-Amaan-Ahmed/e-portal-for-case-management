import { useContext, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import MyImage from "../../assets/user.png";
import { tokens } from "../../themes";
import DashboardCustomizeOutlined from "@mui/icons-material/DashboardCustomizeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlined from "@mui/icons-material/MenuOutlined";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import Causelist from "../Causelist/causelist";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";


const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme);
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "start",
        marginTop: "10px",
        marginLeft: "25px",
        marginBottom: "2px",
      }}
    >
      <a onClick={() => navigate(to)} style={{ cursor: "pointer" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}></div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6">{title}</Typography>
          </div>
        </div>
      </a>
    </div>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <div
      className="main"
      style={{
        display: "flex",
        borderRight: "0.5px solid",
        height: "100vh",
        position: "fixed",
        width: "20vh",
        flexDirection: "column",
        backgroundColor: theme.palette.background.paper,
        overflowY: "scroll",
      }}
    >
      <div className="inner-items">
        <Typography
          variant="h3"
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          Admin
        </Typography>
        <div
          className="image"
          style={{
            display: "flex",
            marginTop: "20px",
            justifyContent: "center",
          }}
        >
          <img
            alt="profile-user"
            width="100px"
            height="100px"
            src={MyImage}
            style={{ cursor: "pointer", borderRadius: "50%" }}
          />
        </div>
        <div className="menu-items">
          <div
            className="inner-menu-items"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div className="items">
              <Typography
                variant="h7"
                color={colors.black[100]}
                marginLeft="20px"
              >
                Info
              </Typography>
              <Item
                title="Dashboard"
                to="/judge"
                icon={DashboardCustomizeOutlined}
              />
              <Item title="Cases" to="/judge/cases" />
              <Item title="Calendar" to="/judge/calendar" />
            </div>
            <div className="items">
              <Typography
                variant="h7"
                color={colors.black[100]}
                marginLeft="20px"
              >
                TBD
              </Typography>
              <Item title="TBD" to="/judge" icon={DashboardCustomizeOutlined} />
              <Item title="TBD" to="/judge/" />
              <Item title="TBD" to="/judge/" />
            </div>
            <div className="items">
              <Typography
                variant="h7"
                color={colors.black[100]}
                marginLeft="20px"
              >
                TBD
              </Typography>
              <Item title="TBD" to="/judge" icon={DashboardCustomizeOutlined} />
              <Item title="TBD" to="/judge/" />
              <Item title="TBD" to="/judge/" />
            </div>
            <div className="items">
              <Typography
                variant="h7"
                color={colors.black[100]}
                marginLeft="20px"
              >
                TBD
              </Typography>
              <Item title="TBD" to="/judge" icon={DashboardCustomizeOutlined} />
              <Item title="TBD" to="/judge/" />
              <Item title="TBD" to="/judge/" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

// <Box
//   sx={{
//     "& .pro-sidebar-inner": {
//       background: `${theme.palette.background.paper} !important`,
//     },
//     "& .pro-icon-wrapper": {
//       backgroundColor: "transparent !important",
//     },
//     "& .pro-inner-item": {
//       padding: "5px 25px 5px 20px !important",
//       fontSize: "20px",
//     },
//     "& .pro-inner-item:hover": {
//       color: "#0096FF !important",
//     },
//     "& .pro-menu-item.active": {
//       color: "#0096FF !important",
//     },

//   }}
//   borderRight="0.2px solid"

// >
//   {/* Start */}
//   <ProSidebar collapsed={isCollapsed}>
//     {/* Menu icon  */}
//     <Menu iconShape="square">
//       <MenuItem
//         onClick={() => setIsCollapsed(!isCollapsed)}
//         icon={isCollapsed ? <MenuOutlined /> : undefined}
//         style={{
//           margin: "10px 0 20px 0",
//         }}
//       >
//         {!isCollapsed && (
//           <Box
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             ml="50px"
//           >
//             <Typography variant="h3" sx={{ color: colors.black[100] }}>
//               ADMINS
//             </Typography>
//             <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
//               <MenuOutlined />
//             </IconButton>
//           </Box>
//         )}
//       </MenuItem>
//       {/* USER */}
//       {!isCollapsed && (
//         <Box mb="25px">
//           <Box display="flex" justifyContent="center" alignItems="center">
//             <img
//               alt="profile-user"
//               width="100px"
//               height="100px"
//               src={MyImage}
//               style={{ cursor: "pointer", borderRadius: "50%" }}
//             />
//           </Box>
//           <Box textAlign="center">
//             <Typography
//               variant="h4"
//               fontWeight="bold"
//               sx={{ m: "10px 0 0 0", color: colors.black[100] }}
//             >
//               Mark Zuck Zuck
//             </Typography>
//             <Typography variant="h5" color={colors.greenAccent[500]}>
//               CEO
//             </Typography>
//           </Box>
//         </Box>
//       )}

//       {/* MENU ITEMS */}

//       <Box paddingLeft={isCollapsed ? undefined : "10%"}>
//         <Item
//           title="Dashboard"
//           to="/judge/cases"
//           icon={
//             <DashboardCustomizeOutlined
//               sx={{ color: colors.blueAccent[100] }}
//             />
//           }
//           selected={selected}
//           setSelected={setSelected}
//         />
//         <Typography
//           variant="h6"
//           sx={{ m: "15px 0 0 25px", color: colors.redAccent[500] }}
//         >
//           DATA
//         </Typography>
//         <Item
//           title="Cause List"
//           to="/judge/Causelist"
//           icon={
//             <PeopleOutlinedIcon sx={{ color: colors.blueAccent[100] }} />
//           }
//           onClick={<Causelist />}
//           selected={selected}
//           setSelected={setSelected}
//         />
//         <Item
//           title="Calendar"
//           to="/judge/Calendar"
//           icon={
//             <CalendarTodayOutlinedIcon
//               sx={{ color: colors.blueAccent[100] }}
//             />
//           }
//           selected={selected}
//           setSelected={setSelected}
//         />
//         <Typography
//           variant="h6"
//           sx={{ m: "15px 0 0 25px", color: colors.redAccent[500] }}
//         >
//           INFO
//         </Typography>
//         <Item
//           title="Judges"
//           to="/judge/judges"
//           icon={
//             <PeopleOutlinedIcon sx={{ color: colors.blueAccent[100] }} />
//           }
//           selected={selected}
//           setSelected={setSelected}
//         />

//         <Item
//           title="Lawyers"
//           to="/judge/lawyers"
//           icon={
//             <PeopleOutlinedIcon sx={{ color: colors.blueAccent[100] }} />
//           }
//           selected={selected}
//           setSelected={setSelected}
//         />

//         <Item
//           title="Parties"
//           to="/judge/parties"
//           icon={
//             <PeopleOutlinedIcon sx={{ color: colors.blueAccent[100] }} />
//           }
//           selected={selected}
//           setSelected={setSelected}
//         />
//         <Typography
//           variant="h6"
//           sx={{ m: "15px 0 0 25px", color: colors.redAccent[500] }}
//         >
//           STATS
//         </Typography>
//         <Item
//           title="Line"
//           to="/judge/"
//           icon={
//             <PeopleOutlinedIcon sx={{ color: colors.blueAccent[100] }} />
//           }
//           selected={selected}
//           setSelected={setSelected}
//         />

//         <Item
//           title="Settings"
//           to="/judge/Settings"
//           icon={<SettingsOutlined sx={{ color: colors.blueAccent[100] }} />}
//           selected={selected}
//           setSelected={setSelected}
//         />
//       </Box>
//     </Menu>
//   </ProSidebar>
// </Box>
