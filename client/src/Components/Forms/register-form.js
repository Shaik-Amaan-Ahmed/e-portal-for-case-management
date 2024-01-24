import { Typography } from "@mui/material";
import "../../Register/register.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";


const Item = (props) => (
  <div className="judge-input">
    <input
      type="text"
      placeholder={props.placeholder}
      className="judge-register-input"
      value={props.value}
      onChange={(e) => props.setData({ ...props.data , [props.toChange] : e.target.value })}
    />
  </div>
);
const DateItem = (props) => ( 
  <div className="judge-input">
    <input
      type="date"
      placeholder={props.placeholder}
      className="judge-register-input"
      value={props.value}
      onChange={(e) => props.setData({ ...props.data , [props.toChange] : e.target.value })}
    />
  </div>
);
const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
  });
  const handleRegisterSubmit = async (e) => {
    const reversedDateOfBirth = data.dateOfBirth.split('-').reverse().join('-');
    setData({ ...data, dateOfBirth: reversedDateOfBirth });
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:64000/client-register", data);
      if(res.status === 400) {
        setMessage("Email already exists");
      }
      if(res.status === 200) {
       setMessage("If the email you provided is valid, a set password mail will be sent to that email-address")
      }
    } catch (error) {
      setMessage('Check whether your email is correct or user with this email already exists');
      console.log(error.message);
    }finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="registrar-register-form-main">
    {isLoading && <CircularProgress style={{color: "white"}}/>}
    {message && <Typography variant="h6" color="orange" fontWeight="500" style={{marginBottom:"10px"}}> {message} </Typography>} 
    <Item placeholder="First Name" value={data.firstName} toChange="firstName" data={data} setData={setData}/>
    <Item placeholder="Last Name" value={data.lastName} toChange="lastName" data={data} setData={setData}/>
    <DateItem placeholder="Date of Birth(dd-mm-yyyy)" value={data.dateOfBirth} toChange="dateOfBirth"  data={data} setData={setData}/>
    <Item placeholder="Email" value={data.email} toChange="email"  data={data} setData={setData}/>
    <Item placeholder="Phone" value={data.phone} toChange="phone"  data={data} setData={setData}/>
    <div className="registrar-input">
      <button className="registrar-register-submit" onClick={handleRegisterSubmit}>Submit</button>
    </div>
  </div>

  );
};

export default RegisterForm;
