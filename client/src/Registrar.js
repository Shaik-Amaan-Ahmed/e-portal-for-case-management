import { ColorModeContext, useMode } from "./themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./Scenes/Global/Topbar";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Scenes/Global/registrarSidebar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import axios from "axios";
import RegistrarDashboard from "./Scenes/dashboard/registrarDashboard";
import { EmailContext } from "./hooks/emailContext";
function Registrar() {
  const [theme, colorMode] = useMode();
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:64000/registrar").then((res) => {
      if (res.data.message === "success" && res.data.role === "registrar") {
        setIsLoggedIn(true);
        setName(res.data.name);
        window.history.pushState(null, "", "/registrar");
      } else {
        setIsLoggedIn(false);
        navigate("/login");
      }
    });
  }, [isloggedIn]);

  return (
    isloggedIn ? (
      <EmailContext.Provider value={{ name: name }} >
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="app">
              <Box>
                <Sidebar />
              </Box>
              <main className="content">
                <div className="side-content">
                  <Topbar />
                  <Routes>
                    <Route path="/" element={<RegistrarDashboard />} />
                  </Routes>
                </div>
              </main>
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </EmailContext.Provider>
    ) : (
      (isloggedIn) => {
        if (!isloggedIn) {
          console.log("not logged in");
          navigate("/login");
        }
      }
    )
  )
}

export default Registrar;
