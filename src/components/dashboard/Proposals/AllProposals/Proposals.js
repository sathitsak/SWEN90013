import React, { useContext } from "react";
import axios from "axios";
import ProposalCard from "./ProposalCard";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import { ProposalContext } from "../../state/Proposal";

// {title: 'test'}
// new proposals works, just going to new proposal array

const Proposals = () => {
  const [state, setState] = useContext(ProposalContext);

  if (state === undefined) {
    axios
      .get(`http://swapi.co/api/people`)
      .then(({ results }) => setState(results))
      .catch(() =>
        setState([
          {
            id: 1,
            title: "Hampers for the Homeless",
            client: "Stephanie Armther",
            organisation: "Food4Poor",
            status: "new",
            supervisor: "Eduardo"
          },
          {
            id: 2,
            title: "Fire Quiz App",
            client: "Mike Poloni",
            organisation: "FBE",
            status: "new",
            supervisor: "Eduardo"
          }
        ])
      );
    return <p>Loading...</p>;
  }

  if (state.length === 0) {
    return <p>No proposals found.</p>;
  }

  const newProposals = state.filter(p => p.status === "new");

  const approvedProposals = state.filter(p => p.status === "approved");

  //enables changing of the user and the coordinator to determine what they see

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
            {newProposals.map(p => (
              <ProposalCard
                key={p.id}
                id={p.id}
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
            {approvedProposals.map(p => (
              <ProposalCard
                key={p.id}
                id={p.id}
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
};

export default Proposals;
