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


const Item = (props) => (
  <div className="registrar-input">
    <input
      type="text"
      placeholder={props.placeholder}
      className="registrar-register-input"
      value={props.value}
      onChange={(e) => props.setRegistrarDetails({ ...props.registrarDetails , [props.toChange] : e.target.value })}
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

  const handleRegistrarRegister = async () => { 
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:64000/registrar-register", registrarDetails);
      if(res.status === 200) {
       setMessage("Email sent successfully")
      }
      else{
        setMessage("Not found")
      }
    } catch (error) {
      console.log(error.message);
    }finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="registrar-register-form-main">
      {isLoading && <CircularProgress style={{color: "white"}}/>}
      {message && <Typography variant="h6" color="orange" fontWeight="500" style={{marginBottom:"10px"}}> {message} </Typography>} 
      <Item placeholder="Full Name" value={registrarDetails.name} toChange="name" registrarDetails={registrarDetails} setRegistrarDetails={setRegistrarDetails}/>
      <Item placeholder="Email" value={registrarDetails.email} toChange="email" registrarDetails={registrarDetails} setRegistrarDetails={setRegistrarDetails}/>
      <Item placeholder="Phone" value={registrarDetails.phone} toChange="phone" registrarDetails={registrarDetails} setRegistrarDetails={setRegistrarDetails}/>
      <div className="registrar-input">
        <button className="registrar-register-submit" onClick={handleRegistrarRegister}>Submit</button>
      </div>
    </div>
  );
};

export default RegistrarRegisterForm;
