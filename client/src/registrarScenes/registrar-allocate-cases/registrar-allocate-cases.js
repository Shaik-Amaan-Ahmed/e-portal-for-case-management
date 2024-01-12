import axios from "axios";
import Header from "../../Components/Header";
import "./registrar-allocate-cases.css";
import { useState, useEffect } from "react";
import ViewPetition from "./registrar-view-petition";
import ViewAssign from "./registrar-assign-judge";

const AllocateCases = () => {
    const [data, setData] = useState([]); 
    const [searchinput, setSearchInput] = useState('');
    const [id,setId] = useState(null);
    const [category,setCategory] = useState("");
    const [viewDocOpen, setViewDocOpen] = useState(false);
    const [assignOpen, setAssignOpen] = useState(false);


    const handleViewDocOpen = (id) => {
        setId(id);
        setViewDocOpen(!viewDocOpen);
      }

    const handleAssignOpen = (id, category) => {
        setId(id);
        setCategory(category);
        setAssignOpen(!assignOpen);
      
    }

    useEffect(() => {
        setData([]);
        axios
            .get("http://localhost:64000/casedetails/registrar-allocation-of-cases")
            .then((res) => {
                setData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    function filterData(data) {
        if (searchinput === '' || !data || !data.plaintDetails) return true;
        return (
            data.plaintDetails.caseCategory.toLowerCase().includes(searchinput.toLowerCase()) ||
            data.plaintDetails.caseSubCategory.toLowerCase().includes(searchinput.toLowerCase()) ||
            data.caseSensitivity.toLowerCase().includes(searchinput.toLowerCase())
        )
    }

    return (
        <div className="registrar-dash-main">
            <Header title="Allocate Cases" />
            <div className="search-table">
                <input type="text" placeholder="Search" className="search-input" onChange={(e) => (setSearchInput(e.target.value))} />
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
                     {data.filter(item => filterData(item)).map((item) => {
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
            {assignOpen && <ViewAssign open={assignOpen} handleClose={handleAssignOpen} id={id} caseCategory={category} />}
        </div>
    )
}

export default AllocateCases;