import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

// import ProposalInfo from "./components/ProposalInfo";
// import ProposalResponses from "./components/ProposalResponses";

// const sampleProposal = {
//   status: "new",
//   q1: "response 1",
//   q2: "response 2",
//   q3: "response 3",
//   q4:
//     "Lorem ipsum dolor sit amet, in sea animal facilis, cu reque aeque noster per, vim et expetendis percipitur. Te vel nisl posse maiestatis, sea quot reque ei. Per iisque facilisis hendrerit eu, vix no legere utroque. Ut aliquip tibique eam, alia appetere antiopam vel eu",
//   client: "Philip Dart",
//   organisation: "Hampers for the homeless"
// };

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

class ProjectById extends React.Component {
  render() {
    const { classes, match } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <h1>I am an individual Project: {match.params.id}</h1>
            {/* <ProposalResponses
              q1={sampleProposal.q1}
              q2={sampleProposal.q2}
              q3={sampleProposal.q3}
              q4={sampleProposal.q4}
            /> */}
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* <ProposalInfo
              client={sampleProposal.client}
              organisation={sampleProposal.organisation}
              status={sampleProposal.status}
            /> */}
          </Grid>
        </Grid>
      </div>
    );
  }
}

ProjectById.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectById);
