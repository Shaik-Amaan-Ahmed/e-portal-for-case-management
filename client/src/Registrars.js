import { ColorModeContext, useMode } from "./themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./Scenes/Global/Topbar";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import axios from "axios";
import RegistrarSidebar from "./Scenes/Global/registrarSidebar";
import RegistrarDashboard from "./registrarScenes/registrarDashboard/registrarDashboard"
import AllocateCases from "./registrarScenes/registrar-allocate-cases/registrar-allocate-cases";

function Registrar() {
  const [theme, colorMode] = useMode();
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:64000/registrar").then((res) => {
      if (res.data.message==="success" && res.data.role === "registrar") {
        setIsLoggedIn(true);
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
              <RegistrarSidebar />
            </Box>
            <main className="content">
              <div className="side-content">
              <Topbar/>
              <Routes>
                <Route path="/" element={<RegistrarDashboard />} />
                <Route path="/allocation-of-judge" element={<AllocateCases />} />
              </Routes>
            </div>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  ) : (
    (isloggedIn) => {
      if (!isloggedIn) {
        navigate("/login");
      }
    }
  )
  )
}

export default Registrar;
