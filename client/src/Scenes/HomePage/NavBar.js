import { Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../themes";
import Logo from "./logo3.jpg";

const NavBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <div
      style={{
        padding: '8px',
        backgroundColor: "rgba(70, 130, 180, 1)",
        display: "flex",
        justifyContent: "space-between",
        position: "fixed",
        width: "100%",
        alignItems: "center",
        height: "max-content",
        zIndex:1000

      }}
    >
      <div className="flex-1">
        <div className="flex">
          <ul>
            <li className="text-xl inline-flex p-2  hover:bg-orange-700 rounded-lg">
              <a href="/causelist">Cause List</a>
            </li>
            <li className="text-xl inline-flex p-2 hover:bg-orange-700 rounded-lg">
              <a href="/profiles">Profiles</a>
            </li>
            <li className="text-xl inline-flex p-2  hover:bg-orange-700 rounded-lg">
              <a href="/judgements">Judgements</a>
            </li>
          </ul>
        </div>
      </div>

      {/* LOGO */}
      <div className="flex-1 items-center">
        <div className="flex items-center justify-center">
          <a href="/">
            <img className="rounded-full w-20 h-20" src={Logo} alt="Logo" />
          </a>
          <Typography variant="h3" style={{ marginLeft: "10px" }}>
            <span style={{ fontWeight: "bold", justifyContent:"center", alignItems:"center", display:"flex" }}>
              <a style={{ display: "flex", justifyContent: "center" , width:"100%"}} href="/">
                HIGH COURT OF
              </a>
            </span>
            <span style={{ fontWeight: "bold" }}>
              <a style={{ display: "flex", justifyContent: "center" }} href="/">
                TELANGANA
              </a>
            </span>
          </Typography>
        </div>
      </div>
      <div className="flex-1">
        <div className=" flex justify-end">
          <ul className="mr-4">
            <li className="text-xl inline-flex p-2 mx-5 hover:bg-orange-700 rounded-lg">
              <a href="/register">
                Register
              </a>
            </li>
            <li className="text-xl inline-flex p-2 mx-5 bg-orange-700 rounded-lg">
              <a href="/login" className="">
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
