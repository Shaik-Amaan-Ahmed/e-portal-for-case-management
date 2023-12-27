import React, { useState } from 'react';
import "./uploadDocs.css";
import { Typography } from '@mui/material';
import { useEffect } from 'react'

const UploadDocs = (props) => {

    const [error, seterror] = useState("");//to store error message
     //to store the url of the uploaded file
    //to store selected petition and aadhar
    const storedDocDetails = JSON.parse(localStorage.getItem('docDetails'));


    //setting initial values of petition and aadhar if stored in local storage else passing the object
    const initialDetails = storedDocDetails ? storedDocDetails : {
        petitionBase64: '',
        petitionTitle: '',
        petitionFileName: '',
        aadharBase64: '',
        aadharTitle: '',
        aadharFileName: '',
    } 

    const [uploadDocs, setUploadDocs] = useState(initialDetails);//to store petition and aadhar

    //petition file handler
    const petitionSelectedHandler = event => {
        const file1 = event.target.files[0];
    


            setUploadDocs({
                ...uploadDocs,
                petitionBase64: file1,
                petitionFileName: file1.name,
            });

    
    };

    //aadhar file handler
    const aadharSelectedHandler = event => {
        const file2=event.target.files[0];
        setUploadDocs({
            ...uploadDocs,
            aadharBase64: file2,
            aadharFileName: file2.name,
        })
    }

    //petition title handler
    const petitionTitleHandler = event => {
        setUploadDocs({
            ...uploadDocs,
            petitionTitle: event.target.value,
        })
    }
    
    //aadhar title handler
    const aadharTitleHandler = event => {
        setUploadDocs({
            ...uploadDocs,
            aadharTitle: event.target.value,
        })
    }

    //convert file to base64

    
    //handle submit on click of submit button
    const handleSubmit = async event => { 

        /* start of validation */
        if(!uploadDocs.petitionBase64 && !uploadDocs.aadharBase64) { 
            seterror("Please select both the files");
            return;
        }

        if(!uploadDocs.petitionBase64){ 
            seterror("Please upload petition");
            return;
        }

        if(!uploadDocs.aadharBase64) { 
            seterror("Please upload aadhar");
            return;
        }

        if(!uploadDocs.petitionTitle && !uploadDocs.aadharTitle){ 
            seterror("Please enter petition & aadhar title");
            return;
        }

        if(!uploadDocs.petitionTitle){ 
            seterror("Please enter petition title");
            return;
        }

        if(!uploadDocs.aadharTitle) { 
            seterror("Please enter aadhar title");
            return;
        }
        /* end of validation */

        event.preventDefault();

        if(uploadDocs.petitionBase64.size > 200*1024) { 
            seterror("Petition size should be less than 200KB");
            return;
        }

        if(uploadDocs.aadharBase64.size > 200 *1024) { 
            seterror("Aadhar size should be less than 200KB");
            return;
        }

        //storing the uploaded documents in the local storage with key docDetails
        localStorage.setItem('docDetails', JSON.stringify(uploadDocs));

        //calling handleNext function to move to next step
        props.handleNext(props.activeStep + 1);
    }

    return (
        <>
        {error && <span className="error-message">{error}</span>}
        <div className="main-doc">
            <Typography variant='h4'>Upload Docs</Typography>
            <div style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                flexDirection:"column",
                margin: "10px",
            }}>
                <Typography style={{color: "orange"}} variant='h5'>*File size should be less than 200kb</Typography>
            </div>
            <div style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                flexDirection:"column",
                width:"100%",
            }}>


            <div className='upload-div'>
            
                <div className="doc-title">
                    <Typography style={{display:"flex",marginRight:"20px"}} variant='h5'>Petition</Typography>
                </div>
                <div className='doc-input'>
                    <input type="text" className='docs-title' placeholder='Title' onChange={petitionTitleHandler} value={uploadDocs.petitionTitle}/>
                    <input type="file" id="petition-file" onChange={petitionSelectedHandler} placeholder='Select Files' style={{display: 'none'}} />
                    <label htmlFor="petition-file" className="custom-file-upload">Browse</label>
                </div>
                <span style={{display:"flex",width:"100%"}}>{uploadDocs.petitionFileName}</span>
            </div>
            
            <div className='upload-div'>
                <div className="doc-title">
                    <Typography style={{display:"flex",marginRight:"20px"}} variant='h5'>Aadhar</Typography>
                </div>
                <div className='doc-input'>
                    <input type="text" className='docs-title' placeholder='Title' onChange={aadharTitleHandler} value={uploadDocs.aadharTitle}/>
                    <input type="file" id="aadhar-file" onChange={aadharSelectedHandler} placeholder='Select Files' style={{display: 'none'}} />
                    <label htmlFor="aadhar-file" className="custom-file-upload">Browse</label>
                </div>
                <span style={{display:"flex",width:"100%"}}>{uploadDocs.aadharFileName}</span>
            </div>
            </div>
            <button onClick={handleSubmit} 
                style={{
                    backgroundColor: "orange",
                    display: "flex",
                    color: "white",
                    border: "none",
                    justifyContent: "center",
                    borderRadius: "10px",
                    padding: "10px",
                    cursor: "pointer",
                    marginTop: "20px",
                    margin : "10px 10px 10px 10px",
                    fontSize: "15px",
                }}
            >Submit</button>
            
        </div>
        </>
    )
}

export default UploadDocs;
