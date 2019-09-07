/**
 * This component renders the view all proposals page which gathers all proposals and organises them based on status.
 * This is the main view proposals page and thus sits within the dashboard.
 * Author: Chamira Balasuriya
 */

import React, { useContext } from "react";
import ProposalCard from "./ProposalCard";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button/Button";
import { Link } from "react-router-dom";
import store from "../../../../store";
import { getProposalList } from "../../../../api";
import { getGetAllProposalsAction } from "../../../../store/actionCreators";

const styles = theme => ({
  paper: {
    padding: 10,
    margin: 40,
    backgroundColor: "#f3f3f3",
    width: 390
  },
  link: {
    textDecoration: "none",
    textColor: "white"
  },
  swimTitle: {
    textAlign: "center",
    paddingLeft: "3%",
    paddingBottom: "3%",
    fontWeight: "bold",
    color: "#094183"
  }
});

const status = {
  new: "new",
  approved: "approved"
};

class Proposals extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();

    this._handleStoreChange = this._handleStoreChange.bind(this);
    store.subscribe(this._handleStoreChange);
  }

  _handleStoreChange() {
    this.setState(store.getState());
  }

  async _reqTodoList() {
    const result = await getProposalList();
    console.log(result);
    const action = getGetAllProposalsAction(result);
    store.dispatch(action);
  }

  componentDidMount() {
    this._reqTodoList();
    //http://localhost:13000/api/proposal
  }

  _filterProposalsByStatus = status => {
    const { proposals } = this.state;
    let targetProposals = [];

    proposals.forEach(p => {
      if (p.status === status) {
        targetProposals.push(p);
      }
    });
    console.log("Filtered propsal" + proposals);
    return targetProposals;
  };

  _getFirstCharacter = title => {
    var string = title;
    // return string.charAt(0);
    return "A";
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        spacing={16}
        alignContent="center"
        justify="flex-end"
        direction="row"
      >
        <Grid item sm>
          <Paper className={classes.paper}>
            <Typography variant="h5" className={classes.swimTitle}>
              New
            </Typography>
            <div>
              <List dense={true}>
                {this._filterProposalsByStatus(status.new).map(p => (
                  <ProposalCard
                    key={p._id}
                    id={p._id}
                    title={p._id}
                    organisation={p.name}
                    client={p.name}
                    supervisor={p.name}
                    initial={this._getFirstCharacter(p.name)}
                  />
                ))}
              </List>
            </div>
          </Paper>
        </Grid>
        <Grid item sm>
          <Paper className={classes.paper}>
            <Typography variant="h5" className={classes.swimTitle}>
              Approved
            </Typography>
            <div>
              <List dense={true}>
                {this._filterProposalsByStatus(status.approved).map(p => (
                  <ProposalCard
                    key={p._id}
                    id={p._id}
                    title={p.name}
                    organisation={p.organisation}
                    client={p.client}
                    supervisor={p.supervisor}
                    initial={this._getFirstCharacter(p.name)}
                  />
                ))}
              </List>
            </div>
          </Paper>
        </Grid>

        <Link to={`/dashboard/rejectedProposals`} className={classes.link}>
          <Button
            variant="contained"
            size="medium"
            style={{
              backgroundColor: "#094183",
              color: "#ffffff"
            }}
            className={classes.margin}
          >
            View Rejected Proposals
          </Button>
        </Link>
      </Grid>
    );
  }
}

export default withStyles(styles)(Proposals);
