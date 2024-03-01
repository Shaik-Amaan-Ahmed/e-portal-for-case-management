import { useState, useContext, useEffect } from "react";
import { EmailContext } from "../../../hooks/emailContext";
import axios from "axios";
import "./plaint-form.css";
import { ColorModeContext } from "../../../themes";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
export const Item = (props) => {
  return (
    
      <TextField
        type={props.type}
        min={0}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}

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
        error={props.causeTitlePlaintiffError || props.causeTitleDefendantError || props.caseCategoryError || props.caseSubCategoryError || props.numberOfPlaintiffError || props.numberOfDefendantsError}
        helperText={props.causeTitlePlaintiffErrorMessage || props.causeTitleDefendantErrorMessage || props.caseCategoryErrorMessage || props.caseSubCategoryErrorMessage || props.numberOfPlaintiffErrorMessage || props.numberOfDefendantsErrorMessage}

      />
   
  );
}
const PlaintForm = (props) => {
  const caseType = ["civil", "criminal", "three"];
  const [casee, setCasee] = useState({});
  const [earlierCourts, setEarlierCourts] = useState(false);
  const [option, setOption] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [causeTitlePlaintiffError, setCauseTitlePlaintiffError] = useState(false);
  const [causeTitleDefendantError, setCauseTitleDefendantError] = useState(false);
  const [caseCategoryError, setCaseCategoryError] = useState(false);
  const [caseSubCategoryError, setCaseSubCategoryError] = useState(false);
  const [numberOfPlaintiffError, setNumberOfPlaintiffError] = useState(false);
  const [numberOfDefendantsError, setNumberOfDefendantsError] = useState(false);
  const [causeTitlePlaintiffErrorMessage, setCauseTitlePlaintiffErrorMessage] = useState("");
  const [causeTitleDefendantErrorMessage, setCauseTitleDefendantErrorMessage] = useState("");
  const [caseCategoryErrorMessage, setCaseCategoryErrorMessage] = useState("");
  const [caseSubCategoryErrorMessage, setCaseSubCategoryErrorMessage] = useState("");
  const [numberOfPlaintiffErrorMessage, setNumberOfPlaintiffErrorMessage] = useState("");
  const [numberOfDefendantsErrorMessage, setNumberOfDefendantsErrorMessage] = useState("");
  const validateForm = () => {
    let isValid = true;
    if (!plaintDetails.causeTitlePlaintiff) {
      setCauseTitlePlaintiffError(true);
      setCauseTitlePlaintiffErrorMessage("Please enter cause title plaintiff");
      return false;
    }else{
      setCauseTitlePlaintiffError(false);
      setCauseTitlePlaintiffErrorMessage("");
      isValid = true;
    }
    if (!plaintDetails.causeTitleDefendant) {
      setCauseTitleDefendantError(true);
      setCauseTitleDefendantErrorMessage("Please enter cause title defendant");
      return false;
    }else{
      setCauseTitleDefendantError(false);
      setCauseTitleDefendantErrorMessage("");
      isValid = true;
    }
    if (!plaintDetails.caseCategory) {
      setCaseCategoryError(true);
      setError("Please enter case category");
      return false;
    }else{
      setCaseCategoryError(false);
      setError("");
      isValid = true;
    }
    if (!plaintDetails.caseSubCategory) {
      setCaseSubCategoryError(true);
      setError("Please enter case sub category");
      return false;
    }else{
      setCaseSubCategoryError(false);
      setError("");
      isValid = true;
    }
    if (!plaintDetails.numberOfPlaintiff) {
      setNumberOfPlaintiffError(true);
      setNumberOfPlaintiffErrorMessage("Please enter number of plaintiff");
      return false;
    }else{
      setNumberOfPlaintiffError(false);
      setNumberOfPlaintiffErrorMessage("");
      isValid = true;
    }
    if (!plaintDetails.numberOfDefendants) {
      setNumberOfDefendantsError(true);
      setNumberOfDefendantsErrorMessage("Please enter number of defendants");
      return false;
    }else{
      setNumberOfDefendantsError(false);
      setNumberOfDefendantsErrorMessage("");
      isValid = true;
    }
    return isValid;
  }

  const email = useContext(EmailContext);

  const storedPlaintDetails = JSON.parse(
    localStorage.getItem("plaintDetails")
  ); //getting the stored data from the local storage

  useEffect(() => {
    axios
      .get("http://localhost:64000/case-category")
      .then((res) => {
        setCasee(res.data.data[0].caseType);
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);


  const initialDetails = storedPlaintDetails ? storedPlaintDetails : {
    causeTitlePlaintiff: "",
    causeTitleDefendant: "",
    caseCategory: "",
    caseSubCategory: "",
    numberOfPlaintiff: "",
    numberOfDefendants: "",
  }//



  const [plaintDetails, setPlaintDetails] = useState(initialDetails);//initializing the state with the stored data

  //to check whether all the details are filled or not
  const areDetailsFilled = () => {

    return Object.values(plaintDetails).every(value => value !== "" && value !== "None");
  };

  //submitting the plaint details to the database
  const submitPlaintDetails = () => {
    if(validateForm()){
    setIsSubmitted(true);
    if (!areDetailsFilled()) {
      setError("Please fill all the details");
    } else {
      setError(null);
      props.handleNext(props.activeStep);

    }
  };
}

  //to get the data from the database and store it in the local storage
  const value = (val) => {
    return plaintDetails[val];
  }

  //onChange event handler common for all the input fields
  const onChange = (sub, value) => {
    const updatedDetails = {
      ...plaintDetails,
      [sub]: value,
    };

    setPlaintDetails(updatedDetails);
    localStorage.setItem("plaintDetails", JSON.stringify(updatedDetails));
  };
  const caseTypeOnChange = (sub, val) => {
    if (option !== "") {
      setOption(val);
      const updatedDetails = {
        ...plaintDetails,
        ["caseSubCategory"]: "None",
        [sub]: val,
      };

      setPlaintDetails(updatedDetails);
      localStorage.setItem("plaintDetails", JSON.stringify(updatedDetails));
    }
    else {
      setOption(val);
      if (casee[val].length === 1 && casee[val][0] === "-") {
        const updatedDetails = {
          ...plaintDetails,
          ["caseSubCategory"]: "-",
          [sub]: val,
        };
        setPlaintDetails(updatedDetails);
        localStorage.setItem("plaintDetails", JSON.stringify(updatedDetails));
      }
      else {
        const updatedDetails = {
          ...plaintDetails,
          ["caseSubCategory"]: "None",
          [sub]: val,
        };
        setPlaintDetails(updatedDetails);
        localStorage.setItem("plaintDetails", JSON.stringify(updatedDetails));
      }
    }
  };

  return (
    <>
      {error && <div className="error">{error}</div>}
      <div className="main-div">
        {/* left start  */}
        <div className="left-main">
          {/* form left start  */}
          <div className="left-form">
            <div className="inner-form-elements">
              <div className="title">
                {/* Cause titile plaintiff */}
                <Typography variant="h5" style={{ fontWeight: "500" }}>Cause titile plaintiff</Typography>
              </div>
              <div className="input-element">
                <Item
                  type="text"
                  placeholder="Cause title plaintiff"
                  value={value("causeTitlePlaintiff")}
                  onChange={(e) => onChange("causeTitlePlaintiff", e.target.value)}
                  causeTitlePlaintiffError={causeTitlePlaintiffError}
                  causeTitlePlaintiffErrorMessage={causeTitlePlaintiffErrorMessage}

                />
              </div>


            </div>
            <div className="inner-form-elements">
              <div className="title">
                {/* Cause titile Defendant */}
                <Typography variant="h5" style={{ fontWeight: "500" }}>Cause Title Defendant  </Typography>
              </div>
              <div className="input-element">
                <Item
                  type="text"
                  placeholder="Cause title defendant"
                  value={value("causeTitleDefendant")}
                  onChange={(e) => onChange("causeTitleDefendant", e.target.value)}
                  causeTitleDefendantError={causeTitleDefendantError}
                  causeTitleDefendantErrorMessage={causeTitleDefendantErrorMessage}
                />
              </div>
            </div>
            <div className="inner-form-elements">
              <div className="title">
                {/* Case Category */}
                <Typography variant="h5" style={{ fontWeight: "500" }}>Case Category</Typography>              </div>
              <div className="input-element">
                <select
                  value={value("caseCategory")}
                  className="input-field"
                  onChange={(e) => caseTypeOnChange("caseCategory", e.target.value)}
                  caseCategoryError={caseCategoryError}
                  caseCategoryErrorMessage={caseCategoryErrorMessage}
                >
                  {value("caseCategory") === "" && <option value="none">Select Case Category</option>}
                  {Object.keys(casee).map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {caseCategoryError && <div className="error-message">{setCaseCategoryErrorMessage}</div>}
                {/* <FormControl sx={{
                  m: 1, width: "100%", '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgb(201, 198, 193)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    '&.Mui-focused': {
                      color: 'inherit', // change as needed
                    },
                  },
                }}>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={value("caseCategory")}
                    placeholder="Select Case Category"
                    onChange={(e) => caseTypeOnChange("caseCategory", e.target.value)}
                  >
                    {value("caseCategory") === "" && <MenuItem value="none">Select Case Category</MenuItem>}
                    {Object.keys(casee).map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}
              </div>
            </div>
            <div className="inner-form-elements">
              <div className="title">
                <Typography variant="h5" style={{ fontWeight: "500" }}>Case SubCategory</Typography>
              </div>
              <div className="input-element">
                <select
                  className="input-field"
                  value={value("caseSubCategory")}
                  onChange={(e) => onChange("caseSubCategory", e.target.value)}
                  caseSubCategoryError={caseSubCategoryError}
                  caseSubCategoryErrorMessage={caseSubCategoryErrorMessage}
                >
                  {!option && <option value="none">Select Case SubCategory</option>}
                  {option && ["None", ...casee[option]].map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {caseSubCategoryError && <div className="error-message">{setCaseSubCategoryErrorMessage}</div>}
                {/* <FormControl sx={{ m: 1, width: "100%" }}>
                  <Select
                    placeholder="Select Case SubCategory"
                    value={value("caseSubCategory") || ''}

                    onChange={(e) => onChange("caseSubCategory", e.target.value)}
                  >
                    {!option && <option value="none">Select Case SubCategory</option>}
                    {option && casee && casee[option] && ["None", ...casee[option]].map((optionValue, index) => (
                      <option key={index}  value={optionValue}>
                        {optionValue}
                      </option>
                    ))}
                  </Select>
                </FormControl> */}
              </div>
            </div>
          </div>
        </div>

        {/* form left end  */}

        {/* left end  */}
        {/* right start  */}
        <div className="right-main">
          <div className="right-form">
            <div className="inner-form-elements">
              <div className="title">
                {/* Number of Plaintiffs */}
                <Typography variant="h5" style={{ fontWeight: "500" }}>Number of Plaintiffs</Typography>
              </div>
              <div className="input-element">
                <Item

                  type="number"
                  placeholder="No. of Plaintiffs"
                  value={value("numberOfPlaintiff")}
                  onChange={(e) => onChange("numberOfPlaintiff", e.target.value)}
                  numberOfPlaintiffError={numberOfPlaintiffError}
                  numberOfPlaintiffErrorMessage={numberOfPlaintiffErrorMessage}
                />
              </div>
            </div>
            <div className="inner-form-elements">
              <div className="title">
                {/* Number of Defendants */}
                <Typography variant="h5" style={{ fontWeight: "500" }}>Number of Defendants</Typography>
              </div>
              <div className="input-element">
                <Item
                  type="number"

                  placeholder="No. of Defendants"
                  value={value("numberOfDefendants")}
                  onChange={(e) => onChange("numberOfDefendants", e.target.value)}
                  numberOfDefendantsError={numberOfDefendantsError}
                  numberOfDefendantsErrorMessage={numberOfDefendantsErrorMessage}
                />
              </div>
            </div>
          </div>
        </div>
        {/* right end  */}
      </div>
      <div className="submit-button-div">
        <button className="submit-button" onClick={submitPlaintDetails}>submit</button>
      </div>
    </>
  );
};

export default PlaintForm;