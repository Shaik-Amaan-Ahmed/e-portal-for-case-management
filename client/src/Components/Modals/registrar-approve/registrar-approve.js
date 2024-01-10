import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./registrar-approve.css";
import { Snackbar, Alert, CircularProgress } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { set } from "mongoose";
import { green } from "@mui/material/colors";

function Approve(props) {

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  const handleApprove = async () => {
    setLoading(true);
    const res = await axios.post(
      "http://localhost:64000/e-filing/approve-case",
      { id: props.id }
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
  };

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
          {message && (<h1 style={{color:"green",marginBottom:"10px"}}>{message}</h1>)}
          <Typography variant="h5">Approve this case?</Typography>
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
