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
import Projects from "./components/dashboard/Projects/AllProjects/Projects";
import ProposalById from "./components/dashboard/Proposals/IndividualProposal/ProposalById";
import ProjectById from "./components/dashboard/Projects/IndividualProject/ProjectById";
import { ProposalProvider } from "./components/dashboard/state/Proposal";
import ProjectDetail from "./components/dashboard/Projects/IndividualProject/ProjectDetail";
import RejectedProposals from "./components/dashboard/Proposals/AllProposals/RejectedProposals";

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
            <Route exact path="/rejectedProposals" component={RejectedProposals} />
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
                        <Route path={`${path}/:id`} component={ProjectDetail} />
                      </Fragment>
                    )}
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
