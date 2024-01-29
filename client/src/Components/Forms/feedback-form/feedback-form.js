import React from "react";
import './feedback-form.css'
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
export default function FeedbackForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); 
  const [message, setMessage] = useState("");
  const handleName = (e) => { 
    setName(e.target.value);
  }
  const handleEmail = (e) => {
    setEmail(e.target.value);
  }
  const handleMessage = (e) => {
    setMessage(e.target.value);
  }
  const handleSubmitFeedBack = async (e) => {
    e.preventDefault();
    try{
    const contact = await axios.post("http://localhost:64000/contact-us", {
      name: name,
      email: email,
      message: message
    });
    if(contact.status === 200){
      toast.success("Feedback submitted successfully");
      setName("");
      setEmail("");
      setMessage("");
    }
    else{
      toast.error("Feedback not submitted");
    }
}catch(err){
  console.log(err);
}
  }

  return (
    <div className="main-2">
      <div className="container">

        <h1 className="display-4 mb-4 d-flex align-items-center">
          <img src="https://cdn-icons-png.flaticon.com/512/9239/9239182.png" alt="Icon" style={{ width: '50px', marginRight: '10px' }}/> Contact Us
        </h1>
        <div className="col-lg-8">
          <hr className="t_border my-4 ml-0 text-left" style={{width:'50%'}}/>
        </div>

        <div class="row sec_sp">
          <div class="col-lg-5 mb-5" >
            <h3 class="color_sec py-4">Get in touch with us at:</h3>
            <address>
              <strong>Email:  </strong>
              <a href="mailto:eportalforcasemanagement2023@gmail.com">eportalforcasemanagement2023@gmail.com</a>
              <br />
              <br />
              <p>
                <strong>Phone:</strong> 9398359211
              </p>
            </address>
            <p>To clear your queries contact us on above details or visit our <Link to="/faq" style={{textDecoration:'underline'}}>FAQ</Link> page.
            </p>
          </div>
          <div className="col-lg-7 d-flex align-items-center">
            <form className="contact__form w-100 ">
              <div className="row">
                <div className="col-lg-6 form-group">
                  <input className="form-control rounded-2" id="name" value={name} name="name" placeholder="Name" type="text" onChange={handleName} required style={{
                    background: 'transparent',
                    'backdrop-filter': 'blur(60px)',
                    border: '0.1px solid rgba(128, 128, 128, 0.753)',
                    'margin-bottom': '10px'
                  }} />
                </div>
                <div className="col-lg-6 form-group">
                  <input className="form-control rounded-2" id="email" value={email} name="email" placeholder="Email" onChange={handleEmail} type="email" required style={{
                    background: 'transparent',
                    'backdrop-filter': 'blur(60px)',
                    border: '0.1px solid rgba(128, 128, 128, 0.753)',
                    'margin-bottom': '10px'
                  }} />
                </div>
              </div>
              <textarea className="form-control rounded-2" id="message" value={message} name="message" placeholder="Enter your suggestions here ..." rows="5" onChange={handleMessage} required style={{
                height: '200px',
                background: 'transparent',
                'backdrop-filter': 'blur(60px)',
                border: '0.1px solid rgba(128, 128, 128, 0.753)',
                'border-radius': '5px',
                'height': '250px',

              }}></textarea>
              <br />
              <div className="row">
                <div className="col-lg-12 form-group">
                  <button onClick={handleSubmitFeedBack} className="btn ac_btn" type="submit" style={{ backgroundColor: 'orange' }}>
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}