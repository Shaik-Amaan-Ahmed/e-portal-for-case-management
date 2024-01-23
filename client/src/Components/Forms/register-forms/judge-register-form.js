import { Checkbox, Typography } from "@mui/material";
import "./judge-register-form.css";
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
  <div className="judge-input">
    <input
      type="text"
      placeholder={props.placeholder}
      className="judge-register-input"
      value={props.value}
      onChange={(e) => props.setJudgeDetails({ ...props.judgeDetails , [props.toChange] : e.target.value })}
    />
  </div>
);

const JudgeRegisterForm = () => {
  const [caseCategories, setCaseCategories] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [judgeDetails,setJudgeDetails] = useState({
    name: "",
    email: "",
    phone: "",
    casePreferences: selectedOptions
  });

  useEffect(() => {
    setJudgeDetails(prevDetails => ({ ...prevDetails, casePreferences: selectedOptions }));
  }, [selectedOptions]);

  useEffect(() => {
    try {
      axios.get("http://localhost:64000/case-category").then((res) => {
        setCaseCategories(res.data.data[0].caseType);
      });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const handleJudgeRegister = async () => { 
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:64000/judge-register", judgeDetails);
      if(res.status === 200) {
       setMessage("Email sent successfully")
      }
    } catch (error) {
      
      console.log(error.message);
    }finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="judge-register-form-main">
      {isLoading && <CircularProgress style={{color: "white"}}/>}
      {message && <Typography variant="h6" color="orange" fontWeight="500" style={{marginBottom:"10px"}}> {message} </Typography>} 
      <Item placeholder="Full Name" value={judgeDetails.name} toChange="name" judgeDetails={judgeDetails} setJudgeDetails={setJudgeDetails}/>
      <Item placeholder="Email" value={judgeDetails.email} toChange="email" judgeDetails={judgeDetails} setJudgeDetails={setJudgeDetails}/>
      <Item placeholder="Phone" value={judgeDetails.phone} toChange="phone" judgeDetails={judgeDetails} setJudgeDetails={setJudgeDetails}/>
      <div className="judge-input">
        <Typography variant="h6" color="orange" fontWeight="500" style={{marginBottom:"10px"}}>
          What type of cases do you deal with?
        </Typography>
        <FormControl className="judge-input">
      <InputLabel sx={{borderColor:"white",backdropFilter:"blur(60px)"}}>Multiple Select</InputLabel>
      <Select
        multiple
        value={selectedOptions}
        onChange={(e) => setSelectedOptions(e.target.value)}
        input={<OutlinedInput label="Multiple Select" />}
        sx={{
          background:"transparent",
          color: "white",
        }}
      >
        {Object.keys(caseCategories).map((name) => (
          <MenuItem key={name} value={name} sx={{color: selectedOptions.includes(name) ? "orange" : "white",backgroundColor:'black'}}>
            <button className="select-multiple-opns">{name}</button>
          </MenuItem>
        ))}
      </Select>
    </FormControl> 
        <div></div>
      </div>
      <div className="judge-input">
        <button className="judge-register-submit" onClick={handleJudgeRegister}>Submit</button>
      </div>
    </div>
  );
};

export default JudgeRegisterForm;
