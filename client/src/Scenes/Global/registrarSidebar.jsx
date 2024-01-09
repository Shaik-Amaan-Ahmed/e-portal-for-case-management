import { Typography } from "@mui/material";
import "./sidebar.css";
import { tokens } from "../../themes";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MyImage from "../../assets/user.png";
import DashboardCustomizeOutlined from "@mui/icons-material/DashboardCustomizeOutlined";
const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme);
    const navigate = useNavigate();
  
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
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
  
  const RegistrarSidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selected, setSelected] = useState("Dashboard");
  
    return (
      <div
        className="main"
        style={{
          display: "flex",
          borderRight: "0.5px solid",
          height: "100%",
          position: "fixed",
          width: "20vh",
          flexDirection: "column",
          backgroundColor: theme.palette.background.paper,
          overflowY: "auto",
        }}
      >
        <div className="inner-items">
          <Typography
            variant="h3"
            style={{ textAlign: "center", marginTop: "20px" }}
          >
            Admin
          </Typography>
          <div className="menu-items" style={{ marginTop:"30px"}}>
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
                  to="/registrar"
                  icon={DashboardCustomizeOutlined}
                />
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  };
export default RegistrarSidebar;