import * as React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import "./registrar-deny.css";
import { useState, useEffect } from "react";
import axios from "axios";

function RegistrarDeny(props) {
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");

    const handleReject = async () => { 

        if(remarks === ""){ 
            setTimeout(() => {
                setError("");
            },3000)
            setError("Please enter the remarks");
            return;
        }
        const res = await axios.post("http://localhost:64000/e-filing/registrar-reject-case", {id: props.id, reasonforrejection: remarks});
        try{
            if(res.status === 200){
                alert("Case rejected successfully");
                props.handleClose();
                window.location.reload(true);
            }
        }catch (error){ 
            console.log(error.message);
        }
    }

  return (
    <>
    <div>
      <Modal
        keepMounted
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <div className="deny-container">
          {error && <Typography variant="h5" sx={{color: "red"}}>{error}</Typography>}
          <div className="deny-reason-container">
            <div className="deny-remarks">
              <Typography
                variant="h3"
                sx={{
                  color: "orange",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Remarks
              </Typography>
              <textarea
                className="deny-textarea"
                placeholder="Enter remarks here"
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>
            <div className="deny-buttons">
              <button onClick={handleReject}>Reject</button>
              <button onClick={props.handleClose}>Cancel</button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
    </>
  );
}

export default RegistrarDeny;
