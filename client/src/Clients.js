import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { ColorModeContext, useMode } from "./themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import ClientSidebar from "./Scenes/Global/clientSidebar";
import CaseDetails from "./clientScenes/MyCases/mycases";
import Topbar from "./Scenes/Global/Topbar";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import { EmailContext } from "./hooks/emailContext";
import Efiling from "./clientScenes/e-filing/e-filing";
import ClientDashboard from "./clientScenes/MyCases/ClientDashboard";

const Client = () => {
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [theme, colorMode] = useMode();
  const [email, setEmail] = useState("");

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:64000/client").then((res) => {
      if (res.data.message === "success" && res.data.role === "client") {
        setIsLoggedIn(true);
        setEmail(res.data.email);
      } else {
        setIsLoggedIn(false);
        navigate("/login");
      }
    });
  }, [isloggedIn]);


  return (
    <EmailContext.Provider value={email}>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
       
          <div className="app">
            <main className="content">
            <ClientSidebar />
              <div className="side-content">
                <Topbar />
               <div style={{
                
                width: "100%",
               }}>
               <Routes>
                    <Route path="/" element={<ClientDashboard/>} />
                    <Route path="/e-filing" element = {<Efiling />} />
                </Routes>
              </div> 
                
              </div>
            </main>
          </div>
        
      </ThemeProvider>
    </ColorModeContext.Provider>
    </EmailContext.Provider>
  );
};

export default Client;
