import * as React from "react";
import Modal from "@mui/material/Modal";
import "./registrar-view-petition.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import Header from "../../Components/Header";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
function ViewPetition(props) {
  const [data, setData] = useState([]);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    axios
      .get(
        `http://localhost:64000/casedetails/registrar-view-petition?id=` + props.id
      )
      .then((res) => {
        const petitionbase64String = res.data.petition;
        const petitionpdfUrl = `data:application/pdf;base64,${petitionbase64String}`;
        setData({ petition: petitionpdfUrl});
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.id]);



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
            <Header title="Petition"/>
          </div>
          <div className="pdf-container">
            <Document file={data.petition} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={currentPage} scale={1.8} />
            </Document>
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

export default ViewPetition;