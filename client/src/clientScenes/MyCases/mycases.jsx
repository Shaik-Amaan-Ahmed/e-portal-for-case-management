import { Icon, IconButton, Typography } from "@mui/material";
import "./mycases.css";
import { EmailContext } from "../../hooks/emailContext";
import { useContext, useEffect } from "react";
import Header from "../../Components/Header";
import axios from "axios";
import { useState } from "react";
import NotificationsOutlined from "@mui/icons-material/NotificationsOutlined";
import ShowItem from "../../Components/Modals/notification-menu-client/notifications-menu"
import ErrorIcon from '@mui/icons-material/Error';
import { CircularProgress } from "@mui/material";

const CaseDetails = () => {
  const email = useContext(EmailContext);
  const [casedetails, setCaseDetails] = useState([]);
  const [notification, setNotification] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [reloadkey, setReloadKey] = useState(0);
  const [loading , setLoading] = useState(false);
  
  const statusColors = {
    "Rejected" : "red",
    "Pending for hearing": "orange",
    "Pending for approval by court": "orange",
    "Pending at court for approval" : "#318CE7",
    "Pending for allocation of judge" : "#32cd32",
    'Pending for review by judge' : "pink",
    "Approved by judge and pending for summons" : "#32CD32",
    "Defendant has submitted the written statement and pending for review by judge": "#83f28f",
    "Summoned the defendant and pending for written statement": "#008631"
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "http://localhost:64000/casedetails/client-case-details?email="+email+"&page="+currentPage+"&limit="+itemsPerPage+"&search="+searchInput
      )
      .then((res) => {
          setCaseDetails(res.data.data);
          setTotalItems(res.data.totalCount);
          setLoading(false);
        
      })
      .catch((err) => {
        console.log(err.message);
      }).finally(() => { 
        setLoading(false);
      });
  }, [email, currentPage, itemsPerPage,searchInput, reloadkey]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNotifications = () => { 
    setNotification(!notification);
  }

  return (
    <div className="main-case">
      <div className="title">
        <Header title="Case Details" />
      </div>
      {casedetails.length> 0 && (<div className="search-div">
        <input type="text" placeholder="Search" className="search-bar" onChange={(e) => setSearchInput(e.target.value)}/>
      </div>)}
      {loading && <div className='loading' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}><CircularProgress style={{color:"white"}}/></div>}
      <div className="pagination-client-table">
       {currentPage > 1 && <button className="pagination-button" onClick={prevPage}>Previous</button> }
       {currentPage * itemsPerPage < totalItems && <button className="pagination-button" onClick={nextPage}>Next</button>}
      </div>
      <div className="main-table">
      
      {
      casedetails.length > 0 ? (
        <table className="client-table">
        <tr>
          <th>Registration No </th>
          <th>Regn Date</th>
          <th>Cause Title</th>
          <th>Case Category</th>
          <th>Case Status</th>
          <th>Next Hearing Date</th>
        </tr>
        <tbody>
          {[...casedetails].map((item) => (
            <tr key={item._id}>
              <td className="case-id">{item.caseId}</td>
              <td>{item.registrationDate}</td>
              <td className="case-id">
                {item.plaintDetails.causeTitlePlaintiff} VS{" "}
                {item.plaintDetails.causeTitleDefendant}
              </td>
              <td>{item.plaintDetails.caseCategory}</td>
              <td style={{
                  color: statusColors[item.status],whiteSpace:"nowrap"
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
      <div className="notifications">
        <IconButton
          onClick={() => {
            setNotification(!notification);
          }}
        >
          <NotificationsOutlined className="noti-icon" />
        </IconButton>
      </div>
      {notification && <ShowItem email={email} open={notification} handleClose={handleNotifications}/>}
    </div>
  );
};

export default CaseDetails;
