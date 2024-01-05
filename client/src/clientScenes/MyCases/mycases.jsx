import { Icon, IconButton, Typography } from "@mui/material";
import "./mycases.css";
import { EmailContext } from "../../hooks/emailContext";
import { useContext, useEffect } from "react";
import Header from "../../Components/Header";
import axios from "axios";
import { useState } from "react";
import NotificationsOutlined from "@mui/icons-material/NotificationsOutlined";
import ShowItem from "../../Components/Modals/notification-menu-client/notifications-menu";
import ErrorIcon from '@mui/icons-material/Error';

const CaseDetails = () => {
  const email = useContext(EmailContext);
  const [casedetails, setCaseDetails] = useState([]);
  const [notification, setNotification] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [totalItems, setTotalItems] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    axios
      .get(
        "http://localhost:64000/casedetails/client-case-details?email="+email+"&page="+currentPage+"&limit="+itemsPerPage+"&search="+searchInput
      )
      .then((res) => {
          setCaseDetails(res.data.data);
          setTotalItems(res.data.totalCount);
        
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [email, currentPage, itemsPerPage,searchInput]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="main-case">
      <div className="title">
        <Header title="Case Details" />
      </div>
      <div className="search-div">
        <input type="text" placeholder="Search" className="search-bar" onChange={(e) => setSearchInput(e.target.value)}/>
      </div>
      <div className="main-table">
      
      {
      casedetails.length > 0 ? (
        <table>
        <tr>
          <th>Registration No </th>
          <th>Cause Title</th>
          <th>Case Type</th>
          <th>Case Status</th>
          <th>Next Hearing Date</th>
        </tr>
        <tbody>
          {[...casedetails].reverse().map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>
                {item.plaintDetails.causeTitlePlaintiff} VS{" "}
                {item.plaintDetails.causeTitleDefendant}
              </td>
              <td>{item.plaintDetails.caseType}</td>
              <td style={{
                color: item.status === "Rejected" ? "red" : "lightblue"
              }}>{item.status}</td>
              <td>{item.plaintDetails.nextHearingDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      ): 

      (<div className="no-records">
        <ErrorIcon className="error-icon"/>
        <Typography variant="h5" color="red" fontSize="large" fontWeight="600">
          No Records Found
        </Typography>
      </div>
        )
    }
    
      </div>
      <div className="pagination-client-table">
       {currentPage > 1 && <button className="pagination-button" onClick={prevPage}>Previous</button> }
       {currentPage * itemsPerPage < totalItems && <button className="pagination-button" onClick={nextPage}>Next</button>}
      </div>
      <div className="notifications">
        <IconButton
          onClick={() => {
            setNotification(!notification);
          }}
        >
          <NotificationsOutlined className="noti-icon" />
        </IconButton>
      </div>
      {notification ? <ShowItem email={email}/> : null}
    </div>
  );
};

export default CaseDetails;
