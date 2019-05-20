import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { ProposalContext } from "../../state/Proposal";

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

const ProposalById = props => {
  const { classes, match } = props;

  const [state] = useContext(ProposalContext);
  const proposal = state.filter(p => p.id === parseInt(match.params.id))[0];

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <h1>{proposal.title}</h1>
          {
            <ProposalResponses
              q1={sampleProposal.q1}
              q2={sampleProposal.q2}
              q3={sampleProposal.q3}
              q4={sampleProposal.q4}
            />
          }
        </Grid>
        <Grid item xs={12} sm={6}>
          <ProposalInfo
            client={sampleProposal.client}
            organisation={sampleProposal.organisation}
            status={sampleProposal.status}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(ProposalById);
