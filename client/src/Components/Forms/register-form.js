import { Typography } from "@mui/material";
import "../../Register/register.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const Item = (props) => (
  <div className="judge-input">
  <TextField 
      id="outlined-basic" 
      label={props.placeholder} 
      variant="outlined" 
      value={props.value} 
      onChange={(e) => props.setData({ ...props.data , [props.toChange] : e.target.value })}
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
      error={props.firstNameErrorMsg ||props.lastNameError || props.emailError || props.phoneError }
      helperText={props.firstNameErrorMsg ? props.firstNameErrorMsg : props.lastNameError ? props.lastNameErrorMsg : props.emailError ? props.emailErrorMsg : props.phoneError ? props.phoneErrorMsg : ""}
    />
  </div>
);
const DateItem = (props) => ( 
  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-GB">
  <div className="judge-input">
    <DatePicker
      label={props.placeholder}
      value={props.value}
      format="DD-MM-YYYY "
      slotProps={{
        textField: {
          error: props.dateOfBirthError,
          helperText:props.dateOfBirthErrorMsg // if you want to force error state
        },
      }}
      onChange={(e) => props.setData({ ...props.data , [props.toChange] : e })}
      renderInput={(params) => <TextField {...params} 
      helperText={props.dateOfBirthError ? props.dateOfBirthErrorMsg : ""} />}
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
      
    />
  </div>
  </LocalizationProvider>
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
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [dateOfBirthError, setDateOfBirthError] = useState(false);

  const [firstNameErrorMsg, setFirstNameErrorMsg] = useState("");
  const [lastNameErrorMsg, setLastNameErrorMsg] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [phoneErrorMsg, setPhoneErrorMsg] = useState("");
  const [dateOfBirthErrorMsg, setDateOfBirthErrorMsg] = useState("");
  const validateForm = () => {
    let isValid = true;
    if(!data.firstName) {
      isValid = false;
      setFirstNameError(true);
      setFirstNameErrorMsg("First Name is required");
    }else{
      isValid = true;
      setFirstNameError(false);
      setFirstNameErrorMsg("");
    }
    if(!data.lastName) {
      isValid = false;
      setLastNameError(true);
      setLastNameErrorMsg("Last Name is required");
    }else{
      isValid = true;
      setLastNameError(false);
      setLastNameErrorMsg("");
    }
    if(!data.email) {
      isValid = false;
      setEmailError(true);
      setEmailErrorMsg("Email is required");
    }else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(data.email)){
      isValid = false;
      setEmailError(true);
      setEmailErrorMsg("Invalid email");
    }else{
      isValid = true;
      setEmailError(false);
      setEmailErrorMsg("");
    }

    if(!data.phone) {
      isValid = false;
      setPhoneError(true);
      setPhoneErrorMsg("Phone number is required");
    }else if(!/^[0-9]{10}$/i.test(data.phone)){
      isValid = false;
      setPhoneError(true);
      setPhoneErrorMsg("Invalid phone number");
    }else{
      isValid = true;
      setPhoneError(false);
      setPhoneErrorMsg("");
    }
    if(!data.dateOfBirth) {
      isValid = false;
      setDateOfBirthError(true);
      setDateOfBirthErrorMsg("Date of birth is required");
    }else{
      isValid = true;
      setDateOfBirthError(false);
      setDateOfBirthErrorMsg("");
    }

    return isValid;
  }
  const handleRegisterSubmit = async (e) => {
  if(validateForm()) {
    setData({ ...data, dateOfBirth: data.dateOfBirth });
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
  }

  return (
    <div className="registrar-register-form-main">
    {isLoading && <CircularProgress style={{color: "white"}}/>}
    {message && <Typography variant="h6" color="orange" fontWeight="500" style={{marginBottom:"10px"}}> {message} </Typography>} 
    <Item placeholder="First Name" value={data.firstName} toChange="firstName" data={data} setData={setData} firstNameError={firstNameError} firstNameErrorMsg={firstNameErrorMsg}/>
    <Item placeholder="Last Name" value={data.lastName} toChange="lastName" data={data} setData={setData} lastNameError={lastNameError} lastNameErrorMsg={lastNameErrorMsg}/>
    <DateItem placeholder="Date of Birth" value={data.dateOfBirth} toChange="dateOfBirth"  data={data} setData={setData} dateOfBirthError={dateOfBirthError} dateOfBirthErrorMsg={dateOfBirthErrorMsg}/>
    <Item placeholder="Email" value={data.email} toChange="email"  data={data} setData={setData} emailError={emailError} emailErrorMsg={emailErrorMsg}/>
    <Item placeholder="Phone" value={data.phone} toChange="phone"  data={data} setData={setData} phoneError={phoneError} phoneErrorMsg={phoneErrorMsg}/>
    <div className="registrar-input">
      <button className="registrar-register-submit" onClick={handleRegisterSubmit}>Submit</button>
    </div>
  </div>

  );
};

export default RegisterForm;
