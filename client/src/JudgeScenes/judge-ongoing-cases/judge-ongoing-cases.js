import Header from "../../Components/Header";
import "./judge-ongoing-cases.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { EmailContext } from "../../hooks/emailContext";
import { Button } from "@mui/material";
import { CircularProgress } from "@mui/material";
import ViewDocs from "../../Components/Modals/active-cases/view-docs";
import ViewDetails from "../../Components/Modals/registrar-view-details/registrarViewDetails";
import ViewDocuments from "../../Components/Modals/registrar-view-docs/registrar-view-documents";

const OnGoingCases = () => {
  const [caseDetails, setCaseDetails] = useState([]);
  const [message, setMessage] = useState("");
  const [viewDocOpen, setViewDocOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [allDocsOpen, setAllDocsOpen] = useState(false);
  const [caseId, setCaseId] = useState(null);
  const email = useContext(EmailContext);
  const [reloadkey, setReloadKey] = useState(0);
  const [loading , setLoading] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchinput, setSearchInput] = useState('');

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "http://localhost:64000/casedetails/judge-active-case-details?email=" +
          email + "&page=" + currentPage + "&limit=" + itemsPerPage + "&search=" + searchinput
      )
      .then((res) => {
        if (res.status === 200) {
          setCaseDetails(res.data.data);
          setTotalCount(res.data.totalCount);
          setLoading(false);
        }
        if (res.status === 400) {
          setMessage("No data found");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      }).finally(() => {
        setLoading(false);
      });
  }, [email, reloadkey, currentPage, itemsPerPage, searchinput]);

    const handleOpen = (id) => { 
        setCaseId(id);
        setViewDocOpen(true);
    }

    const handleClose = () => setViewDocOpen(false);

    const handleDetailsOpen = (id) => {
        setCaseId(id);
        console.log(id);
        setDetailsOpen(true);
    }
    const handleDetailsClose = () => setDetailsOpen(false);

    const handleAllDocsOpen = (id) => {
        setCaseId(id);
        setAllDocsOpen(true);
    }
    const handleAllDocsClose = () => setAllDocsOpen(false);

  return (
    <div className="ongoing-main">
      <Header title="On Going Cases" />
      <div className="search-table">
          <input type="text" placeholder="Search" className="search-input" onChange={(e) => (setSearchInput(e.target.value))} />
      </div>
      {loading && <div className='loading'><CircularProgress style={{color:"white"}}/></div>}
      <div className="pagination-registrar">
        {currentPage > 1 && <button onClick={prevPage}>Previous</button>}
        {currentPage * itemsPerPage < totalCount && <button onClick={nextPage}>Next</button>}
      </div>
      <div className="ongoing-inside">
        <table>
          <thead>
            <tr>
              <td>Case Id</td>
              <td>Cause Title</td>
              <td>Regn Date</td>
              <td>Case Status</td>
              <td>View Details</td>
              <td>View Documents</td>
              <td>Pending Actions</td>
            </tr>
          </thead>
          <tbody>
            {caseDetails.map((item) => (
              <tr>
                <td>{item.caseId}</td>
                <td>
                  {item.plaintDetails.causeTitlePlaintiff} VS{" "}
                  {item.plaintDetails.causeTitleDefendant}
                </td>
                <td>{item.registrationDate}</td>
                <td>{item.status}</td>
                <td>
                  <button className="view-btn" onClick={() => handleDetailsOpen(item.caseId)}>View Details</button>
                </td>
                <td>
                  <button className="view-btn" onClick={() => handleAllDocsOpen(item.caseId)}>View Documents</button>
                </td>
                <td>
                  <Button
                    variant="contained"
                    color={
                      item.status.includes("pending for written statement")||
                      item.status.includes("pending for summons")
                        ? "grey"
                        : "success"
                    }
                    disabled={
                      item.status.includes("pending for written statement") ||
                      item.status.includes("pending for summons")
                        ? true
                        : false
                    }
                    onClick={() => handleOpen(item.caseId)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {viewDocOpen && ( <ViewDocs open={handleOpen} handleClose={handleClose} caseId={caseId}/>)}
      {detailsOpen && caseId!==null && (<ViewDetails open={detailsOpen} handleClose={handleDetailsClose} id={caseId}/>)}
      {allDocsOpen && (<ViewDocuments open={allDocsOpen} handleClose={handleAllDocsClose} id={caseId}/>)}
    </div>
  );
};

export default OnGoingCases;
