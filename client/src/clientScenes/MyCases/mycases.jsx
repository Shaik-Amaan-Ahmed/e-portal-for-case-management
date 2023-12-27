import { Typography } from "@mui/material";
import "./mycases.css";
import { EmailContext } from "../../hooks/emailContext";
import { useContext } from "react";

const CaseDetails = () => {
  const email = useContext(EmailContext);
  return (
    <div className="main-case">
      hello
    </div>
  );
};

export default CaseDetails;
