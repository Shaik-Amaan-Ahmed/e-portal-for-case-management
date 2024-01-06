import React, { useContext, useState } from "react";
import axios from "axios";
import "./uploadDocs.css";
import { EmailContext } from "../../../hooks/emailContext";
import { Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const UploadDocs = (props) => {




  const [error, setError] = useState("");

  const email = useContext(EmailContext);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    props.setDocdetails((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  // const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     if (!docDetails.petition || !docDetails.aadhar) {
  //         setError('Please upload all documents');
  //         return;
  //     }

  //     // Check file sizes
  //     if (docDetails.petition.size > 200 * 1024) {
  //         setError('Petition size exceeds 200KB');
  //         return;
  //     }

  //     if (docDetails.aadhar.size > 200 * 1024) {
  //         setError('Aadhar size exceeds 200KB');
  //         return;
  //     }

  //     const formData = new FormData();
  //     formData.append('petition', docDetails.petition);
  //     formData.append('aadhar', docDetails.aadhar);
  //     formData.append('email', email);
  //     formData.append('caseId', caseId);

  //     try {
  //         await axios.post('http://localhost:64000/e-filing/upload-docs', formData, {
  //             headers: {
  //                 'Content-Type': 'multipart/form-data'
  //             }
  //         });
  //         props.handleNext(props.activeStep +1);

  //     }catch (error) {
  //         console.error('Error:', error);
  //     }

  // }

  return (
    <>
      {props.error && (
        <Typography
          variant="h4"
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "10px",
          }}
          color="red"
        >
          {props.error}
        </Typography>
      )}
      <div className="doc-container">
        <label
          style={{ fontSize: "large", fontWeight: "500", color: "orange" }}
        >
          Upload Documents
        </label>
        <form>
          <div className="doc-upload-file">
            <label for="petition">Petition</label>
            <input
              type="file"
              name="petition"
              onChange={handleFileChange}
              accept=".pdf"
            />
          </div>
          <div className="doc-upload-file">
            <label for="petition">Aadhar</label>
            <input
              type="file"
              name="aadhar"
              onChange={handleFileChange}
              accept=".pdf"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default UploadDocs;
