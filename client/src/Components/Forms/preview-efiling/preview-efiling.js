import { Typography } from "@mui/material";
import "./preview-efiling.css";
import { useContext, useState } from "react";
import SpringModal from "../../Modals/springModal";
import axios from "axios";
import { EmailContext } from "../../../hooks/emailContext";
import UploadDocs from "../upload-docs/uploadDocs";
const Item = ({ title, value }) => { 
    return (
        <div className="item">
            <div className="item-title">
                <Typography variant="h5" sx={{fontWeight: "bold", display:"flex",justifyContent:"center"}}>{title}</Typography>
            </div>
            <div className="item-value">
                <Typography variant="h5" sx={{fontWeight:"500"}}>{value}</Typography>
            </div>        
        </div>
    )
}

const Title = ({title}) => {
    return (
        <div className="doc-title">
            <Typography variant="h4" color="orange" sx={{fontWeight: "500"}}>{title}</Typography>
          </div>
    )
}

const Preview = (props) => { 

    const email = useContext(EmailContext);
    const storedPlaintDetails = JSON.parse(localStorage.getItem('plaintDetails'));
    const storedPlaintiffDetails = JSON.parse(localStorage.getItem('plaintiffDetails'));
    const storedDefendantDetails = JSON.parse(localStorage.getItem('defendantDetails'));
    const storedDocumentDetails = JSON.parse(localStorage.getItem('docDetails'));
    const [open, setOpen] =useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const data = {
        email,
        storedPlaintDetails,
        storedPlaintiffDetails,
        storedDefendantDetails,
        storedDocumentDetails
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await axios.post("http://localhost:64000/e-filing", data);

        if(res.status === 200){ 
            handleClose();
            alert("Your case has been submitted successfully");
            localStorage.clear();
            window.location.reload();
        }
        else{ 
            alert("Something went wrong. Please try again later");
        }
    }

    return (
      <div className="preview-main">
{/* Plaint Details */}
        <Typography variant="h3">Preview</Typography>
        <div className="doc-details">
            <Title title={"Plaint Details"} />
          <div className="doc-main">
            <div className="doc-left">
                <Item title="Cause Title Plaintiff" value={storedPlaintDetails.causeTitlePlaintiff} />
                <Item title="Cause Title Defendant" value={storedPlaintDetails.causeTitleDefendant} />
                <Item title="Case Type" value={storedPlaintDetails.caseType} />
                <Item title="Case Category" value={storedPlaintDetails.caseCategory} />
                <Item title="Case Sub Category" value={storedPlaintDetails.caseSubCategory} />              
            </div>
            <div className="doc-right">
                <Item title="Number of Plaintiffs" value={storedPlaintDetails.numberOfPlaintiff}/>
                <Item title="Number of Defendants" value={storedPlaintDetails.numberOfDefendant}/>
            </div>
          </div>
        </div>
        <div className="doc-details">
            <Title title={"Plaintiff Details"} />
          <div className="doc-main">
            <div className="doc-left">
                <Item title="Plaintiff Type" value={storedPlaintiffDetails.plaintiffType} />
                <Item title="Main Plaintiff Name" value={storedPlaintiffDetails.plaintiffName} />
                <Item title="Plaintiff Relation" value={storedPlaintiffDetails.plaintiffRelation} />
                <Item title="Plaintiff Relation Name" value={storedPlaintiffDetails.plaintiffParentSpouseName} />
                <Item title="Plaintiff Dead/Minor" value={storedPlaintiffDetails.plaintiffDeadMinor} />
                <Item title="Plaintiff DOB" value={storedPlaintiffDetails.plaintiffDOB} />
                <Item title="Plaintiff Age" value={storedPlaintiffDetails.plaintiffAge} />
                <Item title="Plaintiff Gender" value={storedPlaintiffDetails.plaintiffGender} />
              
            </div>
            <div className="doc-right">
                <Item title="Plaintiff email" value={storedPlaintiffDetails.plaintiffEmail}/>
                <Item title="Plaintiff Phone" value={storedPlaintiffDetails.plaintiffPhone}/>
                <Item title="Plaintiff Address" value={storedPlaintiffDetails.plaintiffAddress}/>
                <Item title="Plaintiff City" value={storedPlaintiffDetails.plaintiffCity}/>
                <Item title="Plaintiff District" value={storedPlaintiffDetails.plaintiffDistrict}/>
                <Item title="Plaintiff State" value={storedPlaintiffDetails.plaintiffState}/>
                <Item title="Plaintiff Country" value={storedPlaintiffDetails.plaintiffCountry}/>
                <Item title="Plaintiff PinCode" value={storedPlaintiffDetails.plaintiffPinCode}/>
             </div>
          </div>
        </div>
        <div className="doc-details">
            <Title title={"Defendant Details"} />
          <div className="doc-main">
            <div className="doc-left">
                <Item title="Defendant Type" value={storedDefendantDetails.defendantType} />
                <Item title="Main Defendant Name" value={storedDefendantDetails.defendantName} />
                <Item title="Defendant Relation" value={storedDefendantDetails.defendantRelation} />
                <Item title="Defendant Relation Name" value={storedDefendantDetails.defendantParentSpouseName} />
                <Item title="Defendant Dead/Minor" value={storedDefendantDetails.defendantDeadMinor} />
                <Item title="Defendant DOB" value={storedDefendantDetails.defendantDOB} />
                <Item title="Defendant Age" value={storedDefendantDetails.defendantAge} />
                <Item title="Defendant Gender" value={storedDefendantDetails.defendantGender} />
              
            </div>
            <div className="doc-right">
                <Item title="Defendant email" value={storedDefendantDetails.defendantEmail}/>
                <Item title="Defendant Phone" value={storedDefendantDetails.defendantPhone}/>
                <Item title="Defendant Address" value={storedDefendantDetails.defendantAddress}/>
                <Item title="Defendant City" value={storedDefendantDetails.defendantCity}/>
                <Item title="Defendant District" value={storedDefendantDetails.defendantDistrict}/>
                <Item title="Defendant State" value={storedDefendantDetails.defendantState}/>
                <Item title="Defendant Country" value={storedDefendantDetails.defendantCountry}/>
                <Item title="Defendant PinCode" value={storedDefendantDetails.defendantPinCode}/>
             </div>
          </div>
        </div>
        <UploadDocs/>
        <div className="doc-details">
            <Title title={"Document Details"} />
          <div className="doc-main">
            <div className="doc-left">
                <Item title="Petetion Title" value={storedDocumentDetails.petitionTitle}/>
                <Item title="Aadhar Title" value={storedDocumentDetails.aadharTitle}/>
              
            </div>
            <div className="doc-right">
                <Item title="Petetion File" value={storedDocumentDetails.petitionFileName}/>
                <Item title="Aadhar File" value={storedDocumentDetails.aadharFileName}/>
             </div>
          </div>
        </div>
        <div className="submit">
            <button className="submit-button" onClick={handleOpen}>Save and Submit</button>
        </div>
        <SpringModal 
            handleOpen={handleOpen} 
            handleClose={handleClose} 
            open={open}
            handleSubmit={handleSubmit}    
        />
      </div>
    );
}

export default Preview;