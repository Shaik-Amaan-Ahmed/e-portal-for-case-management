import { useState } from "react";
import "./defendant-form.css";
import { TextField, Typography } from "@mui/material";
export const Item = (props) => {
  return (
    // {inner-form-elements}
    <div className="inner-form-elements">
      <div className="title">
        <Typography variant="h5" style={{ fontWeight: "500" }}>
          {props.name}
        </Typography>
      </div>
      <div className="input-element">
        <TextField
          type={props.type}
          min={0}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          error={props.defendantTypeError || props.defendantNameError || props.defendantRelationError || props.defendantParentSpouseNameError || props.defendantDeadMinorError || props.defendantDOBError || props.defendantAgeError || props.defendantGenderError || props.defendantEmailError || props.defendantPhoneError || props.defendantAddressError || props.defendantCountryError || props.defendantPinCodeError || props.defendantCityError || props.defendantStateError || props.defendantDistrictError}
          helperText={props.defendantTypeErrorMsg ? props.defendantTypeErrorMsg : props.defendantNameErrorMsg ? props.defendantNameErrorMsg : props.defendantRelationErrorMsg ? props.defendantRelationErrorMsg : props.defendantParentSpouseNameErrorMsg ? props.defendantParentSpouseNameErrorMsg : props.defendantDeadMinorErrorMsg ? props.defendantDeadMinorErrorMsg : props.defendantDOBErrorMsg ? props.defendantDOBErrorMsg : props.defendantAgeErrorMsg ? props.defendantAgeErrorMsg : props.defendantGenderErrorMsg ? props.defendantGenderErrorMsg : props.defendantEmailErrorMsg ? props.defendantEmailErrorMsg : props.defendantPhoneErrorMsg ? props.defendantPhoneErrorMsg : props.defendantAddressErrorMsg ? props.defendantAddressErrorMsg : props.defendantCountryErrorMsg ? props.defendantCountryErrorMsg : props.defendantPinCodeErrorMsg ? props.defendantPinCodeErrorMsg : props.defendantCityErrorMsg ? props.defendantCityErrorMsg : props.defendantStateErrorMsg ? props.defendantStateErrorMsg : props.defendantDistrictErrorMsg ? props.defendantDistrictErrorMsg : ""}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: 'rgb(201, 198, 193)',
              },
            },
            '& .MuiInputLabel-root': {
              '&.Mui-focused': {
                color: 'inherit', // change as needed
              },
            },
            width: "100%"
          }}
          variant="outlined"
        />
      </div>
    </div>
  );
};





  const RespondantForm = (props) => {
  const petionerType = ["Individual", "Group"];
  const relation = ["Son of", "Daughter of", "Husband of", "Wife of", "Other"];
  const caseCategory = ["one", "two", "three"];
  const [earlierCourts, setEarlierCourts] = useState(false);
  const [error, setError] = useState("");
  const [defendantTypeError, setDefendantTypeError] = useState(false);
  const [defendantNameError, setDefendantNameError] = useState(false);
  const [defendantRelationError, setDefendantRelationError] = useState(false);
  const [defendantParentSpouseNameError, setDefendantParentSpouseNameError] = useState(false);
  const [defendantDeadMinorError, setDefendantDeadMinorError] = useState(false);
  const [defendantDOBError, setDefendantDOBError] = useState(false);
  const [defendantAgeError, setDefendantAgeError] = useState(false);
  const [defendantGenderError, setDefendantGenderError] = useState(false);
  const [defendantEmailError, setDefendantEmailError] = useState(false);
  const [defendantPhoneError, setDefendantPhoneError] = useState(false);
  const [defendantAddressError, setDefendantAddressError] = useState(false);
  const [defendantCountryError, setDefendantCountryError] = useState(false);
  const [defendantPinCodeError, setDefendantPinCodeError] = useState(false);
  const [defendantCityError, setDefendantCityError] = useState(false);
  const [defendantStateError, setDefendantStateError] = useState(false);
  const [defendantDistrictError, setDefendantDistrictError] = useState(false);
  const [defendantTypeErrorMsg, setDefendantTypeErrorMsg] = useState("");
  const [defendantNameErrorMsg, setDefendantNameErrorMsg] = useState("");
  const [defendantRelationErrorMsg, setDefendantRelationErrorMsg] = useState("");
  const [defendantParentSpouseNameErrorMsg, setDefendantParentSpouseNameErrorMsg] = useState("");
  const [defendantDeadMinorErrorMsg, setDefendantDeadMinorErrorMsg] = useState("");
  const [defendantDOBErrorMsg, setDefendantDOBErrorMsg] = useState("");
  const [defendantAgeErrorMsg, setDefendantAgeErrorMsg] = useState("");
  const [defendantGenderErrorMsg, setDefendantGenderErrorMsg] = useState("");
  const [defendantEmailErrorMsg, setDefendantEmailErrorMsg] = useState("");
  const [defendantPhoneErrorMsg, setDefendantPhoneErrorMsg] = useState("");
  const [defendantAddressErrorMsg, setDefendantAddressErrorMsg] = useState("");
  const [defendantCountryErrorMsg, setDefendantCountryErrorMsg] = useState("");
  const [defendantPinCodeErrorMsg, setDefendantPinCodeErrorMsg] = useState("");
  const [defendantCityErrorMsg, setDefendantCityErrorMsg] = useState("");
  const [defendantStateErrorMsg, setDefendantStateErrorMsg] = useState("");
  const [defendantDistrictErrorMsg, setDefendantDistrictErrorMsg] = useState("");

  const genders = ['Male','Female',"Dont want to disclose"];
  const districts = [
    "Adilabad",
    "Bhadradri Kothagudem",
    "Hyderabad",
    "Jagtial",
    "Jangaon",
    "Jayashankar Bhupalpally",
    "Jogulamba Gadwal",
    "Kamareddy",
    "Karimnagar",
    "Khammam",
    "Komuram Bheem",
    "Mahabubabad",
    "Mahbubnagar",
    "Mancherial",
    "Medak",
    "Medchal-Malkajgiri",
    "Mulugu",
    "Nagarkurnool",
    "Nalgonda",
    "Narayanpet",
    "Nirmal",
    "Nizamabad",
    "Peddapalli",
    "Rajanna Sircilla",
    "Ranga Reddy",
    "Sangareddy",
    "Siddipet",
    "Suryapet",
    "Vikarabad",
    "Wanaparthy",
    "Warangal",
    "Hanumakonda",
    "Yadadri Bhuvanagiri"
  ];
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
  const validateForm = () => {
    var isvalid = true;
    if (!defendantDetails.defendantType) {
      setDefendantTypeError(true);
      setError("Please select defendant type");
      return false;
    } else {
      setDefendantTypeError(false);
      setError("");
      isvalid = true;
    }
    if (!defendantDetails.defendantName) {
      setDefendantNameError(true);
      setDefendantNameErrorMsg("Please enter defendant name");
      return false;
    } else {
      setDefendantNameError(false);
      setDefendantNameErrorMsg("");
      isvalid = true;
    }
    if (!defendantDetails.defendantRelation) {
      setDefendantRelationError(true);
      setError("Please select defendant relation");
      return false;
    } else {
      setDefendantRelationError(false);
      setError("");
      isvalid = true;
    }
    if (!defendantDetails.defendantParentSpouseName) {
      setDefendantParentSpouseNameError(true);
      setDefendantParentSpouseNameErrorMsg("Please enter defendant parent/spouse name");
      return false;
    } else {
      setDefendantParentSpouseNameError(false);
      setDefendantParentSpouseNameErrorMsg("");
      isvalid = true;
    }
    if (!defendantDetails.defendantDeadMinor) {
      setDefendantDeadMinorError(true);
      setError("Please select defendant dead/minor");
      return false;
    } else {
      setDefendantDeadMinorError(false);
      setError("");
      isvalid = true;
    }
    if (!defendantDetails.defendantDOB) {
      setDefendantDOBError(true);
      setDefendantDOBErrorMsg("Please enter defendant date of birth");
      return false;
    } else {
      setDefendantDOBError(false);
      setDefendantDOBErrorMsg("");
      isvalid = true;
    }
    if (!defendantDetails.defendantAge) {
      setDefendantAgeError(true);
      setDefendantAgeErrorMsg("Please enter defendant age");
      return false;
    } else if (defendantDetails.defendantAge < 15) {
      setDefendantAgeError(true);
      setDefendantAgeErrorMsg("Age should be greater than 15");
      return false;
    } else {
      setDefendantAgeError(false);
      setDefendantAgeErrorMsg("");
      isvalid = true;
    }
    if (!defendantDetails.defendantGender) {
      setDefendantGenderError(true);
      setError("Gender is Required");
      return false;
    } else {
      setDefendantGenderError(false);
      setError("");
      isvalid = true;
    }
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!defendantDetails.defendantEmail) {
      setDefendantEmailError(true);
      setDefendantEmailErrorMsg("Please enter defendant email");
      return false;
    } else if (!regex.test(defendantDetails.defendantEmail)) {
      setDefendantEmailError(true);
      setDefendantEmailErrorMsg("Invalid email");
      return false;
    } else {
      setDefendantEmailError(false);
      setDefendantEmailErrorMsg("");
      isvalid = true;
    }

    if (!defendantDetails.defendantPhone) {
      setDefendantPhoneError(true);
      setDefendantPhoneErrorMsg("Please enter defendant phone number");
      return false;
    } else if (!/^[0-9]{10}$/i.test(defendantDetails.defendantPhone)) {
      setDefendantPhoneError(true);
      setDefendantPhoneErrorMsg("Invalid phone number");
      return false;
    } else {
      setDefendantPhoneError(false);
      setDefendantPhoneErrorMsg("");
      isvalid = true;
    }
    if (!defendantDetails.defendantAddress) {
      setDefendantAddressError(true);
      setDefendantAddressErrorMsg("Please enter defendant address");
      return false;
    } else {
      setDefendantAddressError(false);
      setDefendantAddressErrorMsg("");
      isvalid = true;
    }
    if (!defendantDetails.defendantCountry) {
      setDefendantCountryError(true);
      setDefendantCountryErrorMsg("Please enter defendant country");
      return false;
    } else {
      setDefendantCountryError(false);
      setDefendantCountryErrorMsg("");
      isvalid = true;
    }
    if (!defendantDetails.defendantPinCode) {
      setDefendantPinCodeError(true);
      setDefendantPinCodeErrorMsg("Please enter defendant pin code");
      return false;
    } else if (!/^\d{6}$/.test(defendantDetails.defendantPinCode)) {
      setDefendantPinCodeError(true);
      setDefendantPinCodeErrorMsg("Pin code is invalid");
      return false;
    } else {
      setDefendantPinCodeError(false);
      setDefendantPinCodeErrorMsg("");
      isvalid = true;
    }
    if (!defendantDetails.defendantCity) {
      setDefendantCityError(true);
      setDefendantCityErrorMsg("Please enter defendant city");
      return false;
    } else {
      setDefendantCityError(false);
      setDefendantCityErrorMsg("");
      isvalid = true;
    }
    if (!defendantDetails.defendantState) {
      setDefendantStateError(true);
      setDefendantStateErrorMsg("Please enter defendant state");
      return false;
    } else {
      setDefendantStateError(false);
      setDefendantStateErrorMsg("");
      isvalid = true;
    }
    if (!defendantDetails.defendantDistrict) {
      setDefendantDistrictError(true);
      setError("Please enter defendant district");
      return false;
    } else {
      setDefendantDistrictError(false);
      setError("");
      isvalid = true;
    }

    return true

  }
    //to check whether all the details are filled or not
    const areDetailsFilled = () => { 
      return Object.values(defendantDetails).every((value) => value !== "" && value !== "None");
    }
  
    //handle onclick of the submit button
    const handleSubmitDefendantDetails = () => {
      if (validateForm() && areDetailsFilled()) { 
        
      props.handleNext(props.activeStep + 1); //handleNext function from e-filing.js
    }; 
  }
  
  
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
              <Typography variant="h5" style={{ fontWeight: "500"}}>
          Defendant No.
        </Typography>
            </div>
            <div className="input-element">
              <select
                    className="input-field"
                    value={value("defendantType")}
                    onChange={(e) => {
                      onChange("defendantType", e.target.value);
                    }}
                    defendantTypeError={defendantTypeError}
                    defendantTypeErrorMsg={defendantTypeErrorMsg}
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
                defendantNameError={defendantNameError}
                defendantNameErrorMsg={defendantNameErrorMsg}

              />
{/* Relation */}
          <div className="inner-form-elements">
            <div className="title">
            <Typography variant="h5" style={{ fontWeight: "500"}}>
          Relation
        </Typography>
            </div>
            <div className="input-element">
              <select
                    className="input-field"
                    value={value("defendantRelation")}
                    onChange={(e) => {
                      onChange("defendantRelation", e.target.value);
                    }}
                    defendantRelationError={defendantRelationError}
                    defendantRelationErrorMsg={defendantRelationErrorMsg}
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
                defendantParentSpouseNameError={defendantParentSpouseNameError}
                defendantParentSpouseNameErrorMsg={defendantParentSpouseNameErrorMsg}

              />
{/* Is Dead/Minor */}
          <div className="inner-form-elements">
            <div className="title">
            <Typography variant="h5" style={{ fontWeight: "500"}}>
          Is Dead/Minor
        </Typography>
            </div>
            <div className="input-element">
              <select
                    className="input-field"
                    value={value("defendantDeadMinor")}
                    onChange={(e) => {
                      onChange("defendantDeadMinor", e.target.value);
                    }}
                    defendantDeadMinorError={defendantDeadMinorError}
                    defendantDeadMinorErrorMsg={defendantDeadMinorErrorMsg}
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
                defendantDOBError={defendantDOBError}
                defendantDOBErrorMsg={defendantDOBErrorMsg}
              />
{/* Age */}

              <Item
                type="number"
                className="input-field"
                min={15}
                placeholder="Age"
                name = "Age"
