import "../../../clientScenes/e-filing/e-filing.css";
import { useState } from "react";

const PlaintForm = () => {
  const caseType = ["one", "two", "three"];
  const caseCategory = ["one", "two", "three"];
  const [earlierCourts, setEarlierCourts] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        border: "0.1px solid grey",
        borderRadius: "10px",
      }}
    >
      {/* left start  */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "10px 10px 10px 10px",
          flex: 1,
        }}
      >
        {/* form left start  */}
        <div className="left-form">
          <div className="inner-form-elements">
            <div className="title">
              <span variant="h5">Cause titile plaintiff</span>
            </div>
            <div className="input-element">
              <input
                type="text"
                className="input-field"
                placeholder="Cause title plaintiff"
              />
            </div>
          </div>
          <div className="inner-form-elements">
            <div className="title">
              <span variant="h5">Cause title Defandant</span>
            </div>
            <div className="input-element">
              <input
                type="text"
                className="input-field"
                placeholder="Cause title respondant"
              />
            </div>
          </div>
          <div className="inner-form-elements">
            <div className="title">
              <span>Case Type</span>
            </div>
            <div className="input-element">
              <select className="input-field">
                {caseType.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="inner-form-elements">
            <div className="title">
              <span>Case Category</span>
            </div>
            <div className="input-element">
              <select className="input-field">
                {caseCategory.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="inner-form-elements">
            <div className="title">
              <span variant="h5">Case Sub-category</span>
            </div>
            <div className="input-element">
              <select className="input-field">
                {caseCategory.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* form left end  */}

      {/* left end  */}
      {/* right start  */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          margin: "10px 10px 10px 10px",
          flex: 1,
        }}
      >
        <div className="right-form">
          <div className="inner-form-elements">
            <div className="title">
              <span>Number of Plaintiffs</span>
            </div>
            <div className="input-element">
              <input
                type="number"
                min={0}
                className="input-field"
                placeholder="No. of petitioners"
              />
            </div>
          </div>
          <div className="inner-form-elements">
            <div className="title">
              <span variant="h5">Number of Defandants</span>
            </div>
            <div className="input-element">
              <input
                type="number"
                min={0}
                className="input-field"
                placeholder="No. of Respondants"
              />
            </div>
          </div>
          <div className="inner-form-elements">
            <div className="title">
              <span variant="h5">Earlier Courts</span>
              <input type="radio" value={setEarlierCourts} color="inherit" name="earlierCourts" onClick={() => setEarlierCourts(true)}/>
              <label for="yes">Yes</label>
              <input type="radio" placeholder="No" name="earlierCourts" value={setEarlierCourts} onClick={()=> setEarlierCourts(false)}/>
              <label for="no">No</label>
            </div>
              </div>
              {earlierCourts && ( 
                <div className="inner-form-elements">
                <div className="title">
                  <span variant="h5">Court Details</span>
                </div>
                <div className="input-element">
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Court Details"
                  />
                </div>
              </div>
              )}
        </div>
        
      </div>
      {/* right end  */}
    </div>
  );
};

export default PlaintForm;
