import React, { useState } from 'react';
import "./uploadDocs.css";
import { Typography } from '@mui/material';
import { useEffect } from 'react'

const UploadDocs = (props) => {

    const [error, seterror] = useState("");//to store error message
     //to store the url of the uploaded file
    //to store selected petition and aadhar
    const storedDocDetails = JSON.parse(localStorage.getItem('docDetails'));
    const [titles, setTitles] = useState({
        petitionTitle: '',
        aadharTitle: '',
    })
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedFile2, setSelectedFile2] = useState();

    //handle upload
    const handleFileChange = (event) =>{
        setSelectedFiles(Array.from(event.target.files));

    }

    const handleFileChange2 = (event) => {
        setSelectedFile2(event.target.files[0]);
      };
    
    //handle petition title
    const petitionTitleHandler = (event) => { 
        setTitles({...titles, petitionTitle: event.target.value});
    }

    //handle aadhar title
    const aadharTitleHandler = (event) => { 
        setTitles({...titles, aadharTitle: event.target.value});
    }

    const handleUpload = async () => {
        const formData = new FormData();
        selectedFiles.forEach((file, index) => {
          formData.append(`file${index}`, file);
        });

        if(!titles.petitionTitle && !titles.aadharTitle){ 
            seterror("Please enter petition & aadhar title");
            return;
        }

        if(!titles.petitionTitle){ 
            seterror("Please enter petition title");
            return;
        }

        if(!titles.aadharTitle) { 
            seterror("Please enter aadhar title");
            return;
        }

       if(!selectedFiles[0]) { 
            seterror("Please upload petition");
            return;
       }
    
        const fileDetails = selectedFiles.map(file => ({
            name: file.name,
            size: file.size,
            type: file.type,
            title: titles.petitionTitle,
          }));

          if(!selectedFile2) { 
            seterror("Please upload aadhar");
            return;
          }

          if (selectedFile2) {
            fileDetails.push({
                name: selectedFile2.name,
                size: selectedFile2.size,
                type: selectedFile2.type,
                title: titles.aadharTitle,
              });
          }

        localStorage.setItem('docDetails', JSON.stringify(fileDetails));
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
                <div className='doc-input'>
                <Typography style={{display:"flex",marginRight:"10px"}} variant='h5'>Petition</Typography>
                    <input type="text" className='docs-title' placeholder='Petition Title' onChange={petitionTitleHandler} />
                    <input type="file" id="petition-file"  onChange={handleFileChange} placeholder='Select Files' />
                </div>
                
            </div>
            <div className='upload-div'>
                <div className='doc-input'>
                <Typography style={{display:"flex",marginRight:"20px"}} variant='h5'>Aadhar</Typography>
                    <input type="text" className='docs-title' placeholder='Aadhar Title' onChange={aadharTitleHandler} />
                    <input type="file" id="petition-file" onChange={handleFileChange2} placeholder='Select Files' />
                    
                </div>
                
            </div>
            <button className='upload' onClick={handleUpload}>Upload</button>
            {/* <div className='upload-div'>
                <div className="doc-title">
                    <Typography style={{display:"flex",marginRight:"20px"}} variant='h5'>Aadhar</Typography>
                </div>
                <div className='doc-input'>
                    <input type="text" className='docs-title' placeholder='Title' onChange={aadharTitleHandler} value={uploadDocs.aadharTitle}/>
                    <input type="file" id="aadhar-file" onChange={aadharSelectedHandler} placeholder='Select Files' style={{display: 'none'}} />
                    <label htmlFor="aadhar-file" className="custom-file-upload">Browse</label>
                </div>
                <span style={{display:"flex",width:"100%"}}>{uploadDocs.aadharFileName}</span>
            </div> */}
            </div>
            {/* <button onClick={handleSubmit} 
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
            >Submit</button> */}
            
        </div>
        </>
    )
}

export default UploadDocs;
