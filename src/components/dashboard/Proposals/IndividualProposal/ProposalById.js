import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { ProposalContext } from "../../state/Proposal";
import axios from "axios";

import ProposalInfo from "./ProposalInfo";
import ProposalResponses from "./ProposalResponses";
import {getProposalById} from "../../../../api";
import {getGetProposalByIdAction} from "../../../../store/actionCreators";
import store from "../../../../store";

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

        this.state = store.getState();
    }


    async _reqTodoList(propID) {
        const result = await getProposalById(propID);
         console.log('this page');
         console.log(result)
        const action = getGetProposalByIdAction(result);
        store.dispatch(action);
    }

    componentDidMount() {
        //PASSING THE ID
        const propID = this.props.match.params.id;
        this._reqTodoList(propID);
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
              id={this.state.proposal._id}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(ProposalById);
