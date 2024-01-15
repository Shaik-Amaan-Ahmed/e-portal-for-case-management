import { ColorModeContext, useMode } from "../../themes";
import { CssBaseline, ThemeProvider, Typography } from "@mui/material";
import JudgeRegisterForm from "../../Components/Forms/register-forms/judge-register-form";
import { useState } from "react";
import "./admin-register.css";

const AdminRegister = () => {
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
              <div className="admin-choose-role-btn">
                <button
                  onClick={(e) => {
                    setIsJudgeActive(true);
                    setRole("Judge");
                  }}
                  className={`role-btn ${isJudgeActive? "active" : ""}`}
                >
                  Judge
                </button>
                <button
                  onClick={(e) => {
                    setIsJudgeActive(false);
                    setRole("Registrar");
                  }}
                  className={`role-btn ${isJudgeActive? "" : "active"}`}
                >
                  Registrar
                </button>
              </div>
            </div>
            <div className={`admin-register-form`}>
              {role === "Judge" && <JudgeRegisterForm />}
              {role === "Registrar" && <h1>hello</h1>}
            </div>
          </div>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default AdminRegister;
