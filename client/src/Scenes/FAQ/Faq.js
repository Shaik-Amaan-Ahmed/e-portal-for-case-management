import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import './Faq.css'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { Link } from 'react-router-dom';
export default function FAQ() {
    function MyAccordion({ Ques, Ans }) {
        const [expanded, setExpanded] = React.useState(false);

        const handleChange = (panel) => (event, isExpanded) => {
            setExpanded(isExpanded ? panel : false);
        };
        return (
            <Accordion 
    expanded={expanded === 'panel1'}
    onChange={handleChange('panel1')}
    style={{ 
        padding: '7px', 
        width: '1000px', 
        backgroundColor: '#ebebeb',
        borderBottom: expanded === 'panel1' ? '20px' : '0px' 
    }}
> 
    <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
    >
        {Ques}
    </AccordionSummary>
    <AccordionDetails style={{borderTop:"1px solid rgba(0, 0, 0, .125)",backgroundColor:"white"}}>
        {Ans}
    </AccordionDetails>
</Accordion>
        );
    }
    return (
        <div className='faq-div1'>
            <div style={{ display: 'flex', flexDirection: 'column', }} >
                <h1 className="display-4 mb-4" style={{ fontSize: '64px', marginBottom: '20px', textAlign: 'center' }}>
                    <QuestionAnswerIcon style={{ fontSize: 67, marginRight: '20px' }} />
                    FAQ:
                </h1>
                {/* <h1 style={{fontSize:'64px', marginBottom: '20px',textAlign: 'center'}}>FAQ's:</h1> */}
                <h1 style={{ fontSize: '32px', marginBottom: '7px' }}>Login Queries:</h1>
                <MyAccordion Ques="What type of user are you (Judge/Registrar/Client/Defendant)?"
                    Ans={<div>Judge-If you are a registered practising judge<br />
                        Registrar-If you are an admin to the page<br />
                        Client:If you wish to file a case<br />
                        Defendant:If you are the opposite party of a case.</div>} />
                <MyAccordion Ques="Eligibility criteria for Judge account"
                    Ans={<div>If you have a registered and practising judge license <br />
                    </div>}
                />
                <MyAccordion Ques="Eligibility criteria for Registrar account"
                    Ans={<div>If you are part of the legal team of the court<br />
                    </div>} />
                <MyAccordion Ques="Eligibility criteria for Client account"
                    Ans={<div>No extra criteria required except being a resident with in the constituency of the court.<br />
                    </div>} />
                <MyAccordion Ques="Eligibility criteria for Defendant account" 
                Ans={<div>If you are the defendant to a case filed against you and your case password and ID is received to you via your email.<br />
                </div>}/>
                <h1 style={{ fontSize: '32px', marginBottom: '7px' }}>E-filing Queries:</h1>
                <MyAccordion Ques="How to file a case through our websit?"
                Ans={<div>Create a client account and in the side bar open E-filing option to file your case.<br />
                </div>} />
                <MyAccordion Ques="What personal documents are essential for filing a case?" 
                Ans={<div>The petitioner need to submit atleast one valid perosnal document.<br />
                </div>}/>
                <MyAccordion Ques="Where can I get the acknowledgement after filing my form?"
                Ans={<div>You will get a successful pop up right after you subit your filing and also receive an acknowledgement email to the registered client ID. <br />
                </div>} />
                <h1 style={{ fontSize: '32px', marginBottom: '7px' }}>Other Queries:</h1>
                <MyAccordion Ques="How do I contact us for any queries?"
                Ans={<div>You can contact us on our <Link to="/contact-us" style={{textDecoration:'underline'}}>Contact Us</Link> page. <br />
                </div>} />
                <MyAccordion Ques="Where can I see the list of judges in the court?"
                Ans={<div>You can view the profiles of each Judge on our Homepage.<br />
                </div>} />
                <MyAccordion Ques="How do I get the latest updates and notification about the court?"
                Ans={<div>The Homepage of out website displays the latest updates and notifications about the court.<br />
                </div>} />
            </div>
        </div>
    );
}