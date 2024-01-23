import { Typography } from "@mui/material";
import { useState } from "react";
import "./plaintiff-form.css";

export const Item = ({ type, placeholder, name, value, onChange }) => {
  return (
    // {inner-form-elements}
    <div className="inner-form-elements">
      <div className="title">
        <Typography variant="h5" style={{ fontWeight: "500"}}>
          {name}
        </Typography>
      </div>
      <div className="input-element">
        <input
          type={type}
          className="input-field"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

const PlaintiffForm = (props) => {
  const petionerType = ["Individual", "Group"];
  const relation = ["Son of", "Daughter of", "Husband of", "Wife of", "Other"];
  const caseCategory = ["one", "two", "three"];
  const [error, setError] = useState("");

  const storedPlaintiffDetails = JSON.parse(
    localStorage.getItem("plaintiffDetails")
  ); //getting the stored data from the local storage

  const initialDetails = storedPlaintiffDetails ? storedPlaintiffDetails : {
    plaintiffType: "Individual",
    plaintiffName: "",
    plaintiffRelation: "",
    plaintiffParentSpouseName: "",
    plaintiffDeadMinor: "NA",
    plaintiffDOB: "",
    plaintiffAge: "",
    plaintiffGender: "",
    plaintiffEmail: "",
    plaintiffPhone: "",
    plaintiffAddress: "",
    plaintiffCountry: "",
    plaintiffPinCode: "",
    plaintiffCity: "",
    plaintiffState: "",
    plaintiffDistrict: "",
  };

  //storing plaintiffDetails in the react usestate
  const [plaintiffDetails, setPlaintiffDetails] = useState(initialDetails);

  //to check whether all the details are filled or not
  const areDetailsFilled = () => { 
    return Object.values(plaintiffDetails).every((value) => value !== "" && value !== "None");
  }

  const handleSubmitPlaintiffDetails = () => {
    if (!areDetailsFilled()) { 
      setError("Please fill all the details");
      return;
    }
    props.handleNext(props.activeStep + 1); //handleNext function from e-filing.js
  }; //handle onclick of the submit button

  const genders = ["Male","Female","Dont want to disclose"];

  const value = (val) => {
    return plaintiffDetails[val];
  }

  //onChange event handler common for all the input fields
  const onChange = (sub, value) => {
    if(sub==="plaintiffDeadMinor" && value==="-"){
        const updatedDetails = {
          ...plaintiffDetails,
          ["plaintiffDeadMinor"]: '-',
        };
        setPlaintiffDetails(updatedDetails);
        localStorage.setItem("plaintiffDetails", JSON.stringify(updatedDetails));
    }
    else{
      const updatedDetails = {
        ...plaintiffDetails,
        [sub]: value,
      };

      setPlaintiffDetails(updatedDetails);
      localStorage.setItem("plaintiffDetails", JSON.stringify(updatedDetails));
    }
  };

  return (
    <>
{/* main-div */}
      {error && <div className="error">{error}</div>}
      <div className="main-div">
{/* left start  */}
        <div className="left-main">
{/* form left start  */}
          <div className="left-form">
            <div className="inner-form-elements">
              <div className="title">
{/* Plaintiff No. */}
                <Typography variant="h5" style={{ fontWeight: "500" }}>
                  Plaintiff No.
                </Typography>
              </div>
              <div className="input-element">
                <select
                  className="input-field"
                  value={value("plaintiffType")}
                  onChange={(e) => {
                    onChange("plaintiffType", e.target.value);
                  }}
                >
                  {petionerType.map((option, index) => (
                    <option
                      key={index}
                      value={option}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
{/* Main Plaintiff Name */}
            <Item
              type="text"
              name="Main Plaintiff Name"
              placeholder="Name"
              value={value("plaintiffName")}
              onChange={(e) => onChange("plaintiffName", e.target.value)}
            />
{/* Relation */}
            <div className="inner-form-elements">
              <div className="title">
                <Typography variant="h5" style={{ fontWeight: "500" }}>
                  Relation
                </Typography>
              </div>
              <div className="input-element">
                <select
                  className="input-field"
                  value={value("plaintiffRelation")}
                  onChange={(e) => {
                    onChange("plaintiffRelation", e.target.value);
                  }}
                >
                  <option value="None">None</option>
                  {relation.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
{/* Parent/Spouse Name */}
            <Item
              type="text"
              name="Parent/Spouse Name"
              placeholder="Name"
              value={value("plaintiffParentSpouseName")}
              onChange={(e) => {
                onChange("plaintiffParentSpouseName", e.target.value);
              }}
            />
{/* Is Dead/Minor */}
            <div className="inner-form-elements">
              <div className="title">
                <Typography variant="h5" style={{ fontWeight: "500" }}>Is Dead/Minor</Typography>
              </div>
              <div className="input-element">
                <select
                  className="input-field"
                  value={value("plaintiffDeadMinor")}
                  onChange={(e) => {
                    onChange("plaintiffDeadMinor", e.target.value);
                  }}
                >
                  <option key={0} value="">--Select--</option>
                  <option value="NA" key={2}>
                    NA
                  </option>
                  <option value="Dead" key={1}>
                    Dead
                  </option>
                  <option value="Minor" key={2}>
                    Minor
                  </option>
                  
                </select>
              </div>
            </div>
{/* Date of Birth */}
            <Item
              type="date"
              placeholder="Date of Birth"
              name="Date of Birth"
              value={value("plaintiffDOB")}
              onChange={(e) => {
                onChange("plaintiffDOB", e.target.value);
              }}
            />
{/* Age */}
            <div className="inner-form-elements">
              <div className="title">
                <Typography variant="h5" style={{ fontWeight: "500" }}>Age</Typography>
              </div>
              <div className="input-element">
                <input
                  type="number"
                  className="input-field"
                  min={15}
                  placeholder="Age"
                  value={value("plaintiffAge")}
                  onChange={(e) => {
                    onChange("plaintiffAge", e.target.value);
                  }}
                />
              </div>
            </div>
{/* Gender */}
            <div className="inner-form-elements">
              <div className="title">
                <Typography variant="h5" style={{ fontWeight: "500" }}>Gender</Typography>
              </div>
              <div className="input-element">
                <select
                  className="input-field"
                  value={value("plaintiffGender")}
                  onChange={(e) => {
                    onChange("plaintiffGender", e.target.value);
                  }}
                >
                  <option value="None">None</option>
                  {genders.map((option, index) => (
                    <option value={option} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
{/* form left end  */}

{/* left end  */}
{/* right start  */}
        <div className="right-main">
          <div className="right-form">
{/* email */}
            <Item
              type="email"
              placeholder="Email"
              name="Email"
              value={value("plaintiffEmail")}
              onChange={(e) => {
                onChange("plaintiffEmail", e.target.value);
              }}
            />
{/* phone number */}
            <Item
              type="tel"
              placeholder="Phone Number"
              name="Phone Number"
              value={value("plaintiffPhone")}
              onChange={(e) => {
                onChange("plaintiffPhone", e.target.value);
              }}
            />
{/* address */}
            <Item
              type="text"
              placeholder="H.NO STREET NO LANDMARK"
              name="Address"
              value={value("plaintiffAddress")}
              onChange={(e) => {
                onChange("plaintiffAddress", e.target.value);
              }}
            />
{/* country */}
            <Item
              type="text"
              placeholder="Country"
              name="Country"
              value={value("plaintiffCountry")}
              onChange={(e) => {
                onChange("plaintiffCountry", e.target.value);
              }}
            />
{/* pincode */}
            <Item
              type="text"
              placeholder="Pin Code"
              name="PIN CODE"
              value={value("plaintiffPinCode")}
              onChange={(e) => {
                onChange("plaintiffPinCode", e.target.value);
              }}
            />
{/* city */}
            <Item
              type="text"
              placeholder="City"
              name="City"
              value={value("plaintiffCity")}
              onChange={(e) => {
                onChange("plaintiffCity", e.target.value);
              }}
            />
{/* state */}
            <Item
              type="text"
              placeholder="State"
              name="State"
              value={value("plaintiffState")}
              onChange={(e) => {
                onChange("plaintiffState", e.target.value);
              }}
            />
{/* district */}
            <Item
              type="text"
              placeholder="District"
              name="District"
              value={value("plaintiffDistrict")}
              
              onChange={(e) => {
                onChange("plaintiffDistrict", e.target.value);
              }}
            />
          </div>
        </div>
        {/* right end  */}
      </div>
{/* main-div end  */}

{/* submit button */}
      <div className="submit-button-div">
        <button
          className="submit-button"
          onClick={handleSubmitPlaintiffDetails}
        >
          submit
        </button>
      </div>
    </>
  );
};

export default PlaintiffForm;
