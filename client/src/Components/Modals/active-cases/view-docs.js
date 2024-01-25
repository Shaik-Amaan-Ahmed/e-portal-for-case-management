import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useState,useEffect } from 'react';
import "../summons/summons-modal.css"
import { IconButton } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import {CircularProgress} from '@mui/material';

function ViewDocs(props) {

    const [message, setMessage] = useState(''); 
    const [loading, setLoading] = useState(false);
    const [doc, setDoc] = useState([]);

    useEffect(() => { 
      setLoading(true);
      axios.get("http://localhost:64000/casedetails/send-docs?caseId="+props.caseId+"&fileName=writtenStatement").then((res) => { 
        setDoc(res.data);
        setLoading(false);
      }).catch((err) => {
        console.log(err);
      })  
    },[])

  return (
    <div>
      <Modal
        keepMounted
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <div className='summons-modal'>
        <IconButton
            size="small"
            style={{
              position: "absolute",
              right: "1%",
              top: "1%",
              color: "white",
              background:"red",
              borderRadius:"50%",
              alignItems:"center",
            }}
            onClick={props.handleClose}
          >
            <CloseRounded />
          </IconButton>
          {loading ? (<CircularProgress  style={{color:"white"}}/>)  :
          <div style={{width:"100%", height:"90%"}}>
            <iframe src={`data:application/pdf;base64,${doc.file}`} width="100%" height="100%"/>
          </div>
          
}
        </div>  
      </Modal>
    </div>
  );
}

export default ViewDocs;