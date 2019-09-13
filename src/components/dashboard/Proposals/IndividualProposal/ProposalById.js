import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import ProposalInfo from "./ProposalInfo";
import ProposalResponses from "./ProposalResponses";
import Notes from "../../Notes/Notes";
import { getProposalById } from "../../../../api";
import { getProposalByIdAction } from "../../../../store/actionCreators";
import store from "../../../../store";

import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    height: "400px"
  }
});

class ProposalById extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    proposal: ""
  };

  async _reqTodoList(propID) {
    const proposalResult = await getProposalById(propID);
    const proposalAction = getProposalByIdAction(proposalResult);
    store.dispatch(proposalAction);
  }

  componentDidMount() {
    //PASSING THE ID
    const propID = this.props.match.params.id;
    this._reqTodoList(propID);
  }

  _handleChange = () => {
    this.setState({ proposal: store.getState().proposal });
  };

  unsubscribe = store.subscribe(this._handleChange);

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={8}>
            {
              <ProposalResponses
                q1={this.state.proposal.outlineOfProject}
                q2={this.state.proposal.beneficiaries}
                q3={this.state.proposal.endProductBenefits}
                q4={this.state.proposal.originality}
                q5={this.state.proposal.endProductUse}
              />
            }
          </Grid>

          {this.state.proposal.client ? 
            <Grid item xs={12} sm={4}>
              <Paper className={classes.paper} style={{ marginTop: "20px" }}>
                <ProposalInfo  
                  client={this.state.proposal.client}              
                  status={this.state.proposal.status}
                  id={this.state.proposal._id}
                />
                {console.log(this.state.proposal.client)}
              </Paper>
            </Grid>
          : <div/> }
          
          {this.state.proposal.notes ? 
            <Grid item xs={12} className={classes.notes}>
              <Paper className={classes.paper} style={{ padding: "2% 3% 3% 3%", marginBottom: "20px", height: "auto" }}>
                  <Notes 
                    notes={this.state.proposal.notes}
                  />
              </Paper>
            </Grid>
          : <div/> }
          
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(ProposalById);
