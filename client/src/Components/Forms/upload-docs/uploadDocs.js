import React, { useState } from 'react';
import "./uploadDocs.css";
import { Typography } from '@mui/material';

const UploadDocs = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [title ,setTitle] = useState('');
    const [fileName, setFileName] = useState('');

    const fileSelectedHandler = event => {
        setSelectedFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
    }

    const fileUploadHandler = () => {
        const formData = new FormData();
        formData.append({title}, selectedFile); // append the file to the form data
        // Now you can send this form data to your server
    }

    return (
        <div className="main-doc">
            <Typography variant='h4'>Upload Docs</Typography>
            <div className='upload-div'>
                <div className="doc-title">
                <Typography style={{display:"flex",marginRight:"20px"}} variant='h5'>Petetion</Typography>
                </div>
               <div className='doc-input'>
               <input type="text" className='docs-title' placeholder='Title'/>
                <input type="file" id="file" onChange={fileSelectedHandler} placeholder='Select Files' style={{display: 'none'}} />
                <label htmlFor="file" className="custom-file-upload">Browse</label>
                <span style={{
                    // display: 'flex',
                    alignItems: 'center',
                    border: "0.1px solid grey",
                    padding:"10px"
                }}>{fileName}</span>
               </div>
                
            </div>
            <div className='upload-div'>
                <div className="doc-title">
                <Typography style={{display:"flex",marginRight:"20px"}} variant='h5'>Aadhar Details</Typography>
                </div>
               <div className='doc-input'>
               <input type="text" className='docs-title' placeholder='Title'/>
                <input type="file" id="file" onChange={fileSelectedHandler} placeholder='Select Files' style={{display: 'none'}} />
                <label htmlFor="file" className="custom-file-upload">Browse</label>
                <span style={{
                    // display: 'flex',
                    alignItems: 'center',
                    border: "0.1px solid grey",
                    padding:"10px"
                }}>{fileName}</span>
               </div>
                
            </div>
        </div>
    )
}

export default UploadDocs;