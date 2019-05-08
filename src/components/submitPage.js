import React from "react";
import { Column, Row } from "simple-flexbox";

class submitPage extends React.Component {
  //Check if the input email is valide or not
  //If it is email then do this.handleClick();
  //this.handleClick(); will call the server, when the backend is ready
  ValidateEmail=(email)=> {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true 
    }else{
      return false
    }
    
   
  }
  // handleClick get the data from form HTML
  // right now it is just console.log data
  // will be change to POST data to the server once it is ready 
  handleClick=()=> {
    var name = document.getElementById("name").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var contactInfo1 = document.getElementById("ci1").value;
    var contactInfo2 = document.getElementById("ci2").value;
    var outline = document.getElementById("outline").value;
    var beneficiaries = document.getElementById("beneficiaries").value;
    var benefits = document.getElementById("benefits").value;
    var original = document.getElementById("original").value;
    var used = document.getElementById("used").value;
    console.log(
      name,
      lastname,
      email,
      contactInfo1,
      contactInfo2,
      outline,
      beneficiaries,
      benefits,
      original,
      used
    );
    console.log(this.ValidateEmail(email));
    
  }
  render() {
    return (
      //Form element must be children of <fieldset>
      //Since there is no document, I just inject HTML back to form 
      <fieldset>
        <Row horizontal="center">
          <Column flexGrow={1} horizontal="center">
            <div>
              <h1> Your Details </h1>
            </div>

            <div>
              <label>Name: </label>
            </div>
            <div>
              <input id="name" type="text" />
            </div>

            <div>
              <label>Lastname: </label>
            </div>
            <div>
              <input id="lastname" type="text" />
            </div>

            <div>
              <label>Email: </label>
            </div>
            <div>
              <input id="email" type="email" />
            </div>

            <div>
              <label>Contact informaion 1: </label>
            </div>
            <div>
              <input id="ci1" type="text" />
            </div>

            <div>
              <label>Contact informaion 2: </label>
            </div>
            <div>
              <input id="ci2" type="text" />
            </div>
            <div>
              <label>Briefly outline your project:</label>
            </div>
            <div>
              <textarea id="outline" type="text" />
            </div>

            <div>
              <label>Who will be beneficiaries of the end-product?</label>
            </div>
            <div>
              <textarea id="beneficiaries" type="text" />
            </div>

            <div>
              <label>State the benefits of the end product: </label>
            </div>
            <div>
              <textarea id="benefits" type="text" />
            </div>

            <div>
              <label>
                To your knowledge, how original is the idea or concept
                underlying the end product?{" "}
              </label>
            </div>
            <div>
              <textarea id="original" type="text" />
            </div>

            <div>
              <label>
                State of how you expect the end product will be used?{" "}
              </label>
            </div>
            <div>
              <textarea id="used" type="text" />
            </div>

            <a className="button" onClick={this.handleClick}>
              Submit
            </a>
          </Column>
        </Row>
      </fieldset>
    );
  }
}

export default submitPage;
