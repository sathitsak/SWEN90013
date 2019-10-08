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
  },
  title: {
    textAlign: "center",
    paddingBottom: "3%",
    fontWeight: "bold",
    color: "#094183"
  }
});

class ClientOrg extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h5 className={classes.title}>ORGANISATION</h5>

          <Grid container spacing={8}>
            <Grid item md={2} xs={4}>
              <div className={classes.orgHeader}>Name</div>
            </Grid>
            <Grid item md={6} xs={4}>
              <div className={classes.orgInfo}>{this.props.orgName}</div>
            </Grid>
          </Grid>

          <Grid container spacing={8}>
            <Grid item md={2} xs={4}>
              <div className={classes.orgHeader}>Size</div>
            </Grid>
            <Grid item md={6} xs={4}>
              <div className={classes.orgInfo}>{this.props.orgSize}</div>
            </Grid>
          </Grid>

          <Grid container spacing={8}>
            <Grid item md={2} xs={4}>
              <div className={classes.orgHeader}>Industry</div>
            </Grid>
            <Grid item md={6} xs={4}>
              <div className={classes.orgInfo}>{this.props.industry ? this.props.industry : " "}</div>
            </Grid>
          </Grid>

          <Grid container spacing={8}>
            <Grid item xs={12}>
              <div className={classes.orgHeader} style={{marginBottom: 5}}>Description</div>
            </Grid>
            <Grid item xs={12} className={classes.orgInfo}>
              {this.props.description}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ClientOrg);
