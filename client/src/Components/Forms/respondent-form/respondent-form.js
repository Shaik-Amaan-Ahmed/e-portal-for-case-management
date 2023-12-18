import { useState } from "react";

export const Item = ({type, placeholder, name}) => {
  return (
    <div className="inner-form-elements">
      <div className="title">
        <span variant="h5" style={{fontWeight:"bold"}}>{name}</span>
      </div>
      <div className="input-element">
        <input
          type={type}
          className="input-field"
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}



  const RespondantForm = (activeStep) => {
  const petionerType = ["Individual", "Group"];
  const relation = ["Son of", "Daughter of", "Husband of", "Wife of", "Other"];
  const caseCategory = ["one", "two", "three"];
  const [earlierCourts, setEarlierCourts] = useState(false);
  
  const genders = [
    "Male",
    "Female",
    "Agender",
    "Androgyne",
    "Androgynous",
    "Bigender",
    "Cis",
    "Cisgender",
    "Cis Female",
    "Cis Male",
    "Cis Man",
    "Cis Woman",
    "Cisgender Female",
    "Cisgender Male",
    "Cisgender Man",
    "Cisgender Woman",
    "Female to Male",
    "FTM",
    "Gender Fluid",
    "Gender Nonconforming",
    "Gender Questioning",
    "Gender Variant",
    "Genderqueer",
    "Intersex",
    "Male to Female",
    "MTF",
    "Neither",
    "Neutrois",
    "Non-binary",
    "Other",
    "Pangender",
    "Trans",
    "Trans*",
    "Trans Female",
    "Trans* Female",
    "Trans Male",
    "Trans* Male",
    "Trans Man",
    "Trans* Man",
    "Trans Person",
    "Trans* Person",
    "Trans Woman",
    "Trans* Woman",
    "Transfeminine",
    "Transgender",
    "Transgender Female",
    "Transgender Male",
    "Transgender Man",
    " Transgender Person",
    "Transgender Woman",
    "Transmasculine",
    "Transsexual",
    "Transsexual Female",
    "Transsexual Male",
    "Transsexual Man",
    "Transsexual Person",
    "Transsexual Woman",
    "Two-Spirit",
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        border: "0.1px solid grey",
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
              <span variant="h5" style={{fontWeight:"bold"}}>Respondent No.</span>
            </div>
            <div className="input-element">
              <select className="input-field">
                {petionerType.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          <Item type="text" name="Main Respondent Name" placeholder="Name" />
          <div className="inner-form-elements">
            <div className="title">
              <span style={{fontWeight:"bold"}} variant="h5">Relation</span>
            </div>
            <div className="input-element">
              <select className="input-field">
                {relation.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          <Item type="text" name="Parent/Spouse Name" placeholder="Name" />
          <div className="inner-form-elements">
            <div className="title">
              <span style={{fontWeight:"bold"}}>Is Dead/Minon</span>
            </div>
            <div className="input-element">
              <select className="input-field">
                <option value="Dead">Dead</option>
                <option value="Minor">Minor</option>
              </select>
            </div>
          </div>
          <Item type="date" placeholder="Date of Birth" name="Date of Birth" />
          <div className="inner-form-elements">
            <div className="title">
              <span style={{fontWeight:"bold"}}>Age</span>
            </div>
            <div className="input-element">
              <input
                type="number"
                className="input-field"
                min={15}
                placeholder="Age"
              />
            </div>
          </div>
          <div className="inner-form-elements">
            <div className="title">
              <span style={{fontWeight:"bold"}}>Gender</span>
            </div>
            <div className="input-element">
              <select className="input-field">
                {genders.map((index,option) => (
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
          <Item type="email" placeholder="Email" name="Email" />
          <Item type="tel" placeholder="Phone Number" name="Phone Number" />
          <Item type="text" placeholder="H.NO STREET NO LANDMARK" name="Address" />
          <Item type="text" placeholder="Country" name="Country" />
          <Item type="text" placeholder="Pin Code" name="PIN CODE" />
          <Item type="text" placeholder="City" name="City" />
          <Item type="text" placeholder="State" name="State" />
          <Item type="text" placeholder="District" name="District" />
        </div>
      </div>
      {/* right end  */}
    </div>
  );
};

export default RespondantForm;
