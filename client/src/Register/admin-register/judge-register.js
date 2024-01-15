import { ColorModeContext, useMode } from "../../themes";
import { CssBaseline, ThemeProvider, Typography } from "@mui/material";
import JudgeRegisterForm from "../../Components/Forms/register-forms/judge-register-form";
import { useState } from "react";
import "./admin-register.css";
const JudgeRegister = () => {
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
                  Judge
                </Typography>
          
            </div>
            <div className={`admin-register-form`}>
              {role === "Judge" && <JudgeRegisterForm />}
            </div>
          </div>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default JudgeRegister;
