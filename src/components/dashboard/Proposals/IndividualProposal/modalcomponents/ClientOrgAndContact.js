import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";

const styles = {
  button: {
    marginRight: "20px"
  }
};

class ClientOrgAndContact extends React.Component {
  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <h3>Organisation</h3>
          <Button variant="contained" style={styles.button}>
            Name
          </Button>
          Hampers for the homeless
          <br />
          <br />
          <Button variant="contained" style={styles.button}>
            Size
          </Button>
          10 employees
          <br />
          <br />
          <Button variant="contained" style={styles.button}>
            Industry
          </Button>
          Health and Welfare Services
          <br />
          <br />
          <Button variant="contained" style={styles.button}>
            Description
          </Button>
          <p>
            Hampers for the homeless is a charity organisation that gives out
            Hampershandouts during Christmas each year
          </p>
          <br />
          <br />
          <br />
        </Grid>
      </Grid>
    );
  }
}

export default ClientOrgAndContact;
