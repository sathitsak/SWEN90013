import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";

class ClientOrgAndContact extends React.Component {
  render() {
    return (
      <div style={{ marginTop: 30 }}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h3>Organisation</h3>
            <Chip label="Name" style={{ marginRight: 20 }} />
            Hampers for the homeless
            <br />
            <br />
            <br />
            <Chip label="Size" style={{ marginRight: 20 }} />
            10 employees
            <br />
            <br />
            <br />
            <Chip label="Industry" style={{ marginRight: 20 }} />
            Health and Welfare Services
            <br />
            <br />
            <br />
            <Chip label="Description" style={{ marginRight: 20 }} />
            <p>
              Hampers for the homeless is a charity organisation that gives out
              Hampershandouts during Christmas each year
            </p>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ClientOrgAndContact;
