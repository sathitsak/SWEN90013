import React from "react";
import { Link } from "react-router-dom";
import UniMelbWrapper from "../uniMelbWrapper/UniMelbWrapper";

var unimelb = require("../../images/idea1.jpg");

class LandingPage extends React.Component {
  render() {
    return (
      <UniMelbWrapper>
        <div className="floating" />
        <div
          id="header"
          className="contrast-helper"
          style={{ backgroundImage: "url(" + unimelb + ")" }}
        >
          <header className="banner">
            <div className="mid-align">
              <h1>Software Engineering Projects</h1>
              <p>
                Work with Australia's upcoming software engineers to build a
                system suited for your own needs
              </p>
            </div>
          </header>
        </div>
        <section className="fullwidth short fixed-background">
          <ul className="pathfinder-3">
            <li>
              <a>
                <strong style={{ height: "12em" }}>
                  <span style={{ top: "50%" }}>
                    <i
                      className="material-icons md-48"
                      style={{
                        marginTop: "0%",
                        fontSize: "70px"
                      }}
                    >
                      youtube_searched_for
                    </i>
                    <br />
                    Research
                  </span>
                </strong>
                <p>
                  Students will work closely with you to analyse the problem
                  domain and formulate your requirements.
                </p>
              </a>
            </li>
            <li>
              <a>
                <strong style={{ height: "12em" }}>
                  <span style={{ top: "50%" }}>
                    <i
                      className="material-icons md-48"
                      style={{
                        marginTop: "0%",
                        fontSize: "70px"
                      }}
                    >
                      palette
                    </i>
                    <br />
                    Design
                  </span>
                </strong>
                <p>
                  Using the insights gained, you will work with our students to
                  design your software system and determine the look and feel of
                  your product.
                </p>
              </a>
            </li>
            <li>
              <a>
                <strong style={{ height: "12em" }}>
                  <span style={{ top: "50%" }}>
                    <i
                      className="material-icons md-48"
                      style={{
                        marginTop: "0%",
                        fontSize: "70px"
                      }}
                    >
                      build
                    </i>
                    <br />
                    Build
                  </span>
                </strong>
                <p>
                  Our scrum-based agile methodology will provide you with
                  iterative builds, which will give you confidence in your final
                  product.
                </p>
              </a>
            </li>
            <li>
              <a>
                <strong style={{ height: "12em" }}>
                  <span style={{ top: "50%" }}>
                    <i
                      className="material-icons md-48"
                      style={{
                        marginTop: "0%",
                        fontSize: "70px"
                      }}
                    >
                      supervisor_account
                    </i>
                    <br />
                    Mentored
                  </span>
                </strong>
                <p>
                  Students are guided by leading software experts in developing
                  the technical expertise and skills required to implement your
                  product vision.
                </p>
              </a>
            </li>
          </ul>
        </section>
        <section className="alt">
          <div className="half">
            <section>
              <figure className="figure figure--max">
                <div className="embed figure__content">
                  <iframe
                    allowFullScreen=""
                    frameBorder="0"
                    height="315"
                    src="//www.youtube.com/embed/8ZQWDeaTs3U"
                    title="video player"
                    width="560"
                  />
                </div>
              </figure>
            </section>
            <section>
              <h1>Our past projects</h1>
              <p>
                We have worked on a wide range of web and mobile app solutions,
                solving non-critical business problems in a variety of
                industries. Here is a video of a past project completed by our
                students in 2018.
              </p>
            </section>
          </div>
        </section>
        <section className="full-width short">
          <h1>Interested?</h1>
          <p>
            Submit a project proposal for our software engineering master
            students to undertake as part of their coursework. Once submitted, a
            staff member will be in touch with you shortly.
            <br />
            <br />
            <Link
              to="/submit"
              className="button-hero"
              style={{ marginLeft: "0%" }}
            >
              Submit a proposal now
            </Link>
            <Link
              to={"/login"}
              className="button-hero"
              style={{ marginLeft: "28%" }}
            >
              Staff Log In
            </Link>
          </p>
        </section>
      </UniMelbWrapper>
    );
  }
}

export default LandingPage;
