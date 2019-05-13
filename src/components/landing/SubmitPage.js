import React from "react";
import {Column, Row} from "simple-flexbox";

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
    // handleClick get the data from form HTML
    // right now it is just console.log data
    // will be change to POST data to the server once it is ready
    handleClick = () => {
        var name = document.getElementById("name").value;
        var lastname = document.getElementById("lastname").value;
        var email = document.getElementById("email").value;
        var contactInfo1 = document.getElementById("ci1").value;
        var contactInfo2 = document.getElementById("ci2").value;
        var officeNumber = document.getElementById("officeNumber").value;
        var outline = document.getElementById("outline").value;
        var beneficiaries = document.getElementById("beneficiaries").value;
        var benefits = document.getElementById("benefits").value;
        var original = document.getElementById("original").value;
        var used = document.getElementById("used").value;
        var hear = document.getElementById("hear").value;
        var technical = document.getElementById("technical").value;
        var organizationName = document.getElementById("organizationName").value;
        var idustryType = document.getElementById("idustryType").value;
        var size = document.getElementById("size").value;
        var organisationBrief = document.getElementById("organisationBrief").value;
        var projectName = document.getElementById("projectName").value;
        console.log(
            name,
            lastname,
            email,
            contactInfo1,
            contactInfo2,
            officeNumber,
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
            used,
            hear
        );
        if (
            (name || lastname || email || contactInfo1 || contactInfo2 ||
                officeNumber || organizationName || organisationBrief ||
                projectName || outline || beneficiaries || benefits || original) === "" ||
            (technical || idustryType || size || hear) == -1
        ) {
            console.log("please fill every form");
        }

        console.log(this.ValidateEmail(email));
    };

    render() {
        return (
            <div className="uomcontent">
                <div className="page-inner">
                    <div role="main">
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
                                        <input id="name" type="text"/>
                                    </div>

                                    <div>
                                        <label>Lastname: </label>
                                    </div>
                                    <div>
                                        <input id="lastname" type="text"/>
                                    </div>

                                    <div>
                                        <label>Email: </label>
                                    </div>
                                    <div>
                                        <input id="email" type="email"/>
                                    </div>

                                    <div>
                                        <label>Contact informaion 1: </label>
                                    </div>
                                    <div>
                                        <input id="ci1" type="text"/>
                                    </div>

                                    <div>
                                        <label>Contact informaion 2: </label>
                                    </div>
                                    <div>
                                        <input id="ci2" type="text"/>
                                    </div>

                                    <div>
                                        <label>Office number: </label>
                                    </div>
                                    <div>
                                        <input id="officeNumber" type="text"/>
                                    </div>

                                    <div>
                                        <select id="technical">
                                            <option value="-1">
                                                Rate your level of technical
                                                ability/understanding&emsp;
                                            </option>
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

                                    <div>
                                        <label>Organisation name:</label>
                                    </div>
                                    <div>
                                        <input id="organizationName" type="text"/>
                                    </div>

                                    <div>
                                        <select id="idustryType">
                                            <option value="-1">Please select your
                                                industry&emsp;</option>
                                            <option value="Aged care">Aged care</option>
                                            <option value="Agriculture">Agriculture</option>
                                            <option value="Amusement, evens and recreation">
                                                Amusement, evens and recreation
                                            </option>
                                            <option
                                                value="Animal care and veterinary services">
                                                Animal care and veterinary services
                                            </option>
                                            <option value="Children’s services">Children’s
                                                services
                                            </option>
                                            <option value="Commercial sales ">Commercial
                                                sales
                                            </option>
                                            <option value="Education">Education</option>
                                            <option value="Graphic arts">Graphic arts
                                            </option>
                                            <option value="Hair and beauty ">Hair and
                                                beauty
                                            </option>
                                            <option value="Health and welfare services">
                                                Health and welfare services
                                            </option>
                                            <option value="Hospitality ">Hospitality
                                            </option>
                                            <option
                                                value="Indigenous organisations and services">
                                                Indigenous organisations and services
                                            </option>
                                            <option value="Journalism">Journalism</option>
                                            <option value="Local government administration">
                                                Local government administration
                                            </option>
                                            <option
                                                value="Market and business consultancy services">
                                                Market and business consultancy services
                                            </option>
                                            <option value="Miscellaneous">Miscellaneous
                                            </option>
                                            <option value="Real estate">Real estate</option>
                                            <option value="Restaurants">Restaurants</option>
                                            <option value="Retail">Retail</option>
                                            <option
                                                value="Social, community, home care and disability services">
                                                Social, community, home care and disability
                                                services
                                            </option>
                                            <option value="Sporting organisations">
                                                Sporting organisations
                                            </option>
                                            <option value="Storage services">Storage
                                                services
                                            </option>
                                            <option value="Technical services">Technical
                                                services
                                            </option>
                                            <option value="Telecommunications services">
                                                Telecommunications services
                                            </option>
                                            <option value="Tourism">Tourism</option>
                                        </select>
                                    </div>

                                    <div>
                                        <select id="size">
                                            <option value="-1">
                                                Size of
                                                organisation &emsp;&emsp;&emsp;&emsp;
                                                &emsp;&emsp;&emsp;&emsp; &emsp;&emsp;&emsp;&emsp; &emsp;
                                            </option>
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

                                    <div>
                                        <label>Briefly describe what your organisation
                                            does:</label>
                                    </div>
                                    <div>
                                        <textarea id="organisationBrief" type="text"/>
                                    </div>

                                    <div>
                                        <label>Provide a short name for your
                                            project:</label>
                                    </div>
                                    <div>
                                        <textarea id="projectName" type="text"/>
                                    </div>

                                    <div>
                                        <label>Briefly outline your project:</label>
                                    </div>
                                    <div>
                                        <textarea id="outline" type="text"/>
                                    </div>

                                    <div>
                                        <label>Who will be beneficiaries of the
                                            end-product?</label>
                                    </div>
                                    <div>
                                        <textarea id="beneficiaries" type="text"/>
                                    </div>

                                    <div>
                                        <label>State the benefits of the end
                                            product: </label>
                                    </div>
                                    <div>
                                        <textarea id="benefits" type="text"/>
                                    </div>

                                    <div>
                                        <label>
                                            To your knowledge, how original is the idea or
                                            concept
                                            underlying the end product?{" "}
                                        </label>
                                    </div>
                                    <div>
                                        <textarea id="original" type="text"/>
                                    </div>

                                    <div>
                                        <label>
                                            State of how you expect the end product will be
                                            used?{" "}
                                        </label>
                                    </div>
                                    <div>
                                        <textarea id="used" type="text"/>
                                    </div>
                                    <div>
                                        <select id="hear">
                                            <option value="-1">
                                                How did you hear about
                                                us?&emsp;&emsp;&emsp;&emsp;
                                            </option>
                                            <option value="Referred by a friend">
                                                Referred by a friend
                                            </option>
                                            <option value="Philip Dart">
                                                Referred by a Unimelb staff member(Philip
                                                Dart)
                                            </option>
                                            <option value="duardo Oliveira">
                                                Referred by a Unimelb staff member(Eduardo
                                                Oliveira)
                                            </option>
                                            <option value="Leon Sterling">
                                                Referred by a Unimelb staff member(Leon
                                                Sterling)
                                            </option>
                                        </select>
                                    </div>
                                    <a className="button" onClick={this.handleClick}>
                                        Submit
                                    </a>
                                </Column>
                            </Row>
                        </fieldset>
                    </div>
                </div>
            </div>
        );
    }
}

export default SubmitPage;
