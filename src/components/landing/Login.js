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
            <fieldset>
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
              <button type="submit" value="login" class="button cta">
                <Link to={"/dashboard"}>Login</Link>
              </button>
            </div>
          </form>
        </section>
      </UniMelbWrapper>
    );
  }
}
