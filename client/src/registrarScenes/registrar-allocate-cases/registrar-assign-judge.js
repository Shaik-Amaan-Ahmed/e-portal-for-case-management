import * as React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState, useEffect } from "react";
import "./registrar-assign-judge.css";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
function ViewAssign(props) {
    const [data, setData] = useState([]);
    const [selectedJudge, setSelectedJudge] = useState("");
    const [loading1, setLoading1] = useState(false);
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
        setLoading1(true);
        const res = await axios.post(
            "http://localhost:64000/e-filing/registrar-assign-judge",
            { id: props.id, judgeName: selectedJudge }
        );
        if (res.status === 200) {
            setLoading1(false);
            setTimeout(() => {
                props.handleClose();
                window.location.reload();
            }, 1500)
            toast.success("Case Assigned Successfully");
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
                <div className="modal-box1">
                    {loading1 && <CircularProgress style={{ color: "White" }} />}
                    <div className="header">
                        <Typography variant="h3" >Assign the Judge below</Typography>
                    </div>
                    <div className="select-area">
                        <select 
                            className="select-btn1"
                            value={selectedJudge}
                            onChange={((e) => {setSelectedJudge(e.target.value)})}
                        >
                            <option className="option-btn" value="" disabled selected>Select Judge</option>
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