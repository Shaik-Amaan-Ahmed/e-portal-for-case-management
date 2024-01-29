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
    />
  </div>
);
const DateItem = (props) => ( 
  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-GB">
  <div className="judge-input">
    {/* <input
      type="date"
      placeholder={props.placeholder}
      className="judge-register-input"
      value={props.value}
      onChange={(e) => props.setData({ ...props.data , [props.toChange] : e.target.value })}
    /> */}
    <DatePicker
      label={props.placeholder}
      value={props.value}
      format="DD-MM-YYYY "
      slotProps={{
        textField: {
          error: false, // if you want to force error state
        },
      }}
      onChange={(e) => props.setData({ ...props.data , [props.toChange] : e })}
      renderInput={(params) => <TextField {...params} />}
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
  const handleRegisterSubmit = async (e) => {
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

  return (
    <div className="registrar-register-form-main">
    {isLoading && <CircularProgress style={{color: "white"}}/>}
    {message && <Typography variant="h6" color="orange" fontWeight="500" style={{marginBottom:"10px"}}> {message} </Typography>} 
    <Item placeholder="First Name" value={data.firstName} toChange="firstName" data={data} setData={setData}/>
    <Item placeholder="Last Name" value={data.lastName} toChange="lastName" data={data} setData={setData}/>
    <DateItem placeholder="Date of Birth" value={data.dateOfBirth} toChange="dateOfBirth"  data={data} setData={setData}   />
    <Item placeholder="Email" value={data.email} toChange="email"  data={data} setData={setData}/>
    <Item placeholder="Phone" value={data.phone} toChange="phone"  data={data} setData={setData}/>
    <div className="registrar-input">
      <button className="registrar-register-submit" onClick={handleRegisterSubmit}>Submit</button>
    </div>
  </div>

  );
};

export default RegisterForm;
