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

// TODO remove, this demo shouldn't need to reset the theme.
export default function SignIn() {
  const [theme, colorMode] = useMode();
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("judge");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const data = { email, password, role };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:64000/login/" + role;
    const res = await axios.post(url, data);

    if (res.data.message === "success") {
      navigate("/" + role);
    } else {
      alert(res.data.message);
      navigate("/login");
    }
  };
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>
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
        </div>
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
              />
              <br />
              <input
                type="password"
                value={password}
                className="username"
                required="true"
                style={{
                  padding: "10px",
                  margin: "10px",
                  display: "flex",
                  width: "90%",
                  borderRadius: "10px",
                  border: "0.1px solid grey",
                }}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
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
                <a href="/client-register">No account? Register</a>

                <a href="/admin-register">Register Admin</a>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
