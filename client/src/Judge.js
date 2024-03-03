import { ColorModeContext, useMode } from "./themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./Scenes/Global/Topbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Scenes/Global/judgeSidebar";
import Calendar from "./Scenes/Calendar/calendar";
import Causelist from "./Scenes/Causelist/causelist";
import JudgeViewCases from "./JudgeScenes/judge-view-cases/judge-view-cases";
import SignIn from "./Scenes/Login/login";
import { useState, useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import axios from "axios";
import { EmailContext } from "./hooks/emailContext";
import OnGoingCases from "./JudgeScenes/judge-ongoing-cases/judge-ongoing-cases";
import JudgeDashboard from "./JudgeScenes/judge-dashboard/judge-dashboard";
import { useIdleTimer } from "react-idle-timer";

function Judge() {
  const [theme, colorMode] = useMode();
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);
  const [email, setEmail] = useState("");
  const idleTimerRef = useRef(null);
  const [totalTime, setTotalTime] = useState(0);
  let activeTime = null;
  const handleOnActive = () => {
    console.log("User is active");
    activeTime = Date.now(); // Record the time when the user becomes active
  };

  const handleOnIdle = () => {
    console.log("User is idle");
    const idleTime = Date.now(); // Record the time when the user becomes idle
    const timeSpent = idleTime - activeTime; // Calculate the time spent in this session

    setTotalTime((prevTime) => prevTime + timeSpent); // Add the time spent in this session to the total time spent
  };

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 2,
    onActive: handleOnActive,
    onIdle: handleOnIdle,
  });

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

  return isloggedIn ? (
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
                <Topbar />
                <Routes>
                  <Route path="/" element={<JudgeDashboard />} />
                  {/* <Route path="/judge-cases" element={<JudgeViewCases />} /> */}
                  <Route path="/ongoing-cases" element={<OnGoingCases />} />
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
  );
}

export default Judge;
