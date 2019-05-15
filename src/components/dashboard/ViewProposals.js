import React, { Component } from "react";
import ProposalCard from "./ProposalCard";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";

const proposals = [
  {
    title: "Hampers for the Homeless",
    client: "Stephanie Armther",
    organisation: "Food4Poor",
    status: "new",
    supervisor: "Eduardo"
  },
  {
    title: "Fire Quiz App",
    client: "Mike Poloni",
    organisation: "FBE",
    status: "new",
    supervisor: "Eduardo"
  },
  {
    title: "PMS",
    organisation: "UniMelb",
    client: "Philip Dart",
    status: "approved",
    supervisor: "Greg"
  },
  {
    title: "Hospital Scheduling",
    organisation: "St Vincents",
    client: "Lori Platoon",
    status: "new",
    supervisor: "Greg"
  },
  {
    title: "Stroke Rehab",
    organisation: "UniMelb Eng",
    client: "Vincent Petersbourg",
    status: "approved",
    supervisor: "Linda"
  }
];

const status = {
  new: "new",
  approved: "approved"
};
// {title: 'test'}
// new proposals works, just going to new proposal array

class ViewProposals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "Philip",
      coordinator: true
    };
  }

  //enables changing of the user and the coordinator to determine what they see

  filterProposals = status => {
    let targetProposals = [];

    proposals.forEach(proposal => {
      if (proposal.status === status) {
        targetProposals.push(proposal);
      }
    });
    return targetProposals;
  };

  render() {
    return (
      <Grid
        container
        spacing={16}
        alignContent="center"
        justify="flex-end"
        direction="row"
      >
        <Grid item xs={6} md={6}>
          <Typography variant="h6">New</Typography>
          <div>
            <List dense={true}>
              {this.filterProposals(status.new).map(p => (
                <ProposalCard
                  title={p.title}
                  organisation={p.organisation}
                  client={p.client}
                  supervisor={p.supervisor}
                />
              ))}
            </List>
          </div>
        </Grid>
        <Grid item xs={6} md={6}>
          <Typography variant="h6">Accepted</Typography>
          <div>
            <List dense={true}>
              {this.filterProposals(status.new).map(p => (
                <ProposalCard
                  title={p.title}
                  organisation={p.organisation}
                  client={p.client}
                  supervisor={p.supervisor}
                />
              ))}
            </List>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default ViewProposals;
