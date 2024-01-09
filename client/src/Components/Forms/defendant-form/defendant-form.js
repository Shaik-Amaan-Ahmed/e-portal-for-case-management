import { useState } from "react";
import "../plaintiff-form/plaintiff-form.css";

export const Item = ({type, placeholder, name,value,onChange}) => {
  return (
    <div className="inner-form-elements">
      <div className="title">
        <span variant="h5" style={{fontWeight:"bold"}}>{name}</span>
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
  )
}



  const RespondantForm = (props) => {
  const petionerType = ["Individual", "Group"];
  const relation = ["Son of", "Daughter of", "Husband of", "Wife of", "Other"];
  const caseCategory = ["one", "two", "three"];
  const [earlierCourts, setEarlierCourts] = useState(false);
  const [error, setError] = useState("");
  
  const genders = ['Male','Female',"Dont want to disclose"];

  const storedDefendantDetails = JSON.parse(
    localStorage.getItem("defendantDetails")
  ); //getting the stored data from the local storage

  const initialDetails = storedDefendantDetails ? storedDefendantDetails : {
    defendantType: "Individual",
    defendantName: "",
    defendantRelation: "",
    defendantParentSpouseName: "",
    defendantDeadMinor: "",
    defendantDOB: "",
    defendantAge: "",
    defendantGender: "",
    defendantEmail: "",
    defendantPhone: "",
    defendantAddress: "",
    defendantCountry: "",
    defendantPinCode: "",
    defendantCity: "",
    defendantState: "",
    defendantDistrict: "",
  };

  const [defendantDetails, setDefendantDetails] = useState(initialDetails); //initializing the state with the stored data

    //to check whether all the details are filled or not
    const areDetailsFilled = () => { 
      return Object.values(defendantDetails).every((value) => value !== "" && value !== "None");
    }
  
    //handle onclick of the submit button
    const handleSubmitDefendantDetails = () => {
      if (!areDetailsFilled()) { 
        setError("Please fill all the details");
        return;
      }
      props.handleNext(props.activeStep + 1); //handleNext function from e-filing.js
    }; 
  
  
    //to get the data from the database and store it in the local storage
    const value = (val) => {
      return defendantDetails[val];
    }
  
    //onChange event handler common for all the input fields
    const onChange = (sub, value) => {
      if(sub==="defendantDeadMinor" && value==="-"){
        const updatedDetails = {
          ...defendantDetails,
          ["defendantDeadMinor"]: "-",
        };
        setDefendantDetails(updatedDetails);
        localStorage.setItem("defendantDetails", JSON.stringify(updatedDetails));
      }
      else{
        const updatedDetails = {
          ...defendantDetails,
          [sub]: value,
        };
    
        setDefendantDetails(updatedDetails);
        localStorage.setItem("defendantDetails", JSON.stringify(updatedDetails));
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
              {/* defendant No. */}
                  <span variant="h5" style={{ fontWeight: "bold" }}>
                    defendant No.
                  </span>
            </div>
            <div className="input-element">
              <select
                    className="input-field"
                    value={value("defendantType")}
                    onChange={(e) => {
                      onChange("defendantType", e.target.value);
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
          {/* Main defendant Name */}
              <Item
                type="text"
                name="Main defendant Name"
                placeholder="Name"
                value={value("defendantName")}
                onChange={(e) => onChange("defendantName", e.target.value)}
              />
{/* Relation */}
          <div className="inner-form-elements">
            <div className="title">
              <span variant="h5" style={{ fontWeight: "bold" }}>
                    Relation
                  </span>
            </div>
            <div className="input-element">
              <select
                    className="input-field"
                    value={value("defendantRelation")}
                    onChange={(e) => {
                      onChange("defendantRelation", e.target.value);
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
                value={value("defendantParentSpouseName")}
                onChange={(e) => {
                  onChange("defendantParentSpouseName", e.target.value);
                }}
              />
{/* Is Dead/Minor */}
          <div className="inner-form-elements">
            <div className="title">
              <span style={{ fontWeight: "bold" }}>Is Dead/Minor</span>
            </div>
            <div className="input-element">
              <select
                    className="input-field"
                    value={value("defendantDeadMinor")}
                    onChange={(e) => {
                      onChange("defendantDeadMinor", e.target.value);
                    }}
                  >
                <option key={0} value="">--Select--</option>
                    <option value="NA" key={1}>
                      NA
                    </option>
                <option value="Dead" key={2}>
                      Dead
                    </option>
                <option value="Minor" key={3}>
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
                value={value("defendantDOB")}
                onChange={(e) => {
                  onChange("defendantDOB", e.target.value);
                }}
              />
{/* Age */}
          <div className="inner-form-elements">
            <div className="title">
              <span style={{ fontWeight: "bold" }}>Age</span>
            </div>
            <div className="input-element">
              <input
                type="number"
                className="input-field"
                min={15}
                placeholder="Age"
value={value("defendantAge")}
                    onChange={(e) => {
                      onChange("defendantAge", e.target.value);
                    }}
              />
            </div>
          </div>
{/* Gender */}
          <div className="inner-form-elements">
            <div className="title">
              <span style={{ fontWeight: "bold" }}>Gender</span>
            </div>
            <div className="input-element">
              <select
                    className="input-field"
                    value={value("defendantGender")}
                    onChange={(e) => {
                      onChange("defendantGender", e.target.value);
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
                value={value("defendantEmail")}
                onChange={(e) => {
                  onChange("defendantEmail", e.target.value);
                }}
              />
  {/* phone number */}
              <Item
                type="tel"
                placeholder="Phone Number"
                name="Phone Number"
                value={value("defendantPhone")}
                onChange={(e) => {
                  onChange("defendantPhone", e.target.value);
                }}
              />
  {/* address */}
              <Item
                type="text"
                placeholder="H.NO STREET NO LANDMARK"
                name="Address"
                value={value("defendantAddress")}
                onChange={(e) => {
                  onChange("defendantAddress", e.target.value);
                }}
              />
  {/* country */}
              <Item
                type="text"
                placeholder="Country"
                name="Country"
                value={value("defendantCountry")}
                onChange={(e) => {
                  onChange("defendantCountry", e.target.value);
                }}
              />
  {/* pincode */}
              <Item
                type="text"
                placeholder="Pin Code"
                name="PIN CODE"
                value={value("defendantPinCode")}
                onChange={(e) => {
                  onChange("defendantPinCode", e.target.value);
                }}
              />
  {/* city */}
              <Item
                type="text"
                placeholder="City"
                name="City"
                value={value("defendantCity")}
                onChange={(e) => {
                  onChange("defendantCity", e.target.value);
                }}
              />
  {/* state */}
              <Item
                type="text"
                placeholder="State"
                name="State"
                value={value("defendantState")}
                onChange={(e) => {
                  onChange("defendantState", e.target.value);
                }}
              />
  {/* district */}
              <Item
                type="text"
                placeholder="District"
                name="District"
                value={value("defendantDistrict")}
                
                onChange={(e) => {
                  onChange("defendantDistrict", e.target.value);
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
            onClick={handleSubmitDefendantDetails}
          >
            submit
          </button>
        </div>
      </>
  );
};

export default RespondantForm;
