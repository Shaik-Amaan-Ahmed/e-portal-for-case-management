import React, { useState } from 'react';
import "./uploadDocs.css";
import { Typography } from '@mui/material';
import { useEffect } from 'react'
import axios from 'axios';
const UploadDocs = (props) => {

    // const [error, seterror] = useState("");//to store error message
    const [petitionTitle, setPetitionTitle] = useState("")
    const [filePetition, setFilePetition] = useState("")
    const [aadharTitle, setAadharTitle] = useState("")
    const [fileAadhar, setFileAadhar] = useState("")
    //  //to store the url of the uploaded file
    // //to store selected petition and aadhar
    // const storedDocDetails = JSON.parse(localStorage.getItem('docDetails'));


    //setting initial values of petition and aadhar if stored in local storage else passing the object
    // const initialDetails = {
    //     petitionTitle: '',
    //     fileAadhar:'',
    //     aadharTitle: '',
    //     filePetition: '',

    // } 

    // const [uploadDocs, setUploadDocs] = useState(initialDetails);//to store petition and aadhar

    //petition file handler
    const petitionSelectedHandler = event => {
        setFilePetition(event.target.files[0]);
    };

    // aadhar file handler
    const aadharSelectedHandler = event => {
        setFileAadhar(event.target.files[0]);
    }

    //petition title handler
    const petitionTitleHandler = event => {
        // setUploadDocs({
        //     ...uploadDocs,
        //     petitionTitle: event.target.value,
        // })
        setPetitionTitle(event.target.value)
    }


    //aadhar title handler
    const aadharTitleHandler = event => {
        // setUploadDocs({
        //     ...uploadDocs,
        //     aadharTitle: event.target.value,
        // })
        setAadharTitle(event.target.value);
    }

    // //convert file to base64


    // //handle submit on click of submit button
    const handleSubmit = async (e) => {
        e.preventDefault();
        const petitionFile = new FormData();
        petitionFile.append('petition-file', filePetition);
        console.log(petitionTitle, filePetition);
        const aadharFile = new FormData();
        aadharFile.append('aadhar-file', fileAadhar);
        // console.log(aadharTitle,fileAadhar);

        const uploadDocs = {
            petitionTitle: petitionTitle,
            petitionFile: petitionFile,
            aadharTitle: aadharTitle,
            aadharFile: aadharFile,
        }

        const res = axios.post("http://localhost:64000/e-filing/upload", uploadDocs,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(res);

        console.log(uploadDocs);

        //     /* start of validation */
        //     if(!uploadDocs.petitionBase64 && !uploadDocs.aadharBase64) { 
        //         seterror("Please select both the files");
        //         return;
        //     }

        //     if(!uploadDocs.petitionBase64){ 
        //         seterror("Please upload petition");
        //         return;
        //     }

        //     if(!uploadDocs.aadharBase64) { 
        //         seterror("Please upload aadhar");
        //         return;
        //     }

        //     if(!uploadDocs.petitionTitle && !uploadDocs.aadharTitle){ 
        //         seterror("Please enter petition & aadhar title");
        //         return;
        //     }

        //     if(!uploadDocs.petitionTitle){ 
        //         seterror("Please enter petition title");
        //         return;
        //     }
        //     console.log(file11,file22);

        //     if(!uploadDocs.aadharTitle) { 
        //         seterror("Please enter aadhar title");
        //         return;
        //     }
        //     /* end of validation */
        // setUploadDocs({
        //     ...uploadDocs,
        //     petitionFile:filePetition,
        //     aadharFile: fileAadhar,
        // })

        // console.log(uploadDocs.petitionFile)
        // console.log(uploadDocs.aadharFile)

        // if(uploadDocs.petitionBase64.size > 200*1024) { 
        //     seterror("Petition size should be less than 200KB");
        //     return;
        // }

        // if(uploadDocs.aadharBase64.size > 200 *1024) { 
        //     seterror("Aadhar size should be less than 200KB");
        //     return;
        // }
        // //storing the uploaded documents in the local storage with key docDetails

        // localStorage.setItem('docDetails', JSON.stringify(uploadDocs));

        //calling handleNext function to move to next step
        // props.handleNext(props.activeStep + 1);
    }

    return (
        <>
            {/* {error && <span className="error-message">{error}</span>} */}
            <div className="main-doc">
                <Typography variant='h4'>Upload Docs</Typography>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    margin: "10px",
                }}>
                    <Typography style={{ color: "orange" }} variant='h5'>*File size should be less than 200kb</Typography>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    width: "100%",
                }}>


                    <div className='upload-div'>

                        <div className="doc-title">
                            <Typography style={{ display: "flex", marginRight: "20px" }} variant='h5'>Petition</Typography>
                        </div>
                        <div className='doc-input'>
                            <input type="text" className='docs-title' placeholder='Title' onChange={petitionTitleHandler} />
                            <input type="file" id="petition-file" accept='application/pdf' onChange={petitionSelectedHandler} placeholder='Select Files' style={{ display: 'none' }} required />
                            <label htmlFor="petition-file" className="custom-file-upload">Browse</label>
                        </div>
                        {/* <span style={{display:"flex",width:"100%"}}>{uploadDocs.petitionFileName}</span> */}
                    </div>

                    <div className='upload-div'>
                        <div className="doc-title">
                            <Typography style={{ display: "flex", marginRight: "20px" }} variant='h5'>Aadhar</Typography>
                        </div>
                        <div className='doc-input'>
                            <input type="text" className='docs-title' placeholder='Title' onChange={aadharTitleHandler} />
                            <input type="file" id="aadhar-file" accept='application/pdf' onChange={aadharSelectedHandler} placeholder='Select Files' style={{ display: 'none' }} />
                            <label htmlFor="aadhar-file" className="custom-file-upload">Browse</label>
                        </div>
                        {/* <span style={{display:"flex",width:"100%"}}>{uploadDocs.aadharFileName}</span> */}
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
                        margin: "10px 10px 10px 10px",
                        fontSize: "15px",
                    }}
                >Submit</button>

            </div>
        </>
    )
}

export default UploadDocs;
