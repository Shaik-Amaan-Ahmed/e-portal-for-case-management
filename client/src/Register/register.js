import { ColorModeContext, useMode } from "../themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "./register.css";
import { Typography } from "@mui/material";
import highcourt from "../assets/highcourt.jpeg";
import logohc from "../assets/logohc.png";
import RegisterForm from "../Components/Forms/register-form"


const ClientRegister = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="register">
          <div className="register-left">
            <div className="image-container">
              <img src={logohc} className="high-court-image" />
            </div>
          </div>
          <div className="register-right">
            <RegisterForm />
          </div>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ClientRegister;
