import "./registrarDashboard.css";
import Header from "../../Components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import ViewDetails from "../../Components/Modals/registrar-view-detials/registrarViewDetails";
import ViewDocuments from "../../Components/Modals/registrar-view-docs/registrar-view-documents";
import Approve from "../../Components/Modals/registrar-approve/registrar-approve";
import RegistrarDeny from "../../Components/Modals/registrar-deny/registrar-deny";

const RegistrarDashboard = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [viewDocOpen, setViewDocOpen] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);
  const [denyOpen, setDenyOpen] = useState(false);
  const [docData, setDocData] = useState(false);
  const [searchinput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const handleOpen = (id) => {
    setId(id);
    setOpen(true);

  }
  const handleClose = () => setOpen(false);

  const handleViewDocOpen = (id) => {
    setId(id);
    setViewDocOpen(!viewDocOpen);
  }

  const handleViewDocClose = () => setViewDocOpen(false);

  const handleApproveOpen = (id) => {
    setId(id);
    setApproveOpen(!approveOpen);
  }

  const handleDenyOpen = (id) => {
    setId(id);
    setDenyOpen(!denyOpen);
  }

  const handleApproveClose = () => setApproveOpen(false);
  const handleDenyClose = () => setDenyOpen(false);


  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  useEffect(() => {
    axios
      .get("http://localhost:64000/casedetails/registrar-case-details?page=" + currentPage + "&limit=" + itemsPerPage)
      .then((res) => {
        setData(res.data.data);
        setTotalCount(res.data.totalCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage, itemsPerPage]);

  function filterData(item) {

    if (searchinput === '' || !item || !item.plaintDetails) return true;
    else {
      return item.plaintDetails.causeTitlePlaintiff.toLowerCase().includes(searchinput.toLowerCase()) || item.plaintDetails.causeTitleDefendant.toLowerCase().includes(searchinput.toLowerCase());
    }
  }

  return (
    <div className="registrar-dash-main">
      <Header title="Waiting for Approval Cases" />
      <div className="search-table">
        <input type="text" placeholder="Search" className="search-input" onChange={(e) => { setSearchInput(e.target.value) }} />
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
                    <button className="view-btn" onClick={() => handleOpen(item.caseId)} >View Details</button>
                  </td>
                  <td>
                    <button className="view-btn" onClick={() => handleViewDocOpen(item.caseId)}>View Documents</button>
                  </td>
                  <td>
                    <div className="approve-deny">
                      <button className="approve-btn" onClick={() => handleApproveOpen(item.caseId)}>Approve</button>
                      <button className="deny-btn" onClick={() => handleDenyOpen(item.caseId)}>Reject</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination-registrar">
        {currentPage > 1 && <button onClick={prevPage}>Previous</button>}
        {currentPage * itemsPerPage < totalCount && <button onClick={nextPage}>Next</button>}
      </div>
      {denyOpen && <RegistrarDeny open={denyOpen} handleClose={handleDenyClose} id={id} />}
      {approveOpen && <Approve open={approveOpen} handleClose={handleApproveClose} id={id} />} 
      {viewDocOpen && <ViewDocuments open={viewDocOpen} handleClose={handleViewDocClose} id={id} />}
      {open && id !== null && <ViewDetails open={open} handleClose={handleClose} id={id} setId={setId} />}


    </div>
  );
};

export default RegistrarDashboard;
