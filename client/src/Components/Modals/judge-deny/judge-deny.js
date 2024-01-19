import * as React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import "./judge-deny.css";
import { useState } from "react";
import axios from "axios";

function JudgeDeny(props) {
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(''); 

    const handleReject = async () => { 

        if(remarks === ""){ 
            setTimeout(() => {
                setError("");
            },3000)
            setError("Please enter the remarks");
            return;
        }
        const res = await axios.post("http://localhost:64000/e-filing/reject-case", {id: props.id, reasonforrejection: remarks});
        try{
            if(res.status === 200){
                alert("Case rejected successfully");
                props.handleClose();
                window.location.reload();
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
          {message && <div className='judge-approve-message'>{message}</div>}
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

export default JudgeDeny;
