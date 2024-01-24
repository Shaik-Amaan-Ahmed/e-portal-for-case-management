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

    useEffect(() => { 
        setLoading(true);
        axios.get("http://localhost:64000/casedetails/send-summons").then((res) => {
            if (res.status === 200) {
                setCaseDetails(res.data.data);
                setLoading(false);
            }
            if (res.status === 400) {
                setMessage("No data found");
                setLoading(false);
            }
        }).catch((err) => {
            console.log(err);

        });
    },[reloadkey]);

    const handleSummonOpen = (id) => { 
        setCaseId(id);
        setSummonOpen(true);
    }

  return (
    <div className="summons-main">
        <Header title={"Send Summons"} />
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
        {summonOpen && <SummonModal open={summonOpen} handleClose={() => setSummonOpen(false)} caseId={caseId} setReloadKey={setReloadKey}/> }
            
        </div>
        
    );
};

export default SendSummons;
