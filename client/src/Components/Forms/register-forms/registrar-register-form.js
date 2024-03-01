import { Checkbox, Typography } from "@mui/material";
import "./registrar-register-form.css";
import { useEffect, useState } from "react";
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  FormControl
} from "@mui/material";
import axios from "axios";
import {CircularProgress} from "@mui/material";
import TextField from '@mui/material/TextField';
import { set } from "mongoose";


const Item = (props) => (
  <div className="registrar-input">
      <TextField 
      id="outlined-basic" 
      label={props.placeholder} 
      variant="outlined" 
      value={props.value} 
      onChange={(e) => props.setRegistrarDetails({ ...props.registrarDetails , [props.toChange] : e.target.value })}
      sx={{
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: 'rgb(201, 198, 193)',
          },
        },
        '& .MuiInputLabel-root': {
          '&.Mui-focused': {
            color: 'white', // change as needed
          },
        },
        
      }}
      error={props.nameError || props.emailError || props.phoneError}
      helperText={props.nameError ? props.nameErrorMsg : props.emailError ? props.emailErrorMsg : props.phoneError ? props.phoneErrorMsg : ""}
    />
  </div>
);

const RegistrarRegisterForm = () => {
  const [caseCategories, setCaseCategories] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [registrarDetails,setRegistrarDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState(""); 
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [phoneErrorMsg, setPhoneErrorMsg] = useState("");
  const validateForm = () => {
    let isValid = true;
    

      if (!registrarDetails.name) {
        isValid = false;
        setNameError(true);
        setNameErrorMsg("Name is required");
      }else{
        isValid = true;
        setNameError(false);
        setNameErrorMsg("");
      }
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if(!registrarDetails.email) {
        isValid = false;
        setEmailErrorMsg("Email is required");
        setEmailError(true);
      }else if(!regex.test(registrarDetails.email)){
        isValid = false;
        setEmailErrorMsg("Invalid email");
        setEmailError(true);
      }else{
        isValid = true;
        setEmailErrorMsg("");
        setEmailError(false);
      }


      if(!registrarDetails.phone) {
        isValid = false;
        setPhoneErrorMsg("Phone number is required");
        setPhoneError(true);
      }else if(!/^[0-9]{10}$/i.test(registrarDetails.phone)){
        isValid = false;
        setPhoneErrorMsg("Invalid phone number or Phone number must be 10 digits");
        setPhoneError(true);
      }else{
        isValid = true;
        setPhoneErrorMsg("");
        setPhoneError(false);
      }
    return isValid;
}


  const handleRegistrarRegister = async () => { 
    if(validateForm()) { 
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:64000/registrar-register", registrarDetails);
      if(res.status === 200) {
       setMessage("Email sent successfully")
      }
    } catch (error) {
      console.log(error.message);
    }finally {
      setIsLoading(false);
    }
  }
}

  return (
    <div className="registrar-register-form-main">
      {isLoading && <CircularProgress style={{color: "white"}}/>}
      {message && <Typography variant="h6" color="orange" fontWeight="500" style={{marginBottom:"10px"}}> {message} </Typography>} 
      <Item placeholder="Full Name" value={registrarDetails.name} toChange="name" registrarDetails={registrarDetails} setRegistrarDetails={setRegistrarDetails} nameError={nameError} nameErrorMsg={nameErrorMsg} />
      <Item placeholder="Email" value={registrarDetails.email} toChange="email" registrarDetails={registrarDetails} setRegistrarDetails={setRegistrarDetails} emailError={emailError} emailErrorMsg={emailErrorMsg}  />
      <Item placeholder="Phone" value={registrarDetails.phone} toChange="phone" registrarDetails={registrarDetails} setRegistrarDetails={setRegistrarDetails} phoneError={phoneError} phoneErrorMsg={phoneErrorMsg}/>
      <div className="registrar-input">
        <button className="registrar-register-submit" onClick={handleRegistrarRegister}>Submit</button>
      </div>
    </div>
  );
};

export default RegistrarRegisterForm;
