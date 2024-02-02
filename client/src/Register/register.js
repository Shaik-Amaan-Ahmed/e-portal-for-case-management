import { ColorModeContext, useMode } from "../themes";
import { CssBaseline, ThemeProvider, Typography } from "@mui/material";

import { useState } from "react";
import "./admin-register/admin-register.css";
import RegisterForm from "../Components/Forms/register-form";


const ClientRegister = () => {
  const [theme, colorMode] = useMode();
  const [role, setRole] = useState("Judge");
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="admin-register-main">
          <div className="admin-register-main-primary">
            <div className="admin-choose-role">
        
                <Typography variant="h3">
                  Client
                </Typography>
          
            </div>
            <div className={`admin-register-form`}>
              <RegisterForm />
            </div>
          </div>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ClientRegister;
