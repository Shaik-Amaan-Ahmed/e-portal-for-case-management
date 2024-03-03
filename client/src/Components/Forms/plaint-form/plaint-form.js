import { useState, useContext, useEffect } from "react";
import { EmailContext } from "../../../hooks/emailContext";
import axios from "axios";
import "./plaint-form.css";
import { ColorModeContext } from "../../../themes";
import { Typography } from "@mui/material";
import courtFees from "./court_fee_below_3lakh.json";

const Item = (props) => {
  return (
    <div className="inner-form-elements">
      <div className="title">
        <span style={{ fontWeight: "500", fontSize: "larger" }}>
          {props.title}
        </span>
      </div>
      <div className="input-element">
        <input
          type={props.type}
          className="input-field"
          placeholder={props.placeholder}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

const SelectItem = (props) => {
  return (
    <div className="inner-form-elements">
      <div className="title">
        <span style={{ fontWeight: "500", fontSize: "larger" }}>
          {props.title}
        </span>
      </div>
      <div className="input-element">
        <select
          value={props.value}
          className="input-field"
          onChange={(e) => props.onChange(e.target.value)}
        >
          {props.value === "" && <option value="none">Select Suit type</option>}
          {props.options.map((option, index) => {
            if (typeof option === "string") {
              // option is a string
              return (
                <option key={index} value={option}>
                  {option}
                </option>
              );
            } else {
              // option is an object
              const key = Object.keys(option)[0];
              return (
                <option key={index} value={key}>
                  {key}
                </option>
              );
            }
          })}
        </select>
      </div>
    </div>
  );
};

const SubSelectItem = (props) => {
  const suitType = props.suitTypes.find((suitType) => {
    return Object.keys(suitType)[0] === props.toFind;
  });

  if (suitType) {
    return (
      <div className="inner-form-elements">
        <div className="title">
          <span style={{ fontWeight: "500", fontSize: "larger" }}>
            {props.title}
          </span>
        </div>
        <div className="input-element">
          <select
            value={props.value}
            className="input-field"
            onChange={(e) => props.onChange(e.target.value)}
          >
            {props.value === "" && (
              <option value="none">Select Relief sought</option>
            )}
            {suitType[props.toFind].map((option, index) => {
              return (
                <option key={index} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }
};

const PlaintForm = (props) => {
 
  const [option, setOption] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState(false);
  const [amountTitle, setAmountTitle] = useState("");
  const suitTypes = [
    "Suits for money",
    {
      "Suits for movable property": [
        "Recovery of possession",
        "Suit for partition and separate possession",
        "Recovery of declaration and possession of title",
      ],
    },
    {
      "Suits for immovable property": [
        "Recovery of possession",
        "Suit for partition and separate possession",
        "Recovery of declaration and possession of title",
        "Recovery of declaration and consequential injunction",
      ],
    },
    {
      "Suits for maintenance and annuities": [
        "Suits for maintenance",
        "Suit for enhancement or reduction of maintenance",
        "Suit for annuities or other sums payable periodically",
        "Plaintiff's exclusive right to use, sell, print or exhibit any mark, name, book, picture, design or other thing",
      ],
    },
    {
      "Suits relating to trust property": [
        "Suits for possession or joint possession of trust property or for declaration of title to trust property",
      ],
    },
    "Suits relating to easements",
    "Suits relating to mortgages",
    "Suits for accounts",
    "Suits for dissolution of partnership",
    "Partition suits",
    "Suits for joint possession",
    "Administration suits",
    "Suits for cancellation of decrees,etc",
    "Suits to set aside attachment, etc",
    "Suits for specific performance",
    "Suits between landlord and tenant",
    "Suits for mesne profits",
  ];

  const email = useContext(EmailContext);

  const storedPlaintDetails = JSON.parse(localStorage.getItem("plaintDetails")); //getting the stored data from the local storage

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:64000/case-category")
  //     .then((res) => {
  //       setCasee(res.data.data[0].caseType);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const initialDetails = storedPlaintDetails
    ? storedPlaintDetails
    : {
        causeTitlePlaintiff: "",
        causeTitleDefendant: "",
        numberOfPlaintiff: "",
        numberOfDefendants: "",
        suitType: "",
        reliefSought: "",
        suitValue: "",
        courtFees: "",
      }; //

  const [plaintDetails, setPlaintDetails] = useState(initialDetails); //initializing the state with the stored data

  //to check whether all the details are filled or not
  const areDetailsFilled = () => {
    return Object.values(plaintDetails).every(
      (value) => value !== "" && value !== "None"
    );
  };

  //submitting the plaint details to the database
  const submitPlaintDetails = () => {
    if (!areDetailsFilled()) {
      setError("Please fill all the details");
    } else {
      setError(null);
      props.handleNext(props.activeStep);
    }
  };

  //to get the data from the database and store it in the local storage
  const value = (val) => {
    return plaintDetails[val];
  };

  //onChange event handler common for all the input fields
  const onChange = (sub, value) => {
    const updatedDetails = {
      ...plaintDetails,
      [sub]: value,
    };

    setPlaintDetails(updatedDetails);
    localStorage.setItem("plaintDetails", JSON.stringify(updatedDetails));
  };

  const calculateCourtFeeBelow3Lakh = (amount) => {
    for (let i = 0; i < courtFees.length; i++) {
      const range = courtFees[i].Range.split("-").map(Number);
      if (amount >= range[0] && amount < range[1]) {
        return courtFees[i].Value;
      }
    }
    return null;
  };

  const calculateCourtFeeHelper = (amount) => {
    if (amount < 300000) {
      return calculateCourtFeeBelow3Lakh(amount);
    }
    if (amount === 300000) {
      return 5426;
    } else {
      amount = Math.floor((amount - 300000) / 100);
      return amount + 5426;
    }
  };

  useEffect(() => {
    onChange(
      "courtFees",
      calculateCourtFee(
        value("suitType"),
        value("reliefSought"),
        value("suitValue")
      )
    );
  }, [
    plaintDetails["suitType"],
    plaintDetails["reliefSought"],
    plaintDetails["suitValue"],
  ]);

  const calculateCourtFee = (suitType, reliefSought, suitValue) => {
    suitValue = Number(suitValue);
    var amountOnWhichFeeNeedToBeCalculated = 0;
    if (suitType === "Suits for movable property") {
      if (reliefSought === "Recovery of possession") {
        amountOnWhichFeeNeedToBeCalculated = (1 / 4) * suitValue;
        return calculateCourtFeeHelper(amountOnWhichFeeNeedToBeCalculated);
      }
      if (reliefSought === "Suit for partition and separate possession") { 
        return calculateCourtFeeHelper(suitValue);
      }

      if (reliefSought === "Recovery of declaration and possession of title") {
        return calculateCourtFeeHelper(suitValue);
      }
    } else if (suitType === "Suits for immovable property") {
      if (reliefSought === "Recovery of possession") {
        amountOnWhichFeeNeedToBeCalculated = (1 / 2) * suitValue;
        return calculateCourtFeeHelper(amountOnWhichFeeNeedToBeCalculated);
      }
      if (reliefSought === "Suit for partition and separate possession") { 
        amountOnWhichFeeNeedToBeCalculated = (3 / 4) * suitValue;
        return calculateCourtFeeHelper(amountOnWhichFeeNeedToBeCalculated);
      }

      if (reliefSought === "Recovery of declaration and possession of title") {
        amountOnWhichFeeNeedToBeCalculated = (3 / 4) * suitValue;
        return calculateCourtFeeHelper(amountOnWhichFeeNeedToBeCalculated);
      }

      if (
        reliefSought === "Recovery of declaration and consequential injunction"
      ) {
        amountOnWhichFeeNeedToBeCalculated = (1 / 2) * suitValue;
        return calculateCourtFeeHelper(amountOnWhichFeeNeedToBeCalculated);
      }
    } else if (suitType === "Suits for maintenance and annuities") {

      return calculateCourtFeeHelper(suitValue);
    } 
    else if (suitType === "Suits relating to trust property") {

      amountOnWhichFeeNeedToBeCalculated = (1 / 5) * suitValue;
      return calculateCourtFeeHelper(amountOnWhichFeeNeedToBeCalculated);

    } else if (suitType === "Suits relating to easements" || suitType ==="Suits relating to accounts" || suitType === "Suits for dissolution of partnership" || suitType === "Suits for cancellation of decrees,etc"|| suitType === "Suits for specific performance" || suitType === "Suits between landlord and tenant" || suitType === "Suits for mesne profits" || suitType==="Administration suits") {

      return calculateCourtFeeHelper(suitValue);

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
            <Item
              type="text"
              title="Cause title plaintiff"
              placeholder="Cause title plaintiff"
              value={value("causeTitlePlaintiff")}
              onChange={(e) => onChange("causeTitlePlaintiff", e)}
            />

            <Item
              type="text"
              title="Cause title defendant"
              placeholder="Cause title defendant"
              value={value("causeTitleDefendant")}
              onChange={(e) => onChange("causeTitleDefendant", e)}
            />
            <Item
              title="Number of Plaintiffs"
              placeholder="No. of Plaintiff"
              type="number"
              value={value("numberOfPlaintiff")}
              onChange={(e) => onChange("numberOfPlaintiff", e)}
            />
            <Item
              title="Number of Defendants"
              placeholder="No. of Defendants"
              type="number"
              value={value("numberOfDefendants")}
              onChange={(e) => onChange("numberOfDefendants", e)}
            />
          </div>
        </div>

        {/* form left end  */}

        {/* left end  */}
        {/* right start  */}
        <div className="right-main">
          <div className="right-form">
            <SelectItem
              title="Suit Type"
              value={value("suitType")}
              options={suitTypes}
              onChange={(e) => onChange("suitType", e)}
            />
            {value("suitType") !== "" && (
              <SubSelectItem
                title="Relief sought"
                value={value("reliefSought")}
                suitTypes={suitTypes}
                onChange={(e) => onChange("reliefSought", e)}
                toFind={value("suitType")}
              />
            )}
            <Item
              title="Amount claimed in the suit"
              placeholder="Amount"
              type="number"
              value={value("suitValue")}
              onChange={(e) => onChange("suitValue", e)}
            />
            {value("suitValue") !== "" && value("suitType")!=""&& (
              <div className="inner-form-elements">
                <div className="title">
                  <span variant="h5">*Court Fee</span>
                </div>
                <div className="input-element">
                  <input
                    type="none"
                    readOnly
                    className="input-field"
                    value={calculateCourtFee(
                      value("suitType"),
                      value("reliefSought"),
                      value("suitValue")
                    )}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        {/* right end  */}
      </div>
      <div className="submit-button-div">
        <button className="submit-button" onClick={submitPlaintDetails}>
          submit
        </button>
      </div>
    </>
  );
};

export default PlaintForm;
