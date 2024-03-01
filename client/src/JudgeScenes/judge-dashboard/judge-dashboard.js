import { Typography } from "@mui/material";
import Header from "../../Components/Header";
import "./judge-dashboard.css";
import { useState,useEffect , useContext,useRef} from "react";
import axios from "axios";
import { EmailContext } from "../../hooks/emailContext";
import { useIdleTimer } from 'react-idle-timer';

const Item = ({title, value}) => { 
    return (
    <div>
    <Typography variant="h5" style={{
        fontWeight:"600",
        fontSize:"20px",
        display:"flex",
        justifyContent:"center",
        fontFamily:"Arial",
    }} color="black">{title}</Typography>
      <Typography variant="h5" style={{
        fontWeight:"600",
        fontSize:"40px",
        display:"flex",
        justifyContent:"center",

    }} color="black">{value}</Typography>
    </div>
    )
}

const JudgeDashboard = () => { 

    const [details, setDetails] = useState([]);
    const email = useContext(EmailContext);

    useEffect(() => { 
        axios.get("http://localhost:64000/data-sender/judge-dash-details?email="+email).then((res) => { 
            setDetails(res.data.data);
        }).catch((err) => {
            console.log(err);
        })
    },[email])

    return (
        <div className="judge-dash-main">
            <div>
                <Header title="Dashboard" />
            </div>
            <div className="grid-container">
                <div className="grid-item"
                    style={{backgroundColor:"#77dd77"}}
                >
                <Item title="Total Cases" value={details.totalCases} />
                </div>
                <div className="grid-item"
                    style={{backgroundColor:"orange"}}
                >
                <Item title="Active Cases" value={details.activeCases} />
                    
                </div>
                <div className="grid-item"
                    style={{backgroundColor:"yellow"}}
                >
                <Item title="Review Cases" value={details.reviewCases} />
                </div>
                <div className="grid-item"
                    style={{backgroundColor:"red"}}
                >
                    <Typography variant="h5" style={{ fontWeight:"600"}} color="black">Rejected Cases</Typography>
                </div>
            </div>
        </div>
    )
}

export default JudgeDashboard;