import React from 'react';
import './set-password.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';


const SetPassword = () => { 
    const [showPassword, setShowPassword] =useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [type, setType] = useState("password");
    const [error, setError] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    const handlePasswordSubmit = async () => { 
        if(password === rePassword) {
            
            const queryParams = new URLSearchParams(location.search);
            const token = queryParams.get('token');

            const res = await axios.post("http://localhost:64000/judge-register/set-password?token="+token,{password});
            if(res.status === 200) {
                setTimeout(() => { 
                    setError("");
                    navigate("/login");
                },3000);
                setError("Password set successfully");
                
            }
        } else { 
            setError("Passwords do not match");
        }
    }

    return (
        <div className="set-password-main">
            {error && <h1 style={{color:"orange"}}>{error}</h1>}
            <div className="set-password-main-primary">
                <div className='set-password-main-input'>
                <FormControl sx={{ m: 1, width: '100%', backdropFilter:'blur(60px)','& .MuiOutlinedInput-root': {
  '&.Mui-focused fieldset': {
    borderColor: 'rgb(201, 198, 193)',
  },
},
'& .MuiInputLabel-root': {
  '&.Mui-focused': {
    color: 'white', // change as needed
  },
}, }} variant="outlined">
         <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
  <OutlinedInput
    id="outlined-adornment-password"
    type={showPassword ? 'text' : 'password'}
    endAdornment={
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          edge="end"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    }
    label="Password"
    value={password}
    onChange={(e) => {
      setPassword(e.target.value);
    }}
  />
          </FormControl>                </div>
                <div className='set-password-main-input'>
                    <input type={type} placeholder="Re-enter Password" className="set-password-input" onChange={(e) => setRePassword(e.target.value)}/>
                </div>
                <button style={{color:"white"}} onClick={() => {
                type === "password" ? setType("text") : setType("password");
            }}>Show</button>
            </div>
            <button className="set-password-btn" onClick={handlePasswordSubmit}>Submit</button>
        </div>
    );
}

export default SetPassword;