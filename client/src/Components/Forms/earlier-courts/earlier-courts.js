import { Typography } from "@mui/material";
import "./earlier-courts.css";
import { useState } from "react";

const EarilerCourts = (props) => {
  const [earlierCourts, setEarlierCourts] = useState(true);
  const [proceed, setProceed] = useState(false);

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
              <div className="court-types">
                <input type="radio" name="earlier" />
                <label for="high-court">District Court</label>
              </div>
              <div className="court-types">
                <input type="radio" name="earlier" />
                <label for="high-court">Sub-Judge Family Courts</label>
              </div>
              <div className="court-types">
                <input type="radio" name="earlier" />
                <label for="high-court">Munsif</label>
              </div>
              <div className="court-types">
                <input type="radio" name="earlier" />
                <label for="high-court">Small Causes Courts</label>
              </div>
            </div>
            <div className="crn">
              <Typography className="crn-title" variant="h5">
                CRN Number:
              </Typography>
              <input type="text" placeholder="CRN Number" />
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default EarilerCourts;