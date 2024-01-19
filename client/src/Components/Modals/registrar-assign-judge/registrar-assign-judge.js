import * as React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState, useEffect } from "react";
import "./registrar-assign-judge.css";

function ViewAssign(props) {
    const [data, setData] = useState([]);
    const [selectedJudges, setSelectedJudges] = useState([]);
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
        console.log(selectedJudges);
        const res = await axios.post(
            "http://localhost:64000/e-filing/registrar-assign-judge",
            { id: props.id, judgeNames: setSelectedJudges }
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
                <div className="assign-judge-container">
                    <div className="header">
                        <Typography variant="h3" >Assign the Judges below</Typography>
                    </div>
                    <div>
                        <select 
                            value={selectedJudges}
                            onChange={(e) => {
                                const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                                console.log(selectedOptions);
                                setSelectedJudges(selectedOptions);
                            }}
                            multiple={true}
                        >
                            {data.map((item) => (
                                <option className="select-option" value={item.name}>{item.name} - {item.cases.length}</option>
                            ))}
                        </select>
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