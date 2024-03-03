import { ColorModeContext, useMode } from "./themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./Scenes/Global/Topbar";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Sidebar from "./Scenes/Global/defendantSidebar";
import Calendar from "./Scenes/Calendar/calendar";
import Causelist from "./Scenes/Causelist/causelist";
import JudgeViewCases from "./JudgeScenes/judge-view-cases/judge-view-cases";
import SignIn from "./Scenes/Login/login";
import { useState, useEffect ,useContext} from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import axios from "axios";
import { CaseIdContext } from "./hooks/caseIdContext";
import DefendantCaseView from "./DefendantaScenes/defendant-case-view/defendant-case-view";


function Defendant() {
  const [theme, colorMode] = useMode();
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);
  const [caseId, setCaseId] = useState("");

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:64000/defendant").then((res) => {
      if (res.data.message === "success" && res.data.role === "defendant") {
        setIsLoggedIn(true);
        setCaseId(res.data.caseId);
        console.log(res);
      } else {
        setIsLoggedIn(false);

        navigate("/login");
      }
    });
  }, [isloggedIn]);

  return ( 
    isloggedIn ? (
      <CaseIdContext.Provider value={caseId}>
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
                <Route path="/" element={<DefendantCaseView />} />
              </Routes>
            </div>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  </CaseIdContext.Provider>
  ) : (
    (isloggedIn) => {
      if (!isloggedIn) {
        navigate("/login");
      }
    }
  )
  )
}

export default Defendant;
