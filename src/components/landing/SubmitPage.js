import React from "react";
import { Column, Row } from "simple-flexbox";
import { Link } from "react-router-dom";
import UniMelbWrapper from "../uniMelbWrapper/UniMelbWrapper";
import axios from "axios";

class SubmitPage extends React.Component {
  //Check if the input email is valide or not
  //If it is email then do this.handleClick();
  //this.handleClick(); will call the server, when the backend is ready

  ValidateEmail = email => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    } else {
      return false;
    }
  };

  ValidateContactInfo = number => {
    if (
      /^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{1}(\ |-){0,1}[0-9]{3}$/.test(
        number
      )
    ) {
      return true;
    } else {
      return false;
    }
  };
  // handleClick get the data from form HTML
  // right now it is just console.log data
  // will be change to POST data to the server once it is ready
  handleClick = () => {
    var firstname = document.getElementById("name").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var number = document.getElementById("number").value;
    var officeNumber = document.getElementById("officeNumber").value;
    var ci2firstname = document.getElementById("ci2firstname").value;
    var ci2lastname = document.getElementById("ci2lastname").value;
    var ci2email = document.getElementById("ci2email").value;
    var ci2number = document.getElementById("ci2number").value;
    var outline = document.getElementById("outline").value;
    var beneficiaries = document.getElementById("beneficiaries").value;
    var benefits = document.getElementById("benefits").value;
    var original = document.getElementById("original").value;
    var used = document.getElementById("used").value;
    var technical = document.getElementById("technical").value;
    var organizationName = document.getElementById("organizationName").value;
    var idustryType = document.getElementById("idustryType").value;
    var size = document.getElementById("size").value;
    var organisationBrief = document.getElementById("organisationBrief").value;
    var projectName = document.getElementById("projectName").value;
    console.log(
      firstname,
      lastname,
      email,
      number,
      officeNumber,
      ci2firstname,
      ci2lastname,
      ci2email,
      ci2number,
      technical,
      organizationName,
      idustryType,
      size,
      organisationBrief,
      projectName,
      outline,
      beneficiaries,
      benefits,
      original,
      used
    );
    if (
      (firstname ||
        lastname ||
        email ||
        number ||
        officeNumber ||
        ci2firstname ||
        ci2lastname ||
        ci2email ||
        ci2number ||
        organizationName ||
        organisationBrief ||
        projectName ||
        outline ||
        beneficiaries ||
        benefits ||
        original) === "" ||
      (technical || idustryType || size) === -1
    ) {
      alert("Please fill in all required fields");
    } else if (!this.ValidateContactInfo(officeNumber,number.ci2number)) {
      alert("Please enter a valid phone number");
    } else if (!this.ValidateEmail(email,ci2email)) {
      alert("Please enter a valid email");
    }else{

    axios
      .post(`http://localhost:13000/api/proposal/submit`, {
        firstName: firstname,
        lastName: lastname,
        email: email,
        number: number,
        secondaryContactFirstName: ci2firstname,
        secondaryContactLastName: ci2lastname,
        secondaryContactEmail: ci2email,
        secondaryContactContactNumber: ci2number,
        officeNumber: officeNumber,
        technical: technical,
        organizationName: organizationName,
        idustryType: idustryType,
        size: size,
        organisationBrief: organisationBrief,
        projectName: projectName,
        outline: outline,
        beneficiaries: beneficiaries,
        benefits: benefits,
        original: original,
        used: original
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    }

    console.log("request sent!");

    // axios
    //   .post(`http://localhost:13000/api/proposal`, {
    //     // name: firstname + lastname,
    //     // outlineOfProject: outline,
    //     // endProductBenefits: benefits,
    //     // beneficiaries: beneficiaries,
    //     // originality: original,
    //     // clientId: '007',
    //     // subjectName: 'SWEN90013',
    //     // organisationId: '001'
    //     status: "approved",
    //     name: "Emily",
    //     outlineOfProject: "good",
    //     endProductBenefits: "good",
    //     beneficiaries: "good",
    //     originality: "1",
    //     clientId: "SUM"
    //   })
    //   .then(function(response) {
    //     console.log(response);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
  };

  render() {
    return (
      <UniMelbWrapper>
          <header>
            <h1>University of Melbourne: Software Engineering Projects</h1>
          </header>
          <section>
            <div style={{ textAlign: "justify" }}>
              <h1>
                <strong>
                  Submit a Proposal
                </strong>
              </h1>
              <h7>
                Please use this form to propose a project for our software
                engineering masters students to undertake as part of their
                coursework. We are not expecting a lot of detail from you at this
                stage, just enough for an initial assessment. No information
                (including contact details) in your proposal will be provided to
                students without your prior permission.
              </h7>
            </div>

            <br/>

            <fieldset >
              <legend>About Your Organisation</legend>

              <div>
                <label className="required">Organisation name</label>
                <input id="organizationName" type="text" />
              </div>

              <div>
                <label className="required">Industry</label>
                <div className="styled-select"  style={{marginBottom:"3%"}}>
                  <select id="idustryType">
                    <option value="-1">Please select&emsp;</option>
                    <option value="Aged care">Aged care</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Amusement, evens and recreation">
                      Amusement, evens and recreation
                    </option>
                    <option value="Animal care and veterinary services">
                      Animal care and veterinary services
                    </option>
                    <option value="Children’s services">
                      Children’s services
                    </option>
                    <option value="Commercial sales ">Commercial sales</option>
                    <option value="Education">Education</option>
                    <option value="Graphic arts">Graphic arts</option>
                    <option value="Hair and beauty ">Hair and beauty</option>
                    <option value="Health and welfare services">
                      Health and welfare services
                    </option>
                    <option value="Hospitality ">Hospitality</option>
                    <option value="Indigenous organisations and services">
                      Indigenous organisations and services
                    </option>
                    <option value="Journalism">Journalism</option>
                    <option value="Local government administration">
                      Local government administration
                    </option>
                    <option value="Market and business consultancy services">
                      Market and business consultancy services
                    </option>
                    <option value="Miscellaneous">Miscellaneous</option>
                    <option value="Real estate">Real estate</option>
                    <option value="Restaurants">Restaurants</option>
                    <option value="Retail">Retail</option>
                    <option value="Social, community, home care and disability services">
                      Social, community, home care and disability services
                    </option>
                    <option value="Sporting organisations">
                      Sporting organisations
                    </option>
                    <option value="Storage services">Storage services</option>
                    <option value="Technical services">Technical services</option>
                    <option value="Telecommunications services">
                      Telecommunications services
                    </option>
                    <option value="Tourism">Tourism</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="required">Size of Organisation</label>
                <div className="styled-select"  style={{marginBottom:"3%"}}>
                  <select id="size">
                    <option value="-1">Please select</option>
                    <option value="more than 250 employees">
                      more than 250 employees
                    </option>
                    <option value="between 50–249 employees">
                      between 50 – 249 employees
                    </option>
                    <option value="between 10–49 employees">
                      between 10 – 49 employees
                    </option>
                    <option value="less than 10 employees">
                      Less than 10 employees
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="required">Briefly describe what your organisation does</label>
                <textarea id="organisationBrief" type="text" />
              </div>
            </fieldset>

            <br/><br/>

            <fieldset >
              <legend>About Your Project Proposal</legend>
              
              <div>
                <label className="required">Provide a short title for your project</label>
                <textarea id="projectName" type="text" />
              </div>

              <div>
                <label className="required">Briefly outline your project</label>
                <textarea id="outline" type="text" />
              </div>

              <div>
                <label className="required">Who will be beneficiaries of the end product?</label>
                <textarea id="beneficiaries" type="text" />
              </div>

              <div>
                <label className="required">State the benefits of the end product</label>
                <textarea id="benefits" type="text" />
              </div>

              <div>
                <label className="required">To your knowledge, how original is the idea or concept
                  underlying the end product?</label>
                  <textarea id="original" type="text" />
              </div>

              <div>
                <label className="required">State of how you expect the end product will be used?</label>
                <textarea id="used" type="text" />
              </div>
            </fieldset>

            <br/><br/>

            <fieldset >
              <legend>About You</legend>
              
              <div>
                <label className="required">First Name</label>
                <input id="name" type="text" />
              </div>

              <div>
                <label className="required">Last Name</label>
                <input id="lastname" type="text" />
              </div>

              <div>
                <label className="required">Email Address</label>
                <input id="email" type="email" />
              </div>

              <div>
                <label className="required">Mobile Number</label>
                <input id="number" type="text" />
              </div>

              <div>
                <label className="required">Office Number</label>
                <input id="officeNumber" type="text" />
              </div>

              <div>
                <label className="required">
                  Rate your level of technical ability / understanding{" "}
                </label>
                <div className="styled-select" style={{marginBottom:"3%"}}>
                  <select id="technical">
                    <option value="-1">Please select</option>
                    <option value="1">1(non-technical)</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10(highly technical)</option>
                  </select>
                </div>
              </div>
   
              <h7 style={{fontWeight: "bold" }}>
                Secondary Contact Information
              </h7>

              <div>
                <label className="required">First Name</label>
                <input id="ci2firstname" type="text" />
              </div>

              <div>
                <label className="required">Last Name</label>
                <input id="ci2lastname" type="text" />
              </div>

              <div>
                <label className="required">Email Address</label>
                <input id="ci2email" type="text" />
              </div>

              <div>
                <label className="required">Mobile Number</label>
                <input id="ci2number" type="text" />
              </div>
            </fieldset>
            
            <div>
                <div style={{float:"left"}}>
                  <Link to={"/"} className="button-hero-reverse">
                    Return
                  </Link>
                </div>
              <div style={{float:"right"}}>
                <a className="button brand" onClick={this.handleClick} style={{ color: "#FFFFFF" }}>
                  Submit
                </a>
                </div>
              </div>

          <br/><br/>
          
          </section>

      </UniMelbWrapper>
    );
  }
}

export default SubmitPage;
