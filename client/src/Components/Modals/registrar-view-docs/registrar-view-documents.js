import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./registrar-view-documents.css";
import axios from "axios";
import { useState, useEffect } from "react";
import {Icon, Modal} from "@mui/material";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import { IconButton } from "@mui/material";
import { CloseRounded} from "@mui/icons-material";
import { Card, CardContent} from '@mui/material';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const OtherDocuments = (props) => { 
  const [numPages, setNumPages] = useState(null);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(null);

  function onDocumentLoadSuccess({ numPages }) { 
    setNumPages(numPages);
  }
  const handleCardOpen = (docUrl) => { 
    setOpen(true);
    setUrl(docUrl);
  }

  const handleCardClose = () => { 
    setOpen(false);
  }

return (
  <div className="other-docs-outside">
  {props.data.map((doc, index) => (
    <Card key={index} className="card-outside">
      <CardContent>
        <iframe src={doc.url} style={{display:"flex"}}/>
        <Typography variant="h4">
          {doc.filename}
        </Typography>
        <button onClick={() => handleCardOpen(doc.url)} className="submit">View</button>
      </CardContent>
    </Card>
    
  ))}
  <div className="modal-main">
  <Modal  open={open} onClose={handleCardClose}>
    <div className="doc-modal">
      <IconButton onClick={handleCardClose} className="close-button">
      <CloseRounded style={{color:"white"}}/>
    </IconButton>
    <iframe
        src={url}
        style={{display:"flex",width:"100%",
        height:"100%"}}
        type="application/pdf" />
      </div>
  </Modal>
  </div>


</div>
)
}

function ViewDocuments(props) {
  const [data, setData] = useState([]);
  const [whichDoc, setWhichDoc] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [otherDocs, setOtherDocs] = useState(false);
  useEffect(() => {
    axios
      .get(
        `http://localhost:64000/casedetails/registrar-view-documents?id=` +
          props.id
      )
      .then(res => {
        const petitionbase64String = res.data.petition.fileData;
        const petitionpdfUrl = `data:application/pdf;base64,${petitionbase64String}`;
        const aadharbase64String = res.data.aadhar.fileData;
        const aadharpdfUrl = `data:application/pdf;base64,${aadharbase64String}`;
        const vakalatnamabase64String = res.data.vakalatnama.fileData;
        const vakalatnamapdfUrl = `data:application/pdf;base64,${vakalatnamabase64String}`;
        const otherspdfUrls = res.data.others.map(doc => ({
          filename: doc.filename,
          url: `data:application/pdf;base64,${doc.fileData}`
        }));
        setData({ petition: petitionpdfUrl, aadhar: aadharpdfUrl, vakalatnama: vakalatnamapdfUrl,others: otherspdfUrls });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.id]);

  const handleWhichDoc = (doc) => {
    setWhichDoc(doc);
    setOtherDocs(false);
  };

  useEffect(() => { 
    console.log(data);
  }, [data]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleOthers = () => { 
    setOtherDocs(true)
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
        <IconButton
            size="small"
            style={{
              position: "absolute",
              right: "1%",
              top: "2%",
              color: "white",
              background:"red",
              borderRadius:"50%",
              alignItems:"center",
            }}
            onClick={props.handleClose}
          >
            <CloseRounded />
          </IconButton>
          <div className="select-which-doc">
            <button
              className="which-doc"
              onClick={() => handleWhichDoc(data.petition)}
            >
              Plaint
            </button>
            <button
              className="which-doc"
              onClick={() => handleWhichDoc(data.aadhar)}
            >
              Aadhar
            </button>
            <button
              className="which-doc"
              onClick={() => handleWhichDoc(data.vakalatnama)}
            >
              Vakalatnama
            </button>
            <button
              className="which-doc"
              onClick={handleOthers}
            >
              Other Documents
            </button>
          </div>
          <div className={`pdf-container ${otherDocs ? 'grid-layout': ''}`}>
            {whichDoc && otherDocs!=true &&(
              // <Document file={whichDoc} onLoadSuccess={onDocumentLoadSuccess}>
              //   <Page pageNumber={currentPage} scale={1.8} />
              // </Document>
            <div style={{width:"100%", height:"100%", display:"flex",justifyContent:"center"}}>
              <iframe
                src={whichDoc}
                style={{display:"flex",width:"100%",
                height:"100%"}}
                type="application/pdf" />
            </div>
            )}
            {otherDocs && (
              <OtherDocuments data={data.others}/>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ViewDocuments;
