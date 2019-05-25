import React, { useContext } from "react";
import axios from "axios";
import ProposalCard from "./ProposalCard";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import { ProposalContext } from "../../state/Proposal";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

// {title: 'test'}
// new proposals works, just going to new proposal array

const styles = theme => ({
  paper: {
    padding: 10,
    margin: 40,
    backgroundColor: "#8BBAEE",
    width: 390
  }
});

const status = {
  new: "new",
  approved: "approved"
};

class Proposals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      proposals: []
    };
  }

  componentDidMount() {
    axios
      .get(`https://5ce79b719f2c390014dba00f.mockapi.io/proposal/`)
      .then(results => {
        this.setState({ proposals: results.data });
      });
  }

  _filterProposalsByStatus = status => {
    const { proposals } = this.state;
    let targetProposals = [];

    proposals.forEach(p => {
      if (p.status === status) {
        targetProposals.push(p);
      }
    });
    console.log(proposals);
    return targetProposals;
  };

  _getFirstCharacter = title => {
    var string = title;
    return string.charAt(0);
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
            <Typography
              variant="h5"
              style={{ textAlign: "center", color: "#FFFFFF" }}
            >
              New
            </Typography>
            <div>
              <List dense={true}>
                {this._filterProposalsByStatus(status.new).map(p => (
                  <ProposalCard
                    key={p.id}
                    id={p.id}
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
        <Grid item sm>
          <Paper className={classes.paper}>
            <Typography
              variant="h5"
              style={{ textAlign: "center", color: "#FFFFFF" }}
            >
              Approved
            </Typography>
            <div>
              <List dense={true}>
                {this._filterProposalsByStatus(status.approved).map(p => (
                  <ProposalCard
                    key={p.id}
                    id={p.id}
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
      </Grid>
    );
  }
}

export default withStyles(styles)(Proposals);