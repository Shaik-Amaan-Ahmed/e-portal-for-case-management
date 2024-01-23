import { Typography } from "@mui/material";
import "./sidebar.css";
import { tokens } from "../../themes";
import { useTheme } from "@mui/material";
import { useNavigate,useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
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
        <a onClick={() => {
          setSelected(title)
          navigate(to)
          }} style={{ cursor: "pointer" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex" }}></div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h5" style={{fontWeight:"500" ,color: selected===title? "orange" : "inherit"}}>{title}</Typography>
            </div>
          </div>
        </a>
      </div>
    );
  };
  const RegistrarSidebar = () => {
  const [name, setName] = useState("");
  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.name) {
    setName(location.state.name);
    }
  }, [location]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selected, setSelected] = useState("Dashboard");
  
    return (
      <div
        className="main"
        style={{
          display: "flex",
          height: "100vh",
          position: "fixed",
          width: "20vh",
          flexDirection: "column",
          backgroundColor: "#12233916",
          // borderRight: "0.1px solid #80808070",
          overflowY: "auto",
        }}
      >
        <div className="inner-item">
          <Typography
            variant="h3"
            style={{ textAlign: "center", marginTop: "20px" }}
          >
            {name}
          </Typography>
          <div className="menu-items" style={{ marginTop:"30px"}}>
            <div
              className="inner-menu-items"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div className="items">
                
                <Item
                  title="Dashboard"
                  to="/registrar"
                  icon={DashboardCustomizeOutlined}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Allocation"
                  to="/registrar/allocation-of-judge"
                  icon={DashboardCustomizeOutlined}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Send Summons"
                  to="/registrar/send-summons"
                  selected={selected}
                  setSelected={setSelected}
                />
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  };
export default RegistrarSidebar;