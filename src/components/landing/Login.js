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
            <fieldset style={{ border: 0, padding: 0}}>
              <div style={{ width:"25.75rem"}}>
                <label className="required">Username: </label>
                <input id="undernameInput" type="text" />
              </div>
              <div style={{ width:"25.75rem"}}>
                <label className="required">Password: </label>
                <input id="undernameInput" type="text" />
              </div>
            </fieldset>
            <div>
              <button type="submit" value="login" className="button cta" style={{marginLeft: "18%"}}>
                <Link to={"/dashboard"}>Login</Link>
              </button>
            </div>
          </form>
        </section>
      </UniMelbWrapper>
    );
  }
}
