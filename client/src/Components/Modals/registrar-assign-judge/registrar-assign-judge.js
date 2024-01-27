import * as React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState, useEffect } from "react";
import "./registrar-assign-judge.css";
import { CircularProgress } from "@mui/material";

function ViewAssign(props) {
    const [data, setData] = useState([]);
    const [selectedJudges, setSelectedJudges] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
  
    useEffect(() => {
    axios
        .get(
            `http://localhost:64000/casedetails/registrar-view-judges`,
            {
                params: {
                    caseCategory: props.caseCategory
                }
            }
        )
        .then((res) => {
            // console.log(res.data.data);
            setData(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [props.caseCategory]);

    const handleAssign = async () => {
        const judges=selectedJudges.join(",");
        console.log(judges);
        try {
            setLoading(true);
            const res = await axios.post(
                "http://localhost:64000/e-filing/registrar-assign-judge",
                { id: props.id, judgeNames: judges},
            );
            if (res.status === 200) {
                setTimeout(() => {
                    setMessage("");
                    props.handleClose();
                }, 1500)
                setMessage("Judges Assigned Successfully")
                window.location.reload();
                setLoading(false);
            }
        } catch (err) {
            setMessage(err.response.data.message)
            setLoading(false);
        }
    }

    return(
        <div>
            <Modal
                keepMounted
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <div className="assign-judge-container">
                    <div className="header">
                        {loading && (<CircularProgress style={{color:"white"}}/>)}
                        {message && (<h1 style={{color:"green",marginBottom:"10px"}}>{message}</h1>)}
                        <Typography variant="h3" >Assign the Judges below</Typography>
                    </div>
                    <div>
                        
                        {data.map((item) => (
                            <div key={item.name}>
                                <input 
                                    type="checkbox" 
                                    value={item.name} 
                                    checked={selectedJudges.includes(item.name)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedJudges(prev => [...prev, e.target.value]);
                                        } else {
                                            setSelectedJudges(prev => prev.filter(judge => judge !== e.target.value));
                                        }
                                    }}
                                />
                                <label>{item.name} - {item.cases.length}</label>
                            </div>
                        ))}
                       
                    </div>
                    <div className="assign-btn">
                        <button className="footer-btn" onClick={() => {handleAssign()}}>Assign</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ViewAssign;