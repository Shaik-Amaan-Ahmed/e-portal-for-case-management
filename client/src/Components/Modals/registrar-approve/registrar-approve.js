import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./registrar-approve.css";
import { Snackbar, Alert, CircularProgress } from "@mui/material";
import axios from "axios";
import { useState,useEffect } from "react";
import { green } from "@mui/material/colors";

function Approve(props) {

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const options = ["High", "Medium", "Low"]
  const [error, setError] = useState("");
  const [value, setValue] = useState("");

  const handleApprove = async () => {

    if(value === ""){ 
      setTimeout(() => { 
        setError("");
      },3000);
      setError("Please select the case sensitivity level");
      return;
    }
  try{
    setLoading(true);

    const res = await axios.post(
      "http://localhost:64000/e-filing/approve-case",
      { id: props.id, caseSensitivity: value,status:props.status}
    );
    if (res.status === 200) {
      setTimeout(() => { 
        setMessage("");
        props.handleClose();
        props.setReloadKey(prevkey=> prevkey + 1 );
      },1500)
      setMessage("Case approved successfully");
      setLoading(false);
      
    }
    
  }catch(err){ 
    setTimeout(() => { 
      setError("");
    },3000);
    setMessage(err.response.data.message)
    setLoading(false);
  }
}

  return (
    <div>

      <Modal
        keepMounted
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <div className="approve-container">
          {loading && (<CircularProgress style={{color:"white"}}/>)}
          {error && (<h1 style={{color:"red",marginBottom:"10px", fontSize:"large"}}>{error}</h1>)}
          {message && (<h1 style={{color:"green",marginBottom:"10px"}}>{message}</h1>)}
          <Typography variant="h5">Approve this case?</Typography>
          <br></br>
          <div>
            <Typography variant="h5" style={{color:"orange",margin:"20px"}}>
              Once you approve this case, it will be pending for allocation of judge.
            </Typography>
          </div>
          <div>
            <Typography variant="h5">Select the case senitivity level:</Typography>
            <div className="radio-btn">
            {
              options.map((option,index) => { 
                return (
                  <>
                  
                    <input type="radio"  name="sensitivity" value={option} onChange={(e)=> setValue(e.target.value)}/>
                    <label key={index} style={{fontSize:"larger",fontWeight:"500"}}>{option}</label>  
                    </>
                )
              })
              
            }
            </div>
          </div>
          <div className="approve-btn-container">
            <Button
              variant="contained"
              style={{ backgroundColor: "red", margin: "10px" }}
              onClick={props.handleClose}
            >
              cancel
            </Button>
            <Button
              variant="contained"
              style={{
                backgroundColor: "green",
                margin: "10px",
                color: "white",
              }}
              onClick={handleApprove}
            >
              Approve
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}


export default Approve;
