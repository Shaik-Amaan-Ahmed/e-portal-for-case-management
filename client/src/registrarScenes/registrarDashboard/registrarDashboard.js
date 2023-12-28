import "./registrarDashboard.css";
import Header from "../../Components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import { ViewAgenda } from "@mui/icons-material";

const RegistrarDashboard = () => {
  const [data, setData] = useState([]);
  const [viewDetails, setViewDetails] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:64000/casedetails/registrar-case-details")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="registrar-dash-main">
      <Header title="Cases" />
      <div className="registrar-main-inside">
        <table className="registrar-table">
          <thead>
            <tr id={1}>
              <th>Registration Number</th>
              <th>Cause Title</th>
              <th>View Details</th>
              <th>Uploaded Documents</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <tr id={item._id}>
                  <td>{item._id}</td>
                  <td>
                    {item.plaintDetails.causeTitlePlaintiff} VS{" "}
                    {item.plaintDetails.causeTitleDefendant}
                  </td>
                  <td>
                    <button className="view-btn" onClick={() => setViewDetails(!viewDetails)}>View Details</button>
                  </td>
                  <td>
                    <button className="view-btn">View Documents</button>
                  </td>

                  <td>
                    <div className="approve-deny">
                      <button className="view-btn">Approve</button>
                      <button className="view-btn">Reject</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {
        (viewDetails && (
            <h1>hello</h1>
        ))
      }
    </div>
  );
};

export default RegistrarDashboard;
