import Header from "../../Components/Header";
import "./judge-ongoing-cases.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { EmailContext } from "../../hooks/emailContext";
import { Button } from "@mui/material";
import ViewDocs from "../../Components/Modals/active-cases/view-docs";

const OnGoingCases = () => {
  const [caseDetails, setCaseDetails] = useState([]);
  const [message, setMessage] = useState("");
  const [viewDocOpen, setViewDocOpen] = useState(false);
  const [caseId, setCaseId] = useState(null);
  const email = useContext(EmailContext);

  useEffect(() => {
    axios
      .get(
        "http://localhost:64000/casedetails/judge-active-case-details?email=" +
          email
      )
      .then((res) => {
        if (res.status === 200) {
          setCaseDetails(res.data.data);
        }
        if (res.status === 400) {
          setMessage("No data found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [email]);

    const handleOpen = (id) => { 
        setCaseId(id);
        setViewDocOpen(true);
    }

    const handleClose = () => setViewDocOpen(false);

  return (
    <div className="ongoing-main">
      <Header title="On Going Cases" />
      <div className="ongoing-inside">
        <table>
          <thead>
            <tr>
              <td>Case Id</td>
              <td>Cause Title</td>
              <td>Regn Date</td>
              <td>Case Status</td>
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
      {viewDocOpen && ( <ViewDocs open={handleOpen} handleClose={handleClose}/>)}
    </div>
  );
};

export default OnGoingCases;
