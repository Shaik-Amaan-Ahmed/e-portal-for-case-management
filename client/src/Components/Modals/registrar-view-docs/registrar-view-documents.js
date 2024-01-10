import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import "./registrar-view-documents.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
function ViewDocuments(props) {
  const [data, setData] = useState([]);
  const [whichDoc, setWhichDoc] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    axios
      .get(
        `http://localhost:64000/casedetails/registrar-view-documents?id=` +
          props.id
      )
      .then((res) => {
        const petitionbase64String = res.data.petition;
        const petitionpdfUrl = `data:application/pdf;base64,${petitionbase64String}`;
        const aadharbase64String = res.data.aadhar;
        const aadharpdfUrl = `data:application/pdf;base64,${aadharbase64String}`;
        setData({ petition: petitionpdfUrl, aadhar: aadharpdfUrl });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.id]);

  const handleWhichDoc = (doc) => {
    setWhichDoc(doc);
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function nextPage() {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  }
  
  function prevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
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
        <div className="document-box">
          <div className="select-which-doc">
            <button
              className="which-doc"
              onClick={() => handleWhichDoc(data.petition)}
            >
              Petition
            </button>
            <button
              className="which-doc"
              onClick={() => handleWhichDoc(data.aadhar)}
            >
              Aadhar
            </button>
          </div>
          <div className="pdf-container">
            {whichDoc && (
              <Document file={whichDoc} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={currentPage} scale={1.8} />
              </Document>
            )}
          </div>
          <div className="pdf-pagination">
            <button onClick={prevPage} className={currentPage===1? "button-none": "button-prev"}>Previous Page</button>
            <button onClick={nextPage} className={currentPage===numPages-1 ?"button-none" :"button-next"}>Next Page</button>
          </div>
          
        </div>
      </Modal>
    </div>
  );
}

export default ViewDocuments;
