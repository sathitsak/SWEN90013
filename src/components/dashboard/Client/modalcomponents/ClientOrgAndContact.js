import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    marginRight: "20px"
  },
  orgHeader: {
    fontWeight: "bold",
    color: "#094183"
  },
  orgInfo: {
    marginBottom: 10,
    color: "#000000",
    textAlign: "justify"
  }
});

class ClientOrgAndContact extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <h5 style={{ color: "#094183", fontWeight: "bold" }}>Organisation</h5>

          <Grid container spacing={3}>
            <Grid item xs={2}>
              <div className={classes.orgHeader}>Name</div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.orgInfo}>Hampers for the homeless</div>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={2}>
              <div className={classes.orgHeader}>Size</div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.orgInfo}>10 employees</div>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={2}>
              <div className={classes.orgHeader}>Industry</div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.orgInfo}>Health and Welfare Services</div>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div className={classes.orgHeader} style={{marginBottom: 5}}>Description</div>
            </Grid>
            <Grid item xs={12} className={classes.orgInfo}>
              Hampers for the homeless is a charity organisation that gives out
              Hampershandouts during Christmas each year
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ClientOrgAndContact);
