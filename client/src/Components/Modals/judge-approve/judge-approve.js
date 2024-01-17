import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './judge-approve.css';
import axios from 'axios';
import { useState } from 'react';

function JudgeApprove(props) {

    const [message, setMessage] = useState(''); 

   const handleApprove = async () => {

    const res = await axios.post('http://localhost:64000/e-filing/judge-approve?id=' + props.id);
    if(res.status === 200){
      setTimeout(() => {
        setMessage('');
        props.handleClose();
      }, 3000);
      setMessage('Case approved successfully');
      props.setReloadKey(prev => prev + 1);
    }
    else{
      setMessage('Error approving case');
      setTimeout(() => {
        setMessage('');
      }, 3000);
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
        <div className='judge-approve-box'>
            {message && <div className='judge-approve-message'>{message}</div>}
          <div className='judge-approve-inside'>
            <Typography variant="h5">
              Are you sure you want to approve the case?
            </Typography>
            <div className='judge-approve-buttons'>
            <button variant='contained' color='error' onClick={props.handleClose}>Cancel</button>
              <button variant='contained' color='success' onClick={handleApprove}>Approve</button>
              
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default JudgeApprove;