import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
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
import AllProducts from "./components/dashboard/Products/AllProducts";
import AllClients from "./components/dashboard/Client/AllClients";

class App extends React.Component {
  render() {
    return (
      <Router>
        <ScrollToTopWithRouter>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/submit" component={SubmitPage} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />

            <Route
              path="/dashboard"
              render={({ match: { path } }) => (
                <AppContainer>
                  <ProposalProvider>
                    <Route exact path={`${path}/`} component={Proposals} />
                    <Route
                      path={`${path}/proposals/:id`}
                      component={ProposalById}
                    />
                  </ProposalProvider>

                  <Route
                    path={`${path}/projects`}
                    render={({ match: { path } }) => (
                      <Fragment>
                        <Route exact path={`${path}/`} component={Projects} />
                        <Route path={`${path}/:id`} component={ProjectById} />
                      </Fragment>
                    )}
                  />
                  <Route
                    path={`${path}/allProposals`}
                    component={AllProposals}
                  />
                  <Route
                    path={`${path}/allProjects`}
                    component={AllProjects}
                  />
                  <Route
                    path={`${path}/teams`}
                    component={AllProducts}
                  />
                  <Route
                    path={`${path}/clients`}
                    component={AllClients}
                  />
                </AppContainer>
              )}
            />
          </Switch>
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
