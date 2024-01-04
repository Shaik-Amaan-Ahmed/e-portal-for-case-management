import "./registrarDashboard.css";
import Header from "../../Components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import ViewDetails from "../../Components/Modals/registrarViewDetails";
import ViewDocuments from "../../Components/Modals/registrar-view-documents";

const RegistrarDashboard = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [viewDocOpen , setViewDocOpen] = useState(false);
  const [searchinput , setSearchInput] = useState('');
  const handleOpen = (id) => {
    setId(id);
    setOpen(true);

  }
  const handleClose = () => setOpen(false);

  const handleViewDocOpen = (id) => {
    setId(id);
    setViewDocOpen(!viewDocOpen);
  }
  const handleOpenRejectModal = () => {
    
  }

  const handleViewDocClose = () => setViewDocOpen(false);

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

  function filterData(item) { 

    if(searchinput === '' || !item || !item.plaintDetails) return true;
    else{  
    return item.plaintDetails.causeTitlePlaintiff.toLowerCase().includes(searchinput.toLowerCase()) || item.plaintDetails.causeTitleDefendant.toLowerCase().includes(searchinput.toLowerCase());
    }
  }

  return (
    <div className="registrar-dash-main">
      <Header title="Waiting for Approval Cases" />
      <div className="search-table">
        <input type="text" placeholder="Search" className="search-input" onChange={(e) => {setSearchInput(e.target.value)}}/>
      </div>
      <div className="registrar-main-inside">
        <table className="registrar-table">
          <thead>
            <tr key="1">
              <th>Registration Number</th>
              <th>Cause Title</th>
              <th>View Details</th>
              <th>Uploaded Documents</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.filter(item => filterData(item)).map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.caseId}</td>
                  <td>
                    {item.plaintDetails.causeTitlePlaintiff} VS{" "}
                    {item.plaintDetails.causeTitleDefendant}
                  </td>
                  <td>
                    <button className="view-btn" onClick={() => handleOpen(item._id)} >View Details</button>
                  </td>
                  <td>
                    <button className="view-btn" onClick={() => handleViewDocOpen(item._id)}>View Documents</button>
                  </td>
                  <td>
                    <div className="approve-deny">
                      <button className="approve-btn">Approve</button>
                      <button className="deny-btn" onClick={handleOpenRejectModal()}>Reject</button>
                    </div>
                  </td>
                </tr>
              );
            })}

          </tbody>
        </table>
      </div>
      {viewDocOpen && <ViewDocuments open={viewDocOpen} handleClose={handleViewDocClose} id={id}/>}
    {open && id!==null && <ViewDetails open={open} handleClose={handleClose} id={id} setId={setId}/>}      
    </div>
  );
};

export default RegistrarDashboard;
