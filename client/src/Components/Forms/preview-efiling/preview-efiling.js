import { Typography } from "@mui/material";
import "./preview-efiling.css";
import { useContext, useState } from "react";
import SpringModal from "../../Modals/springModal";
import axios from "axios";
import { EmailContext } from "../../../hooks/emailContext";
import { ToastContainer, toast } from 'react-toastify';
import Spinner from "../../Spinner/Spinner";
import { useEffect } from "react";
const Item = ({ title, value }) => {
    return (
        <div className="item">
            <div className="item-title">
                <Typography variant="h5" sx={{ fontWeight: "bold", fontWeight: "500", display: "flex", justifyContent: "center" }}>{title}</Typography>
            </div>
            <div className="item-value">
                <Typography variant="h5" sx={{ fontWeight: "500" }}>{value}</Typography>
            </div>
        </div>
    )
}

const Title = ({ title }) => {
    return (
        <div className="doc-title">
            <Typography variant="h4" color="orange" sx={{ fontWeight: "500" }}>{title}</Typography>
        </div>
    )
}

const Preview = (props) => {

    const email = useContext(EmailContext);
    const storedPlaintDetails = JSON.parse(localStorage.getItem('plaintDetails'));
    const storedPlaintiffDetails = JSON.parse(localStorage.getItem('plaintiffDetails'));
    const storedDefendantDetails = JSON.parse(localStorage.getItem('defendantDetails'));
    const caseId = localStorage.getItem('caseId');
    const status = "Pending at court for approval";
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [loading, setLoading] = useState(false);
    const [registrationDate, setRegistrationDate] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState('');
    useEffect(() => {
        const day = String(registrationDate.getDate()).padStart(2, '0');
        const month = String(registrationDate.getMonth() + 1).padStart(2, '0'); // January is 0!
        const year = registrationDate.getFullYear();

        setFormattedDate(day + '-' + month + '-' + year);
    }, [registrationDate]);



    const data = {
        email,
        caseId,
        status:status,
        storedPlaintDetails,
        formattedDate,
        storedPlaintiffDetails,
        storedDefendantDetails,
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const requestPromise = axios.post('http://localhost:64000/e-filing', data);

        toast.promise(
            requestPromise,
            {
                pending: 'Submitting your Case...',
                success: 'Your Case has been submitted successfully',
                error: 'Something went wrong',
            }
        );
        
        try {
            const res = await requestPromise;
            if (res.status === 200) {
                localStorage.clear();
                handleClose();
            }
        } catch (error) {
            console.error(error);
        }
        window.location.reload(true);


    }

    return (
        <div className="preview-main">
            {/* Plaint Details */}
            <Typography variant="h3">Preview</Typography>

            <div className="docs-details">
                <Title title={"Plaint Details"} />
                <div className="doc-main">
                    <div className="doc-left">
                        <Item title="Cause Title Plaintiff" value={storedPlaintDetails.causeTitlePlaintiff} />
                        <Item title="Cause Title Defendant" value={storedPlaintDetails.causeTitleDefendant} />
                        <div className="item">
                            <div className="item-title">
                                <Typography variant="h5" sx={{ fontWeight: "bold", fontWeight: "500", display: "flex", justifyContent: "center" }}>Case Category</Typography>
                            </div>
                            <div className="case-category">
                                <Typography variant="h5" sx={{ fontWeight: "500" }}>{storedPlaintDetails.caseCategory}</Typography>
                            </div>
                        </div>
                        <div className="item">
                            <div className="item-title">
                                <Typography variant="h5" sx={{ fontWeight: "bold", fontWeight: "500", display: "flex", justifyContent: "center" }}>Case Sub  Category</Typography>
                            </div>
                            <div className="case-category">
                                <Typography variant="h5" sx={{ fontWeight: "500" }}>{storedPlaintDetails.caseSubCategory}</Typography>
                            </div>
                        </div>
                    </div>
                    <div className="doc-right">
                        <Item title="Number of Plaintiffs" value={storedPlaintDetails.numberOfPlaintiff} />
                        <Item title="Number of Defendants" value={storedPlaintDetails.numberOfDefendants} />
                    </div>
                </div>
            </div>
            <div className="docs-details">
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
                        <Item title="Plaintiff email" value={storedPlaintiffDetails.plaintiffEmail} />
                        <Item title="Plaintiff Phone" value={storedPlaintiffDetails.plaintiffPhone} />
                        <Item title="Plaintiff Address" value={storedPlaintiffDetails.plaintiffAddress} />
                        <Item title="Plaintiff City" value={storedPlaintiffDetails.plaintiffCity} />
                        <Item title="Plaintiff District" value={storedPlaintiffDetails.plaintiffDistrict} />
                        <Item title="Plaintiff State" value={storedPlaintiffDetails.plaintiffState} />
                        <Item title="Plaintiff Country" value={storedPlaintiffDetails.plaintiffCountry} />
                        <Item title="Plaintiff PinCode" value={storedPlaintiffDetails.plaintiffPinCode} />
                    </div>
                </div>
            </div>
            <div className="docs-details">
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
                        <Item title="Defendant email" value={storedDefendantDetails.defendantEmail} />
                        <Item title="Defendant Phone" value={storedDefendantDetails.defendantPhone} />
                        <Item title="Defendant Address" value={storedDefendantDetails.defendantAddress} />
                        <Item title="Defendant City" value={storedDefendantDetails.defendantCity} />
                        <Item title="Defendant District" value={storedDefendantDetails.defendantDistrict} />
                        <Item title="Defendant State" value={storedDefendantDetails.defendantState} />
                        <Item title="Defendant Country" value={storedDefendantDetails.defendantCountry} />
                        <Item title="Defendant PinCode" value={storedDefendantDetails.defendantPinCode} />
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
                message="submit"
                />
        </div>
    );
}

export default Preview;