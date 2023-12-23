import React, { useState } from 'react';
import "./uploadDocs.css";
import { Typography } from '@mui/material';

const UploadDocs = () => {
    const [selectedPetition, setSelectedPetition] = useState(null);
    const [selectedAadhar, setSelectedAadhar] = useState(null);
    const [petition ,setPetition] = useState('');
    const [aadhar ,setAadhar] = useState('');
    const [petitionName, setPetitionName] = useState('');
    const [aadharName, setAadharName] = useState('');

    const petitionSelectedHandler = event => {
        const file1=event.target.files[0];
        setSelectedPetition(file1);
        setPetitionName(file1.name);
    }

    const aadharSelectedHandler = event => {
        const file2=event.target.files[0];
        setSelectedAadhar(file2);
        setAadharName(file2.name);
    }
    const petitionChangeHandler = event => {
        setPetition(event.target.value);
    }
    
    const aadharChangeHandler = event => {
        setAadhar(event.target.value);
    }

    const petitionUploadHandler = () => {
        const petitionData = new petitionData();
        petitionData.append(petition, selectedPetition);
    }

    const aadharUploadHandler = () => {
        const aadharData = new aadharData();
        aadharData.append(aadhar, selectedAadhar);
    }

    return (
        <div className="main-doc">
            <Typography variant='h4'>Upload Docs</Typography>
            <div className='upload-div'>
                <div className="doc-title">
                    <Typography style={{display:"flex",marginRight:"20px"}} variant='h5'>Petition</Typography>
                </div>
                <div className='doc-input'>
                    <input type="text" className='docs-title' placeholder='Title' onChange={petitionChangeHandler} />
                    <input type="file" id="petition-file" onChange={petitionSelectedHandler} placeholder='Select Files' style={{display: 'none'}} />
                    <label htmlFor="petition-file" className="custom-file-upload">Browse</label>
                    <span style={{display:"flex"}}>{petitionName}</span>
                </div>
            </div>
            
            <div className='upload-div'>
                <div className="doc-title">
                    <Typography style={{display:"flex",marginRight:"20px"}} variant='h5'>Aadhar</Typography>
                </div>
                <div className='doc-input'>
                    <input type="text" className='docs-title' placeholder='Title' onChange={aadharChangeHandler} />
                    <input type="file" id="aadhar-file" onChange={aadharSelectedHandler} placeholder='Select Files' style={{display: 'none'}} />
                    <label htmlFor="aadhar-file" className="custom-file-upload">Browse</label>
                    <span style={{display:"flex"}}>{aadharName}</span>
                </div>
            </div>
            
        </div>
    )
}

export default UploadDocs;
