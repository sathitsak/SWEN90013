import React from "react";
import { Link } from "react-router-dom";
import UniMelbWrapper from "../uniMelbWrapper/UniMelbWrapper";
import { LoginContext } from "../admin/LoginProvider";
import {baseURL} from "../../api/index"
import axios from 'axios'


const style = {
  backgroundColor: "white",
  fontSize: 30
}; 

var valueOfContext = "";
var val = "";

export default class Login extends React.Component {  

  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      uomAuth: false,
      rootUserAuth:false
    };

    this._handleChange = this._handleChange.bind(this);
    this._handleOnClick = this._handleOnClick.bind(this);
  }

  _handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  _ldapLogin() {
    axios.post(baseURL+'/login', {
      username: this.state.username,
      password: this.state.password,
      })
      .then(response => {
        valueOfContext.updateUserName(response.data.displayName);
        this.setState({uomAuth: true})
      })
      .catch(error => {
      });
  }

  _handleStateChange() {
    //WORKS 
   

    if (val == "rootUser") {
      valueOfContext.authenticateRootUser();
    } else if (val == "authUser") {
      valueOfContext.authenticateUser();
    }
  }

 

  _handleOnClick = () => {
    valueOfContext = this.context;
   
    this._ldapLogin(); 
    if (this.state.username == "root" && this.state.password == "root") {
      val = "rootUser";
    } else if (this.state.uomAuth==true) {
      val = "authUser";
    } else {
      val = "noUser";
    }
    return val;
  };


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
              <input
                  id="username"
                  type="text"
                  value={this.state.username}
                  onChange={this._handleChange}
                />
              </div>
              <div>
                <label>Password: </label>
              </div>
              <div>
              <input
                  id="password"
                  type="password"
                  value={this.state.password}
                  onChange={this._handleChange}
                />
              </div>
            </fieldset>
            <div>
              <Link to={
                  this._handleOnClick() == "rootUser"
                  ? "/admin"
                  : this._handleOnClick() == "authUser"
                  ? "/dashboard"
                  : "/login"
                }
                onClick={() => this._handleStateChange()}
                className="button brand" style={{ backgroundColor: "#008a00", borderBottomColor: "#005700" }}>
                Login
              </Link>
            </div>
          </form>
        </section>
      </UniMelbWrapper>
    );
  }
}
