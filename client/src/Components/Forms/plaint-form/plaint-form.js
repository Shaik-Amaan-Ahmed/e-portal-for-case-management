import { useState, useContext, useEffect } from "react";
import { EmailContext } from "../../../hooks/emailContext";
import axios from "axios";
import "./plaint-form.css";

const PlaintForm = (props) => {
  const caseType = ["civil", "criminal", "three"];
  const [casee,setCasee] = useState({});
  const caseCategory = ["one", "two", "three"];
  const [earlierCourts, setEarlierCourts] = useState(false);
  const [option , setOption] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState(false);



  const email = useContext(EmailContext);

  const storedPlaintDetails = JSON.parse(
    localStorage.getItem("plaintDetails")
  ); //getting the stored data from the local storage

  useEffect(() => {
    axios
      .get("http://localhost:64000/casedetails/client-case-category")
      .then((res) => {
        setCasee(res.data[0].caseType);
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  // console.log(casee["Labour Matters"]); // Log the caseType here

  const initialDetails = storedPlaintDetails ? storedPlaintDetails : { 
    causeTitlePlaintiff: "",
    causeTitleDefendant: "",
    caseType: "",
    caseCategory: "",
    caseSubCategory: "",
    numberOfPlaintiff: "",
    numberOfDefendant: "",
  }//

  const [plaintDetails, setPlaintDetails] = useState(initialDetails);//initializing the state with the stored data

  //to check whether all the details are filled or not
  const areDetailsFilled = () => {

    return Object.values(plaintDetails).every(value => value !== "");
  };

  //submitting the plaint details to the database
  const submitPlaintDetails = () => {
    if(!areDetailsFilled()){
      setError("Please fill all the details");
    }else{
      setError(null);
      props.handleNext(props.activeStep);
      
    }
  };

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
    
    setOption(val);
    if(casee[val].length === 1 && casee[val][0] === "-"){
      const updatedDetails = {
        ...plaintDetails,
        ["caseCategory"]: "-",
      };
  
      setPlaintDetails(updatedDetails);
      localStorage.setItem("plaintDetails", JSON.stringify(updatedDetails));
    }
    const updatedDetails = {
      ...plaintDetails,
      [sub]: val,
    };

    setPlaintDetails(updatedDetails);
    localStorage.setItem("plaintDetails", JSON.stringify(updatedDetails));
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
                <span variant="h5">Cause titile plaintiff</span>
              </div>
              <div className="input-element">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Cause title plaintiff"
                  value={value("causeTitlePlaintiff")}
                  onChange={(e) => onChange("causeTitlePlaintiff", e.target.value) }
                />
              </div>
            </div>
            <div className="inner-form-elements">
              <div className="title">
                {/* Cause titile Defendant */}
                <span variant="h5">Cause titile Defendant</span>
              </div>
              <div className="input-element">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Cause title defendant"
                  value={value("causeTitleDefendant")}
                  onChange={(e) => onChange("causeTitleDefendant", e.target.value)}
                />
              </div>
            </div>
            <div className="inner-form-elements">
              <div className="title">
                {/* Case Type */}
                <span>Case Type</span>
              </div>
              <div className="input-element">
                <select
                  className="input-field"
                  value={value("caseType")}
                  onChange={(e) => caseTypeOnChange("caseType", e.target.value)}
                >
                  {value("caseType") === "" && <option value="none">Select Case Type</option>}
                  {Object.keys(casee).map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="inner-form-elements">
              <div className="title">
                {/* Case Category */}
                <span>Case Category</span>
              </div>
              <div className="input-element">
                <select
                  className="input-field"
                  value={value("caseCategory")}
                  onChange={(e) => onChange("caseCategory", e.target.value)}
                >
                {!option &&  <option value="none">Select Case Type</option>}
                  {option && casee[option].map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="inner-form-elements">
              <div className="title">
                {/* Case Sub-category */}
                <span variant="h5">Case Sub-category</span>
              </div>
              <div className="input-element">
                <select
                  className="input-field"
                  value={value("caseSubCategory")}
                  onChange={(e) => onChange("caseSubCategory", e.target.value)}
                >
                  {caseCategory.map((option, index) => (
                    <option key={index}>{option}</option>
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
            <div className="inner-form-elements">
              <div className="title">
                {/* Number of Plaintiffs */}
                <span>Number of Plaintiffs</span>
              </div>
              <div className="input-element">
                <input
                  type="number"
                  min={0}
                  className="input-field"
                  placeholder="No. of Plaintiffs"
                  value={value("numberOfPlaintiff")}
                  onChange={(e) => onChange("numberOfPlaintiff", e.target.value)}
                />
              </div>
            </div>
            <div className="inner-form-elements">
              <div className="title">
                {/* Number of Defendants */}
                <span variant="h5">Number of Defendants</span>
              </div>
              <div className="input-element">
                <input
                  type="number"
                  min={0}
                  className="input-field"
                  placeholder="No. of Defendants"
                  value={value("numberOfDefendant")}
                  onChange={(e) => onChange("numberOfDefendant", e.target.value)}
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
