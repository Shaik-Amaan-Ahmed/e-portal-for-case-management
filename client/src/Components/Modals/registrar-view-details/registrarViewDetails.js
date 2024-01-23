import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useState, useEffect } from "react";
import { CircularProgress, Typography } from "@mui/material";
import "./registrarViewDetails.css";


const Item = ({ title, value }) => { 
  return (
      <div className="item">
          <div className="item-title">
              <Typography variant="h5" sx={{fontWeight: "bold",display:"flex",justifyContent:"center",width:"100%"}}>{title}</Typography>
          </div>
          <div className="item-value">
              <Typography variant="h5" sx={{fontWeight:"500"}}>{value}</Typography>
          </div>        
      </div>
  )
}

const Title = ({title}) => {
  return (
    <div className="item-title">
          <Typography variant="h4" color="orange" sx={{fontWeight: "500"}}>{title}</Typography>   
    </div>
  )
}

function ViewDetails(props) {
  const [viewData, setViewData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show , setShow] = useState('plaintDetails');
  const [selectedButton, setSelectedButton] = useState(null);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "http://localhost:64000/casedetails/registrar-view-details?id=" + props.id
      )
      .then((res) => {
        setViewData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.id]);

  return (
    <div>
      <Modal
        keepMounted
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <div className="modal-boxs">
          {loading && (<><CircularProgress style={{color:"white"}}/></>)}
          {viewData.map((item) => {
            return (
              <div className="flex flex-col justify-center items-center w-full">
                <div className="flex flex-row"> 
                <button className={`flex flex-wrap m-10px p-10px rounded-md border-opacity-0 text-black text-sm font-medium bg-orange-500 ${selectedButton === 'plaintDetails' ? 'bg-gray-500' : 'hover:bg-gray-500'}`} onClick={() => {setShow('plaintDetails'); setSelectedButton('plaintDetails');}}>Plaint Details</button>
<button className={`flex flex-wrap m-10px p-10px rounded-md border-opacity-0 text-black text-sm font-medium bg-orange-500 ${selectedButton === 'plaintiffDetails' ? 'bg-gray-500' : 'hover:bg-gray-500'}`} onClick={() => {setShow('plaintiffDetails'); setSelectedButton('plaintiffDetails');}}>Plaintiff Details</button>
<button className={`flex flex-wrap m-10px p-10px rounded-md border-opacity-0 text-black text-sm font-medium bg-orange-500 ${selectedButton === 'defendantDetails' ? 'bg-gray-500' : 'hover:bg-gray-500'}`} onClick={() => {setShow('defendantDetails'); setSelectedButton('defendantDetails');}}>Defendant Details</button>
                </div>
                {show === 'plaintDetails' && (
                <>
                <Title title="Plaint Details" />
                <div className="flex flex-row w-full m-5 rounded-xl h-fit-content border-0.1 border-gray-500">
                  <div className="flex flex-column justify-center items-center p-10px">
                    <Item title="Cause Title" value={`${item.plaintDetails.causeTitlePlaintiff} VS ${item.plaintDetails.causeTitleDefendant}`}/>
                    <Item title="Case Category" value={item.plaintDetails.caseCategory} />
                    <Item title="Case SubCategory" value={item.plaintDetails.caseSubCategory} />
                  </div>
                  <div className="flex flex-column justify-center items-center flex-1 p-10px">
                    <Item title="Number of Plaintiffs" value={item.plaintDetails.numberOfPlaintiff} />
                    <Item title="Number of Defendants" value={item.plaintDetails.numberOfDefendants} />
                  </div>
                </div>
                </>
                )}
                {show === 'plaintiffDetails' && (
                <>
                <Title title="Plaintiff Details" />
                <div className="flex flex-row p-3 w-full m-5 rounded-xl h-fit-content border-0.1 border-gray-500">
                  <div className="flex flex-column justify-center items-center flex-1 p-10px">
                    <Item title="Plaintiff Type" value={item.plaintiffDetails.plaintiffType} />
                    <Item title="Main Plaintiff Name" value={item.plaintiffDetails.plaintiffName} />
                    <Item title="Plaintiff Relation" value={item.plaintiffDetails.plaintiffRelation} />
                    <Item title="Plaintiff Relation Name" value={item.plaintiffDetails.plaintiffParentSpouseName} />
                    <Item title="Plaintiff Dead/Minor" value={item.plaintiffDetails.plaintiffDeadMinor} />
                    <Item title="Plaintiff DOB" value={item.plaintiffDetails.plaintiffDOB} />
                    <Item title="Plaintiff Age" value={item.plaintiffDetails.plaintiffAge} />
                    <Item title="Plaintiff Gender" value={item.plaintiffDetails.plaintiffGender} />
                  </div>
                  <div className="flex flex-column justify-center items-center flex-1 p-10px">
                      <Item title="Plaintiff email" value={item.plaintiffDetails.plaintiffEmail}/>
                      <Item title="Plaintiff Phone" value={item.plaintiffDetails.plaintiffPhone}/>
                      <Item title="Plaintiff Address" value={item.plaintiffDetails.plaintiffAddress}/>
                      <Item title="Plaintiff City" value={item.plaintiffDetails.plaintiffCity}/>
                      <Item title="Plaintiff District" value={item.plaintiffDetails.plaintiffDistrict}/>
                      <Item title="Plaintiff State" value={item.plaintiffDetails.plaintiffState}/>
                      <Item title="Plaintiff Country" value={item.plaintiffDetails.plaintiffCountry}/>
                      <Item title="Plaintiff PinCode" value={item.plaintiffDetails.plaintiffPinCode}/>
                  </div>
                </div>
                </>
                )}
                {show === 'defendantDetails' && (
                  <>
                <Title title="Defendant Details" />
                <div className="flex flex-row p-3 w-full m-5 rounded-xl h-fit-content border-0.1 border-gray-500">
                  <div className="flex flex-column justify-center items-center flex-1 p-10px">
                    <Item title="Defendant Type" value={item.defendantDetails.defendantType} />
                    <Item title="Main Defendant Name" value={item.defendantDetails.defendantName} />
                    <Item title="Defendant Relation" value={item.defendantDetails.defendantRelation} />
                    <Item title="Defendant Relation Name" value={item.defendantDetails.defendantParentSpouseName} />
                    <Item title="Defendant Dead/Minor" value={item.defendantDetails.defendantDeadMinor} />
                    <Item title="Defendant DOB" value={item.defendantDetails.defendantDOB} />
                    <Item title="Defendant Age" value={item.defendantDetails.defendantAge} />
                    <Item title="Defendant Gender" value={item.defendantDetails.defendantGender} />
                  </div>
                  <div className="flex flex-column justify-center items-center flex-1 p-10px">
                    <Item title="Defendant email" value={item.defendantDetails.defendantEmail}/>
                    <Item title="Defendant Phone" value={item.defendantDetails.defendantPhone}/>
                    <Item title="Defendant Address" value={item.defendantDetails.defendantAddress}/>
                    <Item title="Defendant City" value={item.defendantDetails.defendantCity}/>
                    <Item title="Defendant District" value={item.defendantDetails.defendantDistrict}/>
                    <Item title="Defendant State" value={item.defendantDetails.defendantState}/>
                    <Item title="Defendant Country" value={item.defendantDetails.defendantCountry}/>
                    <Item title="Defendant PinCode" value={item.defendantDetails.defendantPinCode}/>
                  </div>
                </div> 
                </>
                )}
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
}

export default ViewDetails;
