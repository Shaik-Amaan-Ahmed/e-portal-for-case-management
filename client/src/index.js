import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Judge from "./Judge";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./Scenes/Login/login";
import Client from "./Clients";
import ClientRegister from "./Register/register";
import HomePage from "./Scenes/HomePage/HomePage";
import Registrar from "./Registrars";
import AdminRegister from "./Register/admin-register/judge-register";
import SetPassword from "./Components/set-password/judge-set-password";
import Profiles from "./Scenes/JudgeProfiles/Profiles"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import JudgeRegister from "./Register/admin-register/judge-register";
import RegistrarPassword from "./Components/set-password/registrar-set-password";
import RegistrarRegister from "./Register/admin-register/registrar-register";
import ClientPassword from "./Components/set-password/client-set-password";
import FeedbackForm from "./Components/Forms/feedback-form/feedback-form";
import Defendant from "./Defendants";
import FAQ from "./Scenes/FAQ/Faq";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/judge/*" element={<Judge/>} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/client/*" element={<Client/>} />
        <Route path="/registrar/*" element={<Registrar/>} />
        <Route path="/defendant/*" element={<Defendant/>} />

        <Route path="/client-register" element={<ClientRegister/>} />
        <Route path="/judge-register" element={<JudgeRegister/>} />
        <Route path="/registrar-register" element={<RegistrarRegister/>}/>
        <Route path="/set-password-judge" element={<SetPassword />} />
        <Route path="/set-password-registrar" element={<RegistrarPassword/>} />
        <Route path="/set-password-client" element={<ClientPassword/>} />
        <Route path="/profiles" element={<Profiles/>} />
        <Route path="/contact-us" element={<FeedbackForm/>} />
        <Route path="/faq" element={<FAQ/>} />

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