value={value("defendantAge")}
                    onChange={(e) => {
                      onChange("defendantAge", e.target.value);
                    }}
                    defendantAgeError={defendantAgeError}
                    defendantAgeErrorMsg={defendantAgeErrorMsg}
              />
{/* Gender */}
          <div className="inner-form-elements">
            <div className="title">
            <Typography variant="h5" style={{ fontWeight: "500"}}>
          Gender
        </Typography>
            </div>
            <div className="input-element">
              <select
                    className="input-field"
                    value={value("defendantGender")}
                    onChange={(e) => {
                      onChange("defendantGender", e.target.value);
                    }}
                    defendantGenderError={defendantGenderError}
                    defendantGenderErrorMsg={defendantGenderErrorMsg}

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
                defendantEmailError={defendantEmailError}
                defendantEmailErrorMsg={defendantEmailErrorMsg}
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
                defendantPhoneError={defendantPhoneError}
                defendantPhoneErrorMsg={defendantPhoneErrorMsg}

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
                defendantAddressError={defendantAddressError}
                defendantAddressErrorMsg={defendantAddressErrorMsg}
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
                defendantCountryError={defendantCountryError}
                defendantCountryErrorMsg={defendantCountryErrorMsg}
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
                defendantPinCodeError={defendantPinCodeError}
                defendantPinCodeErrorMsg={defendantPinCodeErrorMsg}
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
                defendantCityError={defendantCityError}
                defendantCityErrorMsg={defendantCityErrorMsg}
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
                defendantStateError={defendantStateError}
                defendantStateErrorMsg={defendantStateErrorMsg}

              />
  {/* district */}
              {/* <Item
                type="text"
                placeholder="District"
                name="District"
                value={value("defendantDistrict")}
                
                onChange={(e) => {
                  onChange("defendantDistrict", e.target.value);
                }}
                defendantDistrictError={defendantDistrictError}
                defendantDistrictErrorMsg={defendantDistrictErrorMsg}
              /> */}
                <div className="inner-form-elements">
            <div className="title">
              {/* defendant No. */}
              <Typography variant="h5" style={{ fontWeight: "500"}}>
          District
        </Typography>
            </div>
            <div className="input-element">
              <select
                    className="input-field"
                    value={value("defendantDistrict")}
                    onChange={(e) => {
                      onChange("defendantDistrict", e.target.value);
                    }}
                    defendantDistrictError={defendantDistrictError}
                defendantDistrictErrorMsg={defendantDistrictErrorMsg}
                  >
                {districts.map((option, index) => (
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
