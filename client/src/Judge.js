import { ColorModeContext, useMode } from "./themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./Scenes/Global/Topbar";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Sidebar from "./Scenes/Global/judgeSidebar";
import Calendar from "./Scenes/Calendar/calendar";
import Causelist from "./Scenes/Causelist/causelist";
import RegistrarTable from "./Components/Tables/Table";
import SignIn from "./Scenes/Login/login";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import axios from "axios";
import Home from "./Scenes/dashboard/dashboard";

function Judge() {
  const [theme, colorMode] = useMode();
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:64000/judge").then((res) => {
      if (res.data.message === "success" && res.data.role === "judge") {
        setIsLoggedIn(true);
        window.history.pushState(null, "", "/judge");
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
                <Route path="/cases" element={<RegistrarTable />} />
                <Route path="/" element={<Home />} />
                <Route path="/Causelist" element={<Causelist />} />
                <Route path="/Calendar" element={<Calendar />} />
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
export default Judge;