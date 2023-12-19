import React from "react";
import NavBar from "./NavBar";
import "./homepage.css";
import NoticeBoard from "./NoticeBoard";
import Slider from "./Slider";
import { useState, useEffect } from "react";
import { ArrowUpwardRounded } from "@mui/icons-material";
import Footer from "./Footer";
import { ColorModeContext, useMode } from "../../themes";
import { CssBaseline, ThemeProvider } from "@mui/material";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [theme, colorMode] = useMode();

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.scrollY) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Event to listen to scroll
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="main">
            <NavBar />
            <Slider />
            {isVisible && (
              <button
                className="bg-orange-700 py-2 px-2 rounded-full"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                style={{ position: "fixed", bottom: "20px", right: "20px" }}
              >
                <ArrowUpwardRounded fontSize="large" />
              </button>
            )}

            <NoticeBoard />
            <NoticeBoard />
            <NoticeBoard />
            <Footer />
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}
