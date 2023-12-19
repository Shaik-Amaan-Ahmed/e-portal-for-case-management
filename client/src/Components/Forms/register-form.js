import { Typography } from "@mui/material";
import "../../Scenes/Register/register.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ColorModeContext, useMode } from "../../themes";
import { CssBaseline, ThemeProvider } from "@mui/material";


const RegisterForm = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
  });

// var ml = 0;

//   const inputRef = useRef(null);
//   useEffect(() => { 
//     ml = inputRef.current.offsetWidth;
//     ml = toString(ml);
//   },[]);

  const navigitate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:64000/register", data)
      .then((res) => {
        if (res.data.message === "User registered") {
          alert("succesfully registered");
          navigitate("/login");
        } else if (res.data.message === "User already exists") {
          alert("User already exists");
        } else {
          console.log("Error occured");
        }
      })
      .catch((err) => {
        console.log(err.message);
        alert("User already exists");

      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "70%",
        border: "1px solid",
        borderRadius: "10px",
        padding: "10px",
      }}
    >
      <Typography variant="h2">Register</Typography>
      <div className="register-form">
        <div className="inner-register-elements">
          <div className="first-name">
            <input
              type="text"
              placeholder="First Name"
              className="register-input"
              onChange={(e) => {
                setData({ ...data, firstName: e.target.value });
              }}
            />
          </div>
          <div className="first-name">
            <input
              type="text"
              placeholder="Last Name"
              className="register-input"
              onChange={(e) => {
                setData({ ...data, lastName: e.target.value });
              }}
            />
          </div>
          <div className="first-name">
            <input
              type="email"
              placeholder="Email"
              className="register-input"
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
            />
          </div>
          <div className="password-field">
  <input
    type={passwordType}
    placeholder="Password"
    className="register-input"
    onChange={(e) => {
      setData({ ...data, password: e.target.value });
    }}
  />
  <button
    style={{
      width: "50px",
      height: "30px",
      borderRadius: "10px",
      backgroundColor: "transparent",
      cursor: "pointer",
      marginRight:"5px"
    }}
    onClick={(e) => {
      e.preventDefault();
      if (passwordType === "password") {
        setPasswordType("text");
      } else {
        setPasswordType("password");
      }
    }}
  >
    show
  </button>
</div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                className="register-input"
                onChange={(e) => {
                  setData({ ...data, phoneNumber: e.target.value });
                }}
              />
            </div>
            <div>
              <input
                type="date"
                placeholder="Date of Birth"
                className="register-input"
                onChange={(e) => {
                  let date = new Date(e.target.value);
                  let formattedDate =
                    date.getDate() +
                    "-" +
                    (date.getMonth() + 1) +
                    "-" +
                    date.getFullYear();
                  setData({ ...data, dateOfBirth: formattedDate });
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          type="submit"
          style={{
            width: "100px",
            height: "50px",
            borderRadius: "10px",
            backgroundColor: "#ffbf00",
            border: "none",
            cursor: "pointer",
            outline: "none",
            marginTop: "20px",
            marginBottom: "20px",
            cursor: "pointer",
          }}
          className="register-button"
          onClick={handleRegisterSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
