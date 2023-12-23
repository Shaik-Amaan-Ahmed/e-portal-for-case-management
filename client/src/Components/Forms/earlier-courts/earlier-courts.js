import { Typography } from "@mui/material";
import "./earlier-courts.css";
import { useState } from "react";

export const Item = ({type, placeholder, name,value,onChange}) => {
  return (
    <div className="inner-form-elements">
      <div className="title">
        <span variant="h5" style={{fontWeight:"bold"}}>{name}</span>
      </div>
      <div className="input-element">
        <input
          style={{width: '160px', marginLeft: '20px'}}
          type={type}
          className="input-field"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

const EarilerCourts = (props) => {
  const [earlierCourts, setEarlierCourts] = useState(true);
  const [proceed, setProceed] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState("");

  const storedCourtDetails = JSON.parse(
    localStorage.getItem("courtDetails")
  ); //getting the stored data from the local storage


  const initialDetails = storedCourtDetails ? storedCourtDetails : {
    cnr: "",
    courtName: "",
    bench: "",
    caseType: "",
    caseNo: ""
  };

  

  const [courtDetails, setCourtDetails] = useState(initialDetails);



  const value = (val) => {
    return courtDetails[val];
  }

  //onChange event handler common for all the input fields
  const onChange = (sub, value) => {
    const updatedDetails = {
      ...courtDetails,
      [sub]: value,
    };

    setCourtDetails(updatedDetails);
    localStorage.setItem("courtDetails", JSON.stringify(updatedDetails));
  }
  return (
    <div className="earlier-courts">
      <div className="title">
        <Typography variant="h4">Earlier Courts</Typography>
      </div>
      <div className="no-courts">
        <input
          type="radio"
          value={earlierCourts}
          name="earlier-courts"
          onClick={() => {
            setEarlierCourts(true);
          }}
        />
        <label className="label" for="yes">
          Yes
        </label>
        <input
          type="radio"
          placeholder="No"
          name="earlier-courts"
          value={earlierCourts}
          onClick={() => {
            setEarlierCourts(false);
          }}
        />

        <label className="label" for="no">
          No
        </label>
      </div>
      <div>
        {!earlierCourts && (
          <div className="declaration">
            <input
              type="radio"
              value={earlierCourts}
              name="no-courts"
              onClick={() => {
                setEarlierCourts(false);
              }}
              className="declare"
            />
            <Typography variant="h4">
              I hereby confirm that there are no earlier court details
              pertaining to this matter
            </Typography>
          </div>
        )}
        {!earlierCourts && (
          <div className="proceed">
            <button
              type="submit"
              className="proceed-btn"
              onClick={() => {
                props.handleNext(props.activeStep);
              }}
            >
              Proceed
            </button>
          </div>
        )}
        {earlierCourts && (
          <div className="yes-earlier">
            <div>
              <Typography variant="h5">Select Court</Typography>
            </div>
            <div className="select-court">
              <div className="court-type">
                <input type="radio" name="earlier" value="District Court" onClick={()=> setSelectedCourt("District Court")}/>
                <label for="district-court">District Court</label>
              </div>
              <div className="court-type">
                <input type="radio" name="earlier" value="High Court" onClick={()=> setSelectedCourt("High Court")}/>
                <label for="high-court">High Court</label>
              </div>
              <div className="court-type">
                <input type="radio" name="earlier" value="Supreme Court" onClick={()=> setSelectedCourt("Supreme Court")}/>
                <label for="supreme-court">Supreme Court</label>
              </div>
            </div>
          
          {selectedCourt === "High Court" && (
            <div className="left-main">
                <div className="left-form">
                {/* CNR number */}
                  <Item
                  type="number"
                  name="CNR"
                  placeholder="CNR"
                  value={value("cnr")}
                  onChange={(e) => onChange("cnr", e.target.value)}
                  />
                <span style={{fontWeight:'bolder' ,display:"flex", alignItems:'center', justifyContent: 'center'}}>OR</span>
                {/* High Court */}
                  <Item
                  type="text"
                  name="High Court"
                  placeholder="Name"
                  value={value("courtName")}
                  onChange={(e) => {
                    onChange("courtName", e.target.value);
                  }}
                  />
                {/* Bench */}
                  <Item
                  type="text"
                  name="Bench"
                  placeholder="Name"
                  value={value("bench")}
                  onChange={(e) => onChange("bench", e.target.value)}
                  />
                {/* Case Type */}
                  <Item
                  type="text"
                  name="Case Type"
                  placeholder="Name"
                  value={value("caseType")}
                  onChange={(e) => onChange("caseType", e.target.value)}
                  />
                {/* Case No */}
                  <Item
                  type="number"
                  name="Case No"
                  placeholder="Case No."
                  value={value("caseNo")}
                  onChange={(e) => {onChange("caseNo", e.target.value)}}
                  />
                </div>
            </div>
          
          )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EarilerCourts;
