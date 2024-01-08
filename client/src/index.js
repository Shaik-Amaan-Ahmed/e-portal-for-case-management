import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Judge from "./Judge";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./Scenes/Login/login";
import Client from "./Clients";
import Register from "./Scenes/Register/register";
import HomePage from "./Scenes/HomePage/HomePage";
import Registrar from "./Registrars";
import Profiles from "./Scenes/JudgeProfiles/Profiles"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/judge/*" element={<Judge />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/client/*" element={<Client />} />
        <Route path="/registrar/*" element={<Registrar />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profiles" element={<Profiles />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="dark"
    />

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
