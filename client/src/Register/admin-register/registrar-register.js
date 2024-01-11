import { ColorModeContext, useMode } from "../../themes";
import { CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { useState } from "react";
import "./admin-register.css";
import RegistrarRegisterForm from "../../Components/Forms/register-forms/registrar-register-form";
const RegistrarRegister = () => {
  const [theme, colorMode] = useMode();
  const [role, setRole] = useState("Judge");
  const [showComponent, setShowComponent] = useState(true);
  const [isJudgeActive, setIsJudgeActive] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="admin-register-main">
          <div className="admin-register-main-primary">
            <div className="admin-choose-role">
        
                <Typography variant="h3">
                  Registrar
                </Typography>
          
            </div>
            <div className={`admin-register-form`}>
              <RegistrarRegisterForm/>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default RegistrarRegister;