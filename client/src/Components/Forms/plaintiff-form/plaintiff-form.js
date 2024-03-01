import { FormControl, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import "./plaintiff-form.css";
import 'dayjs/locale/en-gb';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';


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
          error={props.plaintiffTypeError || props.plaintiffNameError || props.plaintiffRelationError || props.plaintiffParentSpouseNameError || props.plaintiffDeadMinorError || props.plaintiffDOBError || props.plaintiffAgeError || props.plaintiffGenderError || props.plaintiffEmailError || props.plaintiffPhoneError || props.plaintiffAddressError || props.plaintiffCountryError || props.plaintiffPinCodeError || props.plaintiffCityError || props.plaintiffStateError || props.plaintiffDistrictError}
          helperText={props.plaintiffTypeError ? props.plaintiffTypeErrorMsg : props.plaintiffNameError ? props.plaintiffNameErrorMsg : props.plaintiffRelationError ? props.plaintiffRelationErrorMsg : props.plaintiffParentSpouseNameError ? props.plaintiffParentSpouseNameErrorMsg : props.plaintiffDeadMinorError ? props.plaintiffDeadMinorErrorMsg : props.plaintiffDOBError ? props.plaintiffDOBErrorMsg : props.plaintiffAgeError ? props.plaintiffAgeErrorMsg : props.plaintiffGenderError ? props.plaintiffGenderErrorMsg : props.plaintiffEmailError ? props.plaintiffEmailErrorMsg : props.plaintiffPhoneError ? props.plaintiffPhoneErrorMsg : props.plaintiffAddressError ? props.plaintiffAddressErrorMsg : props.plaintiffCountryError ? props.plaintiffCountryErrorMsg : props.plaintiffPinCodeError ? props.plaintiffPinCodeErrorMsg : props.plaintiffCityError ? props.plaintiffCityErrorMsg : props.plaintiffStateError ? props.plaintiffStateErrorMsg : props.plaintiffDistrictError ? props.plaintiffDistrictErrorMsg : ""}
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

const PlaintiffForm = (props) => {
  const petionerType = ["Individual", "Group"];
  const relation = ["Son of", "Daughter of", "Husband of", "Wife of", "Other"];
  const caseCategory = ["one", "two", "three"];
  const [error, setError] = useState("");
  const [plaintiffTypeError, setPlaintiffTypeError] = useState(false);
  const [plaintiffNameError, setPlaintiffNameError] = useState(false);
  const [plaintiffRelationError, setPlaintiffRelationError] = useState(false);
  const [plaintiffParentSpouseNameError, setPlaintiffParentSpouseNameError] = useState(false);
  const [plaintiffDeadMinorError, setPlaintiffDeadMinorError] = useState(false);
  const [plaintiffDOBError, setPlaintiffDOBError] = useState(false);
  const [plaintiffAgeError, setPlaintiffAgeError] = useState(false);
  const [plaintiffGenderError, setPlaintiffGenderError] = useState(false);
  const [plaintiffEmailError, setPlaintiffEmailError] = useState(false);
  const [plaintiffPhoneError, setPlaintiffPhoneError] = useState(false);
  const [plaintiffAddressError, setPlaintiffAddressError] = useState(false);
  const [plaintiffCountryError, setPlaintiffCountryError] = useState(false);
  const [plaintiffPinCodeError, setPlaintiffPinCodeError] = useState(false);
  const [plaintiffCityError, setPlaintiffCityError] = useState(false);
  const [plaintiffStateError, setPlaintiffStateError] = useState(false);
  const [plaintiffDistrictError, setPlaintiffDistrictError] = useState(false);
  const [plaintiffTypeErrorMsg, setPlaintiffTypeErrorMsg] = useState("");
  const [plaintiffNameErrorMsg, setPlaintiffNameErrorMsg] = useState("");
  const [plaintiffRelationErrorMsg, setPlaintiffRelationErrorMsg] = useState("");
  const [plaintiffParentSpouseNameErrorMsg, setPlaintiffParentSpouseNameErrorMsg] = useState("");
  const [plaintiffDeadMinorErrorMsg, setPlaintiffDeadMinorErrorMsg] = useState("");
  const [plaintiffDOBErrorMsg, setPlaintiffDOBErrorMsg] = useState("");
  const [plaintiffAgeErrorMsg, setPlaintiffAgeErrorMsg] = useState("");
  const [plaintiffGenderErrorMsg, setPlaintiffGenderErrorMsg] = useState("");
  const [plaintiffEmailErrorMsg, setPlaintiffEmailErrorMsg] = useState("");
  const [plaintiffPhoneErrorMsg, setPlaintiffPhoneErrorMsg] = useState("");
  const [plaintiffAddressErrorMsg, setPlaintiffAddressErrorMsg] = useState("");
  const [plaintiffCountryErrorMsg, setPlaintiffCountryErrorMsg] = useState("");
  const [plaintiffPinCodeErrorMsg, setPlaintiffPinCodeErrorMsg] = useState("");
  const [plaintiffCityErrorMsg, setPlaintiffCityErrorMsg] = useState("");
  const [plaintiffStateErrorMsg, setPlaintiffStateErrorMsg] = useState("");
  const [plaintiffDistrictErrorMsg, setPlaintiffDistrictErrorMsg] = useState("");
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
  const validateForm = () => {
    var isvalid = true;
    if (!plaintiffDetails.plaintiffType) {
      setPlaintiffTypeError(true);
      setError("Please select plaintiff type");
      return false;
    } else {
      setPlaintiffTypeError(false);
      setError("");
      isvalid = true;
    }
    if (!plaintiffDetails.plaintiffName) {
      setPlaintiffNameError(true);
      setPlaintiffNameErrorMsg("Please enter plaintiff name");
      return false;
    } else {
      setPlaintiffNameError(false);
      setPlaintiffNameErrorMsg("");
      isvalid = true;
    }
    if (!plaintiffDetails.plaintiffRelation) {
      setPlaintiffRelationError(true);
      setError("Please select plaintiff relation");
      return false;
    } else {
      setPlaintiffRelationError(false);
      setError("");
      isvalid = true;
    }
    if (!plaintiffDetails.plaintiffParentSpouseName) {
      setPlaintiffParentSpouseNameError(true);
      setPlaintiffParentSpouseNameErrorMsg("Please enter plaintiff parent/spouse name");
      return false;
    } else {
      setPlaintiffParentSpouseNameError(false);
      setPlaintiffParentSpouseNameErrorMsg("");
      isvalid = true;
    }
    if (!plaintiffDetails.plaintiffDeadMinor) {
      setPlaintiffDeadMinorError(true);
      setError("Please select plaintiff dead/minor");
      return false;
    } else {
      setPlaintiffDeadMinorError(false);
      setError("");
      isvalid = true;
    }
    if (!plaintiffDetails.plaintiffDOB) {
      setPlaintiffDOBError(true);
      setPlaintiffDOBErrorMsg("Please enter plaintiff date of birth");
      return false;
    } else {
      setPlaintiffDOBError(false);
      setPlaintiffDOBErrorMsg("");
      isvalid = true;
    }
    if (!plaintiffDetails.plaintiffAge) {
      setPlaintiffAgeError(true);
      setPlaintiffAgeErrorMsg("Please enter plaintiff age");
      return false;
    } else if (plaintiffDetails.plaintiffAge < 15) {
      setPlaintiffAgeError(true);
      setPlaintiffAgeErrorMsg("Age should be greater than 15");
      return false;
    } else {
      setPlaintiffAgeError(false);
      setPlaintiffAgeErrorMsg("");
      isvalid = true;
    }
    if (!plaintiffDetails.plaintiffGender) {
      setPlaintiffGenderError(true);
      setError("Gender is Required");
      return false;
    } else {
      setPlaintiffGenderError(false);
      setError("");
      isvalid = true;
    }
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!plaintiffDetails.plaintiffEmail) {
      setPlaintiffEmailError(true);
      setPlaintiffEmailErrorMsg("Please enter plaintiff email");
      return false;
    } else if (!regex.test(plaintiffDetails.plaintiffEmail)) {
      setPlaintiffEmailError(true);
      setPlaintiffEmailErrorMsg("Invalid email");
      return false;
    } else {
      setPlaintiffEmailError(false);
      setPlaintiffEmailErrorMsg("");
      isvalid = true;
    }

    if (!plaintiffDetails.plaintiffPhone) {
      setPlaintiffPhoneError(true);
      setPlaintiffPhoneErrorMsg("Please enter plaintiff phone number");
      return false;
    } else if (!/^[0-9]{10}$/i.test(plaintiffDetails.plaintiffPhone)) {
      setPlaintiffPhoneError(true);
      setPlaintiffPhoneErrorMsg("Invalid phone number");
      return false;
    } else {
      setPlaintiffPhoneError(false);
      setPlaintiffPhoneErrorMsg("");
      isvalid = true;
    }
    if (!plaintiffDetails.plaintiffAddress) {
      setPlaintiffAddressError(true);
      setPlaintiffAddressErrorMsg("Please enter plaintiff address");
      return false;
    } else {
      setPlaintiffAddressError(false);
      setPlaintiffAddressErrorMsg("");
      isvalid = true;
    }
    if (!plaintiffDetails.plaintiffCountry) {
      setPlaintiffCountryError(true);
      setPlaintiffCountryErrorMsg("Please enter plaintiff country");
      return false;
    } else {
      setPlaintiffCountryError(false);
      setPlaintiffCountryErrorMsg("");
      isvalid = true;
    }
    if (!plaintiffDetails.plaintiffPinCode) {
      setPlaintiffPinCodeError(true);
      setPlaintiffPinCodeErrorMsg("Please enter plaintiff pin code");
      return false;
    } else if (!/^\d{6}$/.test(plaintiffDetails.plaintiffPinCode)) {
      setPlaintiffPinCodeError(true);
      setPlaintiffPinCodeErrorMsg("Pin code is invalid");
      return false;
    } else {
      setPlaintiffPinCodeError(false);
      setPlaintiffPinCodeErrorMsg("");
      isvalid = true;
    }
    if (!plaintiffDetails.plaintiffCity) {
      setPlaintiffCityError(true);
      setPlaintiffCityErrorMsg("Please enter plaintiff city");
      return false;
    } else {
      setPlaintiffCityError(false);
      setPlaintiffCityErrorMsg("");
      isvalid = true;
    }
    if (!plaintiffDetails.plaintiffState) {
      setPlaintiffStateError(true);
      setPlaintiffStateErrorMsg("Please enter plaintiff state");
      return false;
    } else {
      setPlaintiffStateError(false);
      setPlaintiffStateErrorMsg("");
      isvalid = true;
    }
    if (!plaintiffDetails.plaintiffDistrict) {
      setPlaintiffDistrictError(true);
      setError("Please enter plaintiff district");
      return false;
    } else {
      setPlaintiffDistrictError(false);
      setError("");
      isvalid = true;
    }

    return true

  }

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
    if (validateForm() && areDetailsFilled()) {

      props.handleNext(props.activeStep + 1); //handleNext function from e-filing.js
    }; //handle onclick of the submit button
  }

  const genders = ["Male", "Female", "Dont want to disclose"];

  const value = (val) => {
    return plaintiffDetails[val];
  }

  //onChange event handler common for all the input fields
  const onChange = (sub, value) => {
    if (sub === "plaintiffDeadMinor" && value === "-") {
      const updatedDetails = {
        ...plaintiffDetails,
        ["plaintiffDeadMinor"]: '-',
      };
      setPlaintiffDetails(updatedDetails);
      localStorage.setItem("plaintiffDetails", JSON.stringify(updatedDetails));
    }
    else {
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
                  plaintiffTypeError={plaintiffTypeError}
                  plaintiffTypeErrorMsg={plaintiffTypeErrorMsg}
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

              {/* <FormControl sx={{
                  m: 1, '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgb(201, 198, 193)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    '&.Mui-focused': {
                      color: 'inherit', // change as needed
                    },
                  },
                  width:"48%"
                  
                }}>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={value("plaintiffType")}
                    onChange={(e) => {
                      onChange("plaintiffType", e.target.value);
                    }}
                  >
                    {petionerType.map((option, index) => (
                      <MenuItem
                        key={index}
                        value={option}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}

            </div>

            {/* Main Plaintiff Name */}
            <Item
              type="text"
              name="Main Plaintiff Name"
              placeholder="Name"
              value={value("plaintiffName")}
              onChange={(e) => onChange("plaintiffName", e.target.value)}
              plaintiffNameError={plaintiffNameError}
              plaintiffNameErrorMsg={plaintiffNameErrorMsg}
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
                  plaintiffRelationError={plaintiffRelationError}
                  plaintiffRelationErrorMsg={plaintiffRelationErrorMsg}
                >
                  <option value="None">None</option>
                  {relation.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              {/* <div className="input-element">
                <FormControl fullWidth sx={{
                  m: 1, '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgb(201, 198, 193)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    '&.Mui-focused': {
                      color: 'inherit', // change as needed
                    },
                  },
                  width:"100%"
                }}>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    
                    value={value("plaintiffRelation")}
                    onChange={(e) => {
                      onChange("plaintiffRelation", e.target.value);
                    }}
                    
                  >
                    
                    <MenuItem value="None">None</MenuItem>
                  {relation.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                  </Select>
                </FormControl>
              </div> */}
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
              plaintiffParentSpouseNameError={plaintiffParentSpouseNameError}
              plaintiffParentSpouseNameErrorMsg={plaintiffParentSpouseNameErrorMsg}
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
                  plaintiffDeadMinorError={plaintiffDeadMinorError}
                  plaintiffDeadMinorErrorMsg={plaintiffDeadMinorErrorMsg}

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
            <div className="input-element">
              <Item
                placeholder="Date of Birth"
                value={value("plaintiffDOB")}
                onChange={(event) => onChange("plaintiffDOB", event.target.value)}
                name="Date of Birth"
                type="date"
                plaintiffDOBError={plaintiffDOBError}
                plaintiffDOBErrorMsg={plaintiffDOBErrorMsg}

              />
            </div>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-GB">
              <div className="judge-inputi">
                <DatePicker
                  placeholder="Date of Birth"
                  value={dayjs(value("plaintiffDOB"))}
                  onChange={(e) => {
                    onChange("plaintiffDOB", e.target.value);
                  }}
                  format="DD-MM-YYYY "
                  slotProps={{
                    textField: {
                      error: false,
                      // helperText:props.dateOfBirthErrorMsg // if you want to force error state
                    },
                  }}
                  renderInput={(params) => <TextField {...params}
                  />}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: 'rgb(201, 198, 193)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      '&.Mui-focused': {
                        color: 'white', // change as needed
                      },
                    },

                  }}

                />
              </div>
            </LocalizationProvider> */}
            {/* Age */}
            {/* <div className="inner-form-elements">
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
            </div> */}
            <Item
              type="number"
              placeholder="Age"
              name="Age"
              value={value("plaintiffAge")}
              onChange={(e) => {
                onChange("plaintiffAge", e.target.value);
              }}
              plaintiffAgeError={plaintiffAgeError}
              plaintiffAgeErrorMsg={plaintiffAgeErrorMsg}

            />
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
                  plaintiffGenderError={plaintiffGenderError}
                  plaintiffGenderErrorMsg={plaintiffGenderErrorMsg}

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
              plaintiffEmailError={plaintiffEmailError}
              plaintiffEmailErrorMsg={plaintiffEmailErrorMsg}

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
              plaintiffPhoneError={plaintiffPhoneError}
              plaintiffPhoneErrorMsg={plaintiffPhoneErrorMsg}

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
              plaintiffAddressError={plaintiffAddressError}
              plaintiffAddressErrorMsg={plaintiffAddressErrorMsg}

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
              plaintiffCountryError={plaintiffCountryError}
              plaintiffCountryErrorMsg={plaintiffCountryErrorMsg}

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
              plaintiffPinCodeError={plaintiffPinCodeError}
              plaintiffPinCodeErrorMsg={plaintiffPinCodeErrorMsg}
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
              plaintiffCityError={plaintiffCityError}
              plaintiffCityErrorMsg={plaintiffCityErrorMsg}

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
              plaintiffStateError={plaintiffStateError}
              plaintiffStateErrorMsg={plaintiffStateErrorMsg}
            />
            {/* district */}
            <div className="inner-form-elements">
              <div className="title">
                {/* defendant No. */}
                <Typography variant="h5" style={{ fontWeight: "500" }}>
                  District
                </Typography>
              </div>
              <div className="input-element">
                <select
                  className="input-field"
                  value={value("plaintiffDistrict")}
                  onChange={(e) => {
                    onChange("plaintiffDistrict", e.target.value);
                  }}
                  plaintiffDistrict={plaintiffDistrictError}
                  plaintiffDistrictErrorMsg={plaintiffDistrictErrorMsg}
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
          onClick={handleSubmitPlaintiffDetails}
        >
          submit
        </button>
      </div>
    </>
  );
};

export default PlaintiffForm;
