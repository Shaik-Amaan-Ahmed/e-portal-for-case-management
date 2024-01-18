import { ColorModeContext, useMode } from "./themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./Scenes/Global/Topbar";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Sidebar from "./Scenes/Global/judgeSidebar";
import Calendar from "./Scenes/Calendar/calendar";
import Causelist from "./Scenes/Causelist/causelist";
import JudgeViewCases from "./JudgeScenes/judge-view-cases/judge-view-cases";
import SignIn from "./Scenes/Login/login";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import axios from "axios";
import Home from "./Scenes/dashboard/dashboard";
import { EmailContext } from "./hooks/emailContext";

function Judge() {
  const [theme, colorMode] = useMode();
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);
  const [email, setEmail] = useState("");

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:64000/judge").then((res) => {
      if (res.data.message === "success" && res.data.role === "judge") {
        setEmail(res.data.email);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        
        navigate("/login");
      }
    });
  }, [isloggedIn]);

  return ( 
    isloggedIn ? (
      <EmailContext.Provider value={email}>
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
                
                <Route path="/" element={<Home />} />
                <Route path="/judge-cases" element={<JudgeViewCases />} />
                <Route path="/Causelist" element={<Causelist />} />
                <Route path="/Calendar" element={<Calendar />} />
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
        navigate("/login");
      }
    }
  )
  )
}

export default Judge;
