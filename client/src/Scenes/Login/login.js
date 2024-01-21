import * as React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { ColorModeContext, useMode } from "../../themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { IconButton, useTheme } from "@mui/material";
import { tokens } from "../../themes";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "@mui/icons-material";
import "./login.css";
import { toast } from "react-toastify";

// TODO remove, this demo shouldn't need to reset the theme.
export default function SignIn() {
  const [theme, colorMode] = useMode();
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("judge");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const data = { email, password, role };
  const [passwordType, setPasswordType] = useState("password");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:64000/login/" + role;
    const res = await axios.post(url, data);

    if (res.data.message === "success") {
      navigate("/" + role);
      toast.success("Login Successful");
    } else {
      toast.error(res.data.message);
      navigate("/login");
    }
  };
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <IconButton onClick={() => navigate("/")}>
            <Home />
            <label
              style={{
                fontSize: "20px",
                fontWeight: "500",
              }}
            >
              Home
            </label>
          </IconButton>
        <div className="mains-div">
          <div className="inner-div">
            <div className="inner-items">
              <div className="switch-buttons">
                <button onClick={() => setRole("judge")}>Judge</button>
                <button onClick={() => setRole("registrar")}>Registrar</button>
                <button onClick={() => setRole("client")}>Client</button>
              </div>
              <div
                className="roles"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Typography
                  variant="h3"
                  sx={{ fontWeight: "500", fontSize: "xl", marginTop: "20px" }}
                  justifySelf="center"
                >
                  {" "}
                  {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
                </Typography>
              </div>

              <input
                name="remember"
                type="text"
                value={email}
                required="true"
                className="username"
                placeholder="Email"
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: "100%" }}
              />
              <br />
              <div style={{ position: 'relative', display: 'inline-block',width:"100%",alignItems:"center", margin:"20px" }}>
                <input
                  type={passwordType}
                  value={password}
                  required="true"
                  className="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  style={{width: "100%", display:"flex",height:"40px",background:"transparent",backdropFilter:"blur(60px)",border:"0.1px solid grey", borderRadius:"10px",padding:"20px"}} // Add right padding to prevent text from being hidden by the button
                />
                {/* password show button */}
                <button
                  style={{
                    position: 'absolute',
                    right: '15px',
                    top: '6px',
                    width: "50px",
                    height: "30px",
                    borderRadius: "10px",
                    backgroundColor: "transparent",
                    cursor: "pointer"
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    if (passwordType === "password") {
                      setPasswordType("text");
                    } else {
                      setPasswordType("password");
                    }
                  }}
                >
                  show
                </button>
              </div>
              <br />
              <div className="submit-enter">
                <button
                  className="submit"
                  onClick={handleSubmit}
                  onSubmit={handleSubmit}
                  type="text"
                >
                  Login
                </button>
              </div>
              <div className="no-account-register">
                {role==='client' && <a href="/client-register">No account? Register here</a>}
                {role==='registrar' && <a href="/registrar-register">No account? Register here</a>}
                {role==='judge' && <a href="/judge-register">No account? Register here</a>}
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
