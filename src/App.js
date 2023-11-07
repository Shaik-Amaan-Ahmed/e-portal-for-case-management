import { ColorModeContext, useMode } from "./themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./Scenes/Global/Topbar"
import { Routes, Route } from "react-router-dom"
import Sidebar from "./Scenes/Global/Sidebar"
import Dashboard from "./Scenes/dashboard/dashboard";
import SignIn from "./Scenes/Login/Login";
import { MyCalendar } from "./Scenes/calendar/calendar";
import Causelist from "./Scenes/Causelist/causelist";
import Judges from "./Scenes/Judges&Lawers/judges";
import Lawers from "./Scenes/Judges&Lawers/lawers";

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
              <Route exact path="/" element = {<Dashboard/>} />
              <Route exact path="/login" element = {<SignIn/>} />
              <Route exact path="/calendar" element = {<MyCalendar/>}/>
              <Route exact path="/causelist" element = {<Causelist/>}/>
              <Route exact path="/judges" element = {<Judges/>}/>
              <Route exact path="/lawyers" element = {<Lawers/>}/>
              <Route exact path="/parties" element = {<MyCalendar/>}/>
           </Routes> 
          </main> 
        </div> 
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
}

export default App;
