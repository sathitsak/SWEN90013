import React from "react";
import { Link } from "react-router-dom";
import UniMelbWrapper from "../uniMelbWrapper/UniMelbWrapper";

const style = {
  backgroundColor: "white",
  fontSize: 30
};

export default class Login extends React.Component {
  render() {
    return (
      <UniMelbWrapper>
        <header>
          <h1> Login</h1>
        </header>
        <section>
          <p>Login with your University of Melbourne username and password.</p>
          <form>
            <fieldset  style={{ border: 0, paddingLeft: 0, marginLeft: 0, maxWidth: "25.75rem" }}>
              <div>
                <label>Username: </label>
              </div>
              <div>
                <input id="undernameInput" type="text" />
              </div>
              <div>
                <label>Password: </label>
              </div>
              <div>
                <input id="undernameInput" type="text" />
              </div>
            </fieldset>
            <div>
              <Link to={"/dashboard"} className="button brand" style={{ backgroundColor: "#008a00", borderBottomColor: "#005700" }}>
                Login
              </Link>
            </div>
          </form>
        </section>
      </UniMelbWrapper>
    );
  }
}
