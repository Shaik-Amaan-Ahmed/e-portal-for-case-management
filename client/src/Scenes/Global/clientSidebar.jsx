import { EmailContext } from "../../hooks/emailContext";
import { Typography } from "@mui/material";
import "./sidebar.css";
import { tokens } from "../../themes";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
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
const ClientSidebar = () => {
  const name = useContext(EmailContext).name.toUpperCase();
  const theme = useTheme();
  const colors = tokens(theme);

  return (
    <div
      className="main"
      style={{
        display: "flex",
        borderRight: "0.1px solid #80808070",
        height: "100%",
        position: "fixed",
        width: "20vh",
        flexDirection: "column",
        backgroundColor: "#12233916",
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
        <div style={{ marginTop: "30px" }}>
          <div
            className="inner-menu-item"
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
                title="Case Details"
                to="/client"
                icon={DashboardCustomizeOutlined}
              />
              <Item title="e-filing" to="/client/e-filing" />
              <Item title="Calendar" to="/judge/calendar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClientSidebar;
