import React from "react";
import { Link } from "react-router-dom";

const style = {
  backgroundColor: "white",
  fontSize: 30
};

export default class Login extends React.Component {
  render() {
    return (
      <div>
        <Link to={"/dashboard"}>Log in here</Link>
      </div>
    );
  }
}
