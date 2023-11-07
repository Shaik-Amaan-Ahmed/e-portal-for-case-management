import { ColorModeContext, useMode } from "./themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./Scenes/Global/Topbar"
import { Routes, Route } from "react-router-dom"
import Sidebar from "./Scenes/Global/Sidebar"
import Dashboard from "./Scenes/dashboard/dashboard";
import SignIn from "./Scenes/Login/Login";
import { MyCalendar } from "./calendar";

function App() {

  const [theme, colorMode] = useMode();

  return (<ColorModeContext.Provider value={colorMode}>

    <ThemeProvider theme={theme}>
      <CssBaseline/>
      
        <div className="app">
        <Sidebar />
          <main className="content">
          
            <Topbar/>
            <Routes>
              <Route path="/" element = {<Dashboard/>} />
              <Route path="/login" element = {<SignIn/>} />
              <Route path="/calendar" element = {<MyCalendar/>}/>
           </Routes>
          </main> 
        </div> 
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
}

export default App;
