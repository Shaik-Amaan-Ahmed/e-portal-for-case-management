import { Email } from "@mui/icons-material";
import Header from "../../Components/Header";
import "./judge-view-cases.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { EmailContext } from "../../hooks/emailContext";

import ViewDetails from "../../Components/Modals/registrar-view-details/registrarViewDetails";
import ViewDocuments from "../../Components/Modals/registrar-view-docs/registrar-view-documents";
import JudgeApprove from "../../Components/Modals/judge-approve/judge-approve";

import { CircularProgress } from "@mui/material";
import JudgeDeny from "../../Components/Modals/judge-deny/judge-deny";


const JudgeViewCases = () => {
  const [caseDetails, setCaseDetails] = useState([]);
  const [message, setMessage] = useState("");
  const [viewDocOpen, setViewDocOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const email = useContext(EmailContext);
  const [isToggled, setToggled] = useState(false);
  const [approveOpen , setApproveOpen] = useState(false);
  const [reloadkey, setReloadKey] = useState(0);
  const [loading , setLoading] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "http://localhost:64000/casedetails/judge-review-case-details?email=" + email
      )
      .then((res) => {
        if (res.status === 200) {
          setCaseDetails(res.data.data);
          setLoading(false);
        }
        if (res.status === 400) {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      }).finally(() => {
        setLoading(false);
      });
  }, [email,reloadkey]);

  const handleOpen = (id) => {
    setId(id);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleViewDocOpen = (id) => {
    setId(id);
    setViewDocOpen(!viewDocOpen);
  };

  const handleViewDocClose = () => setViewDocOpen(false);

  const handleApproveOpen = (id) => { 
    setId(id);
    setApproveOpen(!approveOpen);
  }

  const handleApproveClose = () => setApproveOpen(false);
  const handleRejectOpen = (id) => {
    setId(id);
    setRejectOpen(!rejectOpen);
  }
  const handleRejectClose = () => setRejectOpen(false);

  return (
    <div className="judge-cases-main">
      <Header title="Active cases" />
    <div className="toggle">
      <div className="toggle-availability">
        <input
          type="checkbox"
          id="toggle"
          className="toggle-switch-checkbox"
          checked={isToggled}
          onChange={() => setToggled(!isToggled)}
        />
        <label className="toggle-switch-label" htmlFor="toggle">
          <span className="toggle-switch-inner" />
          <span className="toggle-switch-switch" />
        </label>
      </div>
      </div>
      {loading && <div className='loading'><CircularProgress style={{color:"white"}}/></div>}
      <div className="judge-main-inside">

        <table className="judge-table">
          <thead>
            <tr key="1">
              <th>Regn. Number</th>
              <th>Regn. Date</th>
              <th>Case sensitivity</th>
              <th>Cause Title</th>
              <th>Case Status</th>
              <th>View Details</th>
              <th>Uploaded Documents</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {caseDetails.length > 0 ? (
              caseDetails.map((item) => {
                return (
                  <tr key={item.caseId}>
                    <td>{item.caseId}</td>
                    <td>{item.registrationDate}</td>
                    <td
                      style={{
                        color:
                          item.caseSensitivity === "High"
                            ? "red"
                            : item.caseSensitivity === "Medium"
                            ? "orange"
                            : "green",
                      }}
                    >
                      {item.caseSensitivity}
                    </td>
                    <td>
                      {item.plaintDetails.causeTitlePlaintiff} vs{" "}
                      {item.plaintDetails.causeTitleDefendant}
                    </td>
                    <td>{item.status}</td>
                    <td>
                      <button
                        className="view-btn"
                        onClick={() => handleOpen(item.caseId)}
                      >
                        View Details
                      </button>
                    </td>
                    <td>
                      <button
                        className="view-btn"
                        onClick={() => handleViewDocOpen(item.caseId)}
                      >
                        View Docs
                      </button>
                    </td>
                    <td>
                      <div className="approve-deny">
                        <button className="approve-btn" onClick={()=> handleApproveOpen(item.caseId)}>Approve</button>
                        <button className="deny-btn" onClick={()=>handleRejectOpen(item.caseId)}>Dismiss</button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <h1>{message}</h1>
            )}
          </tbody>
        </table>
      </div>
      {viewDocOpen && (
        <ViewDocuments
          open={viewDocOpen}
          handleClose={handleViewDocClose}
          id={id}
        />
      )}
      {open && id !== null && (
        <ViewDetails
          open={open}
          handleClose={handleClose}
          id={id}
          setId={setId}
        />
      )}
      {approveOpen && <JudgeApprove open={approveOpen} handleClose={handleApproveClose} id={id}  setReloadKey={setReloadKey}/>}
      {rejectOpen && <JudgeDeny open={rejectOpen} handleClose={handleRejectClose} id={id}  setReloadKey={setReloadKey}/>}
    </div>
  );
};

export default JudgeViewCases;
