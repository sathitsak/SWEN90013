import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { ProposalContext } from "../../state/Proposal";
import axios from "axios";

import ProposalInfo from "./ProposalInfo";
import ProposalResponses from "./ProposalResponses";

const sampleProposal = {
  status: "new",
  q1: "response 1",
  q2: "response 2",
  q3: "response 3",
  q4:
    "Lorem ipsum dolor sit amet, in sea animal facilis, cu reque aeque noster per, vim et expetendis percipitur. Te vel nisl posse maiestatis, sea quot reque ei. Per iisque facilisis hendrerit eu, vix no legere utroque. Ut aliquip tibique eam, alia appetere antiopam vel eu",
  organisation: "Hampers for the homeless",
  client: "Philip Dart"
};

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class ProposalById extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      proposal: []
    };
  }

  componentDidMount() {
    //PASSING THE ID
    const propID = this.props.match.params.id;
    axios
      .get(`https://5ce79b719f2c390014dba00f.mockapi.io/proposal/` + propID)
      .then(results => {
        this.setState({ proposal: results.data });
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            {
              <ProposalResponses
                q1={this.state.proposal.outlineOfProject}
                q2={this.state.proposal.endProductBenefits}
                q3={this.state.proposal.endProductUse}
                q4={this.state.proposal.beneficiaries}
              />
            }
          </Grid>
          <Grid item xs={12} sm={6}>
            <ProposalInfo
              client={this.state.proposal.client}
              organisation={this.state.proposal.organisation}
              status={this.state.proposal.status}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(ProposalById);
