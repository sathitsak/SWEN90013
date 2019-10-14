import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect, 
  withRouter
} from "react-router-dom";

import LandingPage from "./components/landing/LandingPage";
import SubmitPage from "./components/landing/SubmitPage";
import Login from "./components/landing/Login";
import Home from "./components/home/Home";
import AppContainer from "./components/dashboard/AppContainer/AppContainer";
import Proposals from "./components/dashboard/Proposals/AllProposals/Proposals";
import { ProposalProvider } from "./components/dashboard/state/Proposal";
import Projects from "./components/dashboard/Projects/AllProjects/Projects";
import ProposalById from "./components/dashboard/Proposals/IndividualProposal/ProposalById";
import ProjectById from "./components/dashboard/Projects/IndividualProject/ProjectById"; 

import AllProposals from "./components/dashboard/Proposals/AllProposals/AllProposals";
import AllProjects from "./components/dashboard/Projects/AllProjects/AllProjects";
import AllStudentTeams from "./components/dashboard/Projects/IndividualProject/StudentTeam/AllStudentTeams";
import AllClients from "./components/dashboard/Client/AllClients";


import Admin from "./components/admin/AdminPage"
import LoginProvider, {LoginContext} from "./components/admin/LoginProvider"; 


const RootUserRoute = ({ component: Component, ...rest }) => (
  <LoginContext.Consumer>
    {context => (
      <Route
        {...rest}
        render={props =>
          context.state.isAuthenticatedRoot == true ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    )}
  </LoginContext.Consumer>
); 

const AuthenticatedUserRoute = ({ component: Component, ...rest }) => (
  <LoginContext.Consumer>
    {context => (
      <Route
        {...rest}
        render={props =>
          context.state.isAuthenticatedUser == true ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    )}
  </LoginContext.Consumer>
);




class App extends React.Component {
  render() {
    return (
      <Router>
        <ScrollToTopWithRouter>
          <LoginProvider>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/submit" component={SubmitPage} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <RootUserRoute exact path="/admin" component={Admin}/> 

            <Route
              path="/dashboard"
              render={({ match: { path } }) => (
                <AppContainer>
                  <ProposalProvider>
                    <AuthenticatedUserRoute exact path={`${path}/`} component={Proposals} />
                    <AuthenticatedUserRoute
                      path={`${path}/proposals/:id`}
                      component={ProposalById}
                    />
                  </ProposalProvider>

                  <Route
                    path={`${path}/projects`}
                    render={({ match: { path } }) => (
                      <Fragment>
                        <AuthenticatedUserRoute exact path={`${path}/`} component={Projects} />
                        <AuthenticatedUserRoute path={`${path}/:id`} component={ProjectById} />
                      </Fragment>
                    )}
                  />

                  <AuthenticatedUserRoute
                    path={`${path}/allProposals`}
                    component={AllProposals}
                  />
                  <AuthenticatedUserRoute
                    path={`${path}/allProjects`}
                    component={AllProjects}
                  />
                  <AuthenticatedUserRoute
                    path={`${path}/teams`}
                    component={AllStudentTeams}
                  />
                  <AuthenticatedUserRoute
                    path={`${path}/clients`}
                    component={AllClients}

                  />
                </AppContainer>
              )}
            />
          </Switch>
          </LoginProvider>
        </ScrollToTopWithRouter>
      </Router>
    );
  }
}

export default App;

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

const ScrollToTopWithRouter = withRouter(ScrollToTop);
