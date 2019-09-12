import React, { useContext } from "react";
import axios from "axios";
import ProposalCard from "./ProposalCard";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import grey from "@material-ui/core/colors/grey";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button/Button";
import { Link } from "react-router-dom";
import store from "../../../../store";
import { getProposalList } from "../../../../api";
import { getGetAllProposalsAction } from "../../../../store/actionCreators";
import { endianness } from "os";

// {title: 'test'}
// new proposals works, just going to new proposal array
//Proposal card structure
// key={p.id}
// id={p.id}
// title={p.name}
// organisation={p.organisation}
// client={p.client}
// supervisor={p.supervisor}
// initial={this._getFirstCharacter(p.name)}

const styles = theme => ({
  paper: {
    padding: 10,
    margin: 10,
    backgroundColor: grey[50],
    [theme.breakpoints.up("xl")]: {
      width: 600
    },
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
  },
  rejectedButton: {
    position: "absolute",
    color: "#ffffff",
    backgroundColor: "#094183",
      '&:hover': {
          backgroundColor: "#4074B2",
          color: "#ffffff",
    },
    [theme.breakpoints.up("xl")]: {
      marginRight: 198
    },
    [theme.breakpoints.down("xl")]: {
      right: 0
    },
    bottom: 0
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
      console.log(p._id)
      // First check if valid before sending through
      if ('client' in p ) {
        console.log(p.client)
        if ('organisation' in p.client) {
          if (p.status === status) {
            console.log(p.status)
            targetProposals.push(p);
          }
        }
      }
      
    });
    console.log("Filtered propsal" + proposals);
    return targetProposals;
  };

  render() {
    const { classes } = this.props;

    return (
      <div style={{position: "relative"}}>
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
                    proposal={p}
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
                    proposal={p}
                    // title={p.name}
                    // organisation={p.client.organisation}
                    // client={p.client}
                    // supervisor={p.supervisor}
                  />
                ))}
              </List>
            </div>
          </Paper>
        </Grid>   
      </Grid>
      <Link to={`/dashboard/rejectedProposals`} className={classes.link}>
            <Button
              variant="contained"
              size="medium"
              className={classes.rejectedButton}
            >
              View Rejected Proposals
            </Button>
          </Link>
      </div>
    );
  }
}

export default withStyles(styles)(Proposals);
