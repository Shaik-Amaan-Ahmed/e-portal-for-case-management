import * as React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState, useEffect } from "react";
import "./registrar-assign-judge.css";

function ViewAssign(props) {
    const [data, setData] = useState([]);
    const [selectedJudge, setSelectedJudge] = useState("");
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
        // console.log(selectedJudge);
        const res = await axios.post(
            "http://localhost:64000/e-filing/registrar-assign-judge",
            { id: props.id, judgeName: selectedJudge }
        );
        if (res.status === 200) {
            setTimeout(() => {
                props.handleClose();
                window.location.reload();
            }, 1500)
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
                <div className="modal-box">
                    <div className="header">
                        <Typography variant="h3" >Assign the Judge below</Typography>
                    </div>
                    <div>
                        <select 
                            value={selectedJudge}
                            onChange={((e) => {setSelectedJudge(e.target.value)})}
                        >
                            <option value="" disabled selected>Select Judge</option>
                            {data.map((item) => (
                                <option value={item.name}>{item.name} - {item.cases.length}</option>
                            ))}
                        </select>
                    </div>
                    <div className="footer">
                        <button className="footer-btn" onClick={() => {handleAssign()}}>Assign</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ViewAssign;