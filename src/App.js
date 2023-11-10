import { ColorModeContext, useMode } from "./themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./Scenes/Global/Topbar"
import { Routes, Route } from "react-router-dom"
import Sidebar from "./Scenes/Global/Sidebar"
import Dashboard from "./Scenes/dashboard/dashboard";
import Calendar from "./Scenes/Calendar/calendar";
import Causelist from "./Scenes/Causelist/causelist";

function App() {

  const [theme, colorMode] = useMode();

  return (<ColorModeContext.Provider value={colorMode}>

    <ThemeProvider theme={theme}>
      <CssBaseline/>
      
        <div className="app">
        <Sidebar/>
          <main className="content">
          
            <Topbar/>
            <Routes>
              <Route path="/" element = {<Dashboard/>} />
              <Route path="/Causelist" element = {<Causelist/>} />
              <Route path="/Calendar" element = {<Calendar/>} />
           </Routes>
          </main> 
        </div> 
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
}

export default App;
