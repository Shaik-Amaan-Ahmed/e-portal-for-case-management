import { Navbar } from "@material-tailwind/react";
import { ColorModeContext, useMode } from "./themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./Scenes/Global/Topbar"


function App() {

  const [theme, colorMode] = useMode();

  return (<ColorModeContext.Provider>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
        <div className="app">
          <main className="content">
            <Topbar/>
          </main>
     
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
}

export default App;
