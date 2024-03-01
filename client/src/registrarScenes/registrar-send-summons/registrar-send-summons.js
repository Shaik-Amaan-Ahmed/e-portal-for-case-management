import React from "react";
import "./registrar-send-summons.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import Header from "../../Components/Header";
import {Button} from "@mui/material";
import SummonModal from "../../Components/Modals/summons/summons-modal";

const SendSummons = () => {

    const [caseDetails, setCaseDetails] = useState([]);
    const [message, setMessage] = useState("");
    const [loading , setLoading] = useState(false);
    const [summonOpen, setSummonOpen] = useState(false);
    const [caseId, setCaseId] = useState("");
    const [reloadkey, setReloadKey] = useState(0);
    const [searchinput, setSearchInput] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalCount, setTotalCount] = useState(0);

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
          .get("http://localhost:64000/casedetails/send-summons?page=" + currentPage + "&limit=" + itemsPerPage + "&search=" + searchinput)
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
        }).catch((err) => {
            console.log(err);
            setLoading(false);

        });
    },[currentPage, itemsPerPage, reloadkey, searchinput]);

    const handleSummonOpen = (id) => { 
        setCaseId(id);
        setSummonOpen(true);
    }

  return (
    <div className="summons-main">
        <Header title={"Send Summons"} />
        <div className="search-table">
          <input type="text" placeholder="Search" className="search-input" onChange={(e) => { setSearchInput(e.target.value) }} />
        </div>
        {loading && (<div className="loading"><CircularProgress style={{color:"white"}}/><h1>Loading...</h1></div>)}
        <div className="pagination-registrar">
          {currentPage > 1 && <button onClick={prevPage}>Previous</button>}
          {currentPage * itemsPerPage < totalCount && <button onClick={nextPage}>Next</button>}
        </div>
        <div className="summons-inside"> 
          <table className="summons-table"> 
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Regn Date</th>
                <th>Judge Assigned</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                  <CircularProgress />
                
              ) : (
                caseDetails.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.caseId}</td>
                      <td>{item.registrationDate}</td>
                      <td>{item.judgeAssigned}</td>
                      <td>{item.status}</td>
                      <td><Button color="success" variant="contained" onClick={() => handleSummonOpen(item.caseId)}>Generate</Button></td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          </div>
        {summonOpen && <SummonModal open={summonOpen} handleClose={() => setSummonOpen(false)} caseId={caseId} reloadkey={reloadkey} setReloadKey={setReloadKey}/> }
            
        </div>
        
    );
};

export default SendSummons;
