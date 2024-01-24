import { useState } from "react";
import data from "../../Data/people.json";
import "./mytable.css";

const MyTable = () => {
  const [records, setRecords] = useState(data);

  return (
    <div
      style={{
        width: "100%",
        margin: "auto",
        padding: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="table">
        <table>
          <thead style={{ backgroundColor: "orange" }}>
            <tr style={{ fontSize: "20px" }}>
              <th>CASE_ID</th>
              <th>PROSECUTION</th>
              <th>DEFENDANT</th>
              <th>STATUS</th>
              <th>COURT_NO</th>
              <th>JUDGE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, i) => (

               (i<13 && <tr key={i}>
                <td>{record.id}</td>
                <td>{record.Prosecution}</td>
                <td>{record.Defendant}</td>
                <td>{record.Status}</td>
                <td>{record.CourtNo}</td>
                <td>{record.Judge}</td>
              </tr>)
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTable;
