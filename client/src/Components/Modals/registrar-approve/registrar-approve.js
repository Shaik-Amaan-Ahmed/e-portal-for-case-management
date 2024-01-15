import * as React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import "./registrar-approve.css";
import { useState } from "react";
import axios from "axios";

function RegistrarApprove(props) {
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");

    const handleApprove = async () => { 

        const res = await axios.post("http://localhost:64000/e-filing/approve-case", {id: props.id, reasonforrejection: remarks});
        try{
            if(res.status === 200){
                alert("Case approved successfully");
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
        <div className="approve-container">
          {error && <Typography variant="h5" sx={{color: "red"}}>{error}</Typography>}
            <div className="approve-remarks">
              <Typography
                variant="h3"
                sx={{
                  color: "orange",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Are you sure you want to approve this case?
              </Typography>
            </div>
            <div className="approve-buttons">
              <button onClick={handleApprove}>Approve</button>
              <button>Cancel</button>
            </div>
          </div>
      </Modal>
      </div>
    </>
  );
}

export default RegistrarApprove;
