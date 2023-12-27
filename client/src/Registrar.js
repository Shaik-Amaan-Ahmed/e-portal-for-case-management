import { ColorModeContext, useMode } from "./themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./Scenes/Global/Topbar";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Sidebar from "./Scenes/Global/registrarSidebar";
import SignIn from "./Scenes/Login/login";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import axios from "axios";
import RegistrarDashboard from "./Scenes/dashboard/RegistrarDashboard";

function Registrar() {
  const [theme, colorMode] = useMode();
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:64000/registrar").then((res) => {
      if (res.data.message === "success" && res.data.role === "registrar") {
        setIsLoggedIn(true);
        window.history.pushState(null, "", "/registrar");
      } else {
        setIsLoggedIn(false);

        navigate("/login");
      }
    });
  }, [isloggedIn]);

  return ( 
    isloggedIn ? (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Box>
              <Sidebar />
            </Box>
            <main className="content">
              <div className="side-content">
              <Topbar/>
              <Routes>
                <Route path="/" element={<RegistrarDashboard />} />
              </Routes>
            </div>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
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
