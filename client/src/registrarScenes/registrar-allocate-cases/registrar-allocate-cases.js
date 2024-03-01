import axios from "axios";
import Header from "../../Components/Header";
import "./registrar-allocate-cases.css";
import { useState, useEffect } from "react";
import ViewPetition from "../../Components/Modals/registrar-view-docs/registrar-view-petition";
import ViewAssign from "../../Components/Modals/registrar-assign-judge/registrar-assign-judge";
import { CircularProgress } from "@mui/material";
import { set } from "mongoose";

const AllocateCases = () => {
    const [data, setData] = useState([]); 
    const [searchinput, setSearchInput] = useState('');
    const [id,setId] = useState(null);
    const [category,setCategory] = useState("");
    const [viewDocOpen, setViewDocOpen] = useState(false);
    const [assignOpen, setAssignOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [reloadkey, setReloadKey] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleViewDocOpen = (id) => {
        setId(id);
        setViewDocOpen(!viewDocOpen);
      }

    const handleAssignOpen = (id, category) => {
        setId(id);
        setCategory(category);
        setAssignOpen(!assignOpen);
      
    }

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
      }
    
      const prevPage = () => {
        
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      }

    useEffect(() => {
        setData([]);
        setLoading(true);
        axios
            .get("http://localhost:64000/casedetails/registrar-allocation-of-cases?page=" + currentPage + "&limit=" + itemsPerPage + "&search=" + searchinput)
            .then((res) => {
                setData(res.data.data);
                setTotalCount(res.data.totalCount);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            })
    }, [currentPage, itemsPerPage,reloadkey, searchinput]);


    return (
        <div className="registrar-dash-main">
            <Header title="Allocate Cases" />
            <div className="search-table">
                <input type="text" placeholder="Search" className="search-input" onChange={(e) => (setSearchInput(e.target.value))} />
            </div>
            {loading && (<div className="loading"><CircularProgress style={{color:"white"}}/><h1>Loading...</h1></div>)}
            <div className="pagination-registrar">
                {currentPage > 1 && <button onClick={prevPage}>Previous</button>}
                {currentPage * itemsPerPage < totalCount && <button onClick={nextPage}>Next</button>}
            </div>
            <div className="registrar-main-inside">
                <table className="registrar-table">
                    <thead>
                        <tr key="1">
                            <th>Regn. Number</th>
                            <th>Case Category</th>
                            <th>Case SubCategory</th>
                            <th>Case Sensitivity</th>
                            <th>Petition</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                     {data.map((item) => {
                        return (
                            <tr key={item._id}>
                                <td className="special-td">{item.caseId}</td>
                                <td>{item.plaintDetails.caseCategory}</td>
                                <td>{item.plaintDetails.caseSubCategory}</td>
                                <td>{item.caseSensitivity}</td>
                                <td>
                                    <button className="view-btn" onClick={() => handleViewDocOpen(item.caseId)}>View Petition</button>
                                </td>
                                <td>
                                    <button className="view-btn" onClick={() => handleAssignOpen(item.caseId, item.plaintDetails.caseCategory)}>Assign</button>
                                </td>
                            </tr>
                        )
                     })}
                    </tbody>
                </table>
            </div>
            {viewDocOpen && <ViewPetition open={viewDocOpen} handleClose={handleViewDocOpen} id={id} />}
            {assignOpen && <ViewAssign open={assignOpen} handleClose={handleAssignOpen} id={id} caseCategory={category} reloadkey={reloadkey} setReloadKey={setReloadKey} />}
        </div>
    )
}

export default AllocateCases;