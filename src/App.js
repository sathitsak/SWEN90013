import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./css/uom.css";

import LandingPage from "./components/landing/LandingPage";
import SubmitPage from "./components/landing/SubmitPage";
import Login from "./components/landing/Login";
import Home from "./components/home/Home";
import DashBoardController from "./components/dashboard/DashBoardController";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/submit" component={SubmitPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={DashBoardController} />
        </Switch>
      </Router>
    );
  }
}

export default App;
