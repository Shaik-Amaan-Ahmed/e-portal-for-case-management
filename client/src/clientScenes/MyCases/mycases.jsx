import { Typography } from "@mui/material";
import "./mycases.css";
import { EmailContext } from "../../hooks/emailContext";
import { useContext } from "react";

const CaseDetails = () => {
  const email = useContext(EmailContext);
  return (
    <div className="main-content">
      <div className="case-profile-img">
        <img
          className="profile-img"
          src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
          alt="profile"
        />
        <Typography variant="h5">User Name</Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0 0 0",
          }}
        >
          <Typography variant="h4" component="div" fontWeight="bold">
            CASE ID: G71
          </Typography>
        </div>
        <div>
          <progress
            value="50"
            max="100"
            style={{ width: "40vh", margin: "0 10px 0 10px" }}
          />
        </div>
      </div>
      <div className="case-profile-details">
        <div className="inner-case-profile-details">
          <Typography variant="h4" component="div">
            Case Details:{" "}
            <span style={{ color: "orange" }}>
                E-portal-for-case-management
            </span>
          </Typography>
          <br />
          <Typography variant="h4" component="div">
            Case Status: <span style={{ color: "green" }}>Active</span>
          </Typography>
          <br />
          <Typography variant="h4" component="div">
            <span>Next hearing Date: 11/12/2023</span>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;
