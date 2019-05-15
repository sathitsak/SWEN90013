import React from "react";
import PermanentDrawerLeft from "./DashBoard";
import ViewProjectPage from "./ViewProjectPage";
import ViewProposals from "./ViewProposals";

class DashBoardController extends React.Component {
  constructor(props) {
    super(props);
    this.changeToProjectsPage = this.changeToProjectsPage.bind(this);
    this.changeToProposalsPage = this.changeToProposalsPage.bind(this);
    this.state = {
      pageRef: "viewproposalspage"
    };
  }

  changeToProjectsPage() {
    this.setState({
      pageRef: "viewprojectspage"
    });
  }

  changeToProposalsPage() {
    this.setState({
      pageRef: "viewproposalspage"
    });
  }

  render() {
    switch (this.state.pageRef) {
      case "viewprojectspage":
        return (
          <PermanentDrawerLeft
            main={<ViewProjectPage />}
            buttonFunctionViewProjects={this.changeToProjectsPage}
            buttonFunctionViewProposals={this.changeToProposalsPage}
          />
        );
      case "viewproposalspage":
        return (
          <PermanentDrawerLeft
            main={<ViewProposals />}
            buttonFunctionViewProjects={this.changeToProjectsPage}
            buttonFunctionViewProposals={this.changeToProposalsPage}
          />
        );
    }
  }
}

export default DashBoardController;
