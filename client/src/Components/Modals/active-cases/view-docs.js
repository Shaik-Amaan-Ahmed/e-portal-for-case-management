import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useState } from 'react';
import "../summons/summons-modal.css"
import { IconButton } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';

function ViewDocs(props) {

    const [message, setMessage] = useState(''); 


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
              top: "2%",
              color: "white",
              background:"red",
              borderRadius:"50%",
              alignItems:"center",
            }}
            onClick={props.handleClose}
          >
            <CloseRounded />
          </IconButton>
        </div>  
      </Modal>
    </div>
  );
}

export default ViewDocs;