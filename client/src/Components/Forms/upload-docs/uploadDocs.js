import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./uploadDocs.css";
import { EmailContext } from "../../../hooks/emailContext";
import { Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import { IconButton } from "@mui/material";

const UploadDocs = (props) => {
  const [error, setError] = useState("");

  const email = useContext(EmailContext);
  const [lastLength, setLastLength] = useState(0);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const fileExists = props.docDetails.some(doc => doc.name === name);
  
    if (fileExists) {
      props.setDocdetails(
        props.docDetails.map((doc) =>
          doc.name === name ? { name: name, file: files[0] } : doc
        )
      );
    } else {
      props.setDocdetails([...props.docDetails, { name: name, file: files[0] }]);
    }
  };

  const handleAddFile = () => {
    props.setAdditionalFiles([
      ...props.additionalFiles,
      { name: "", file: null },
    ]);
  };

  const handleDeleteFile = (fileNameToDelete) => {
    props.setDocdetails(props.docDetails.filter(file => file.name !== fileNameToDelete));
    props.setAdditionalFiles(props.additionalFiles.filter(file => file.name !== fileNameToDelete));
  };

  useEffect(() => {
    console.log(props.docDetails);
  }, [props.docDetails]);

  function addFile() {
    const newFiles = props.additionalFiles.slice(lastLength);
    props.setDocdetails([...props.docDetails, ...newFiles]);
    setLastLength(props.additionalFiles.length);
  }

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
        <form className="form-outside">
          <div className="doc-upload-file">
            <div className="for-label">
              <label for="petition">Plaint</label>
            </div>
            <div className="for-input">
              <input
                type="file"
                name="petition"
                onChange={handleFileChange}
                accept=".pdf"
              />
            </div>
          </div>
          <div className="doc-upload-file">
            <div className="for-label">
              <label for="petition">Aadhar</label>
            </div>
            <div className="for-input">
              <input
                type="file"
                name="aadhar"
                onChange={handleFileChange}
                accept=".pdf"
              />
            </div>
          </div>
          <div className="doc-upload-file">
            <div className="for-label">
              <label for="vakalatnama">Vakalatnama</label>
            </div>
            <div className="for-input">
              <input
                type="file"
                name="vakalatnama"
                onChange={handleFileChange}
                accept=".pdf"
              />
            </div>
          </div>
          {props.additionalFiles.map((file, index) => (
            <div key={index} className="doc-new-add">
              <div className="for-label">
                <input
                  type="text"
                  placeholder="File name"
                  className="doc-title-field"
                  value={file.name}
                  onChange={(e) => {
                    const newName = e.target.value;
                    props.setAdditionalFiles(
                      props.additionalFiles.map((file, i) =>
                        i === index ? { ...file, name: newName } : file
                      )
                    );
                  }}
                />
              </div>
              <div className="for-input">
                <input
                  type="file"
                  name={file.name}
                  onChange={(e) => {
                    const newFile = e.target.files[0];
                    props.setAdditionalFiles(
                      props.additionalFiles.map((file, i) =>
                        i === index ? { ...file, file: newFile } : file
                      )
                    );
                  }}
                  accept=".pdf"
                />
                <IconButton onClick={addFile}>
                  <CheckCircleIcon
                    style={{ color: "green" }}
                  />
                </IconButton>
                <IconButton onClick={() => {
                      handleDeleteFile(file.name);
                    }}>
                  <DeleteRounded
                    style={{ color: "red" }}
                  />
                </IconButton>
              </div>
            </div>
          ))}
        </form>
        <div>
          <button
            className="submit"
            style={{ padding: "10px", display: "flex", color: "whitesmoke" }}
            onClick={handleAddFile}
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default UploadDocs;
