import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const styles = {
  description: {
    overflow: "auto",
    textAlign: "justify",
    paddingLeft: 10,
    marginLeft: 20,
    height: 170
  }
};

class Description extends React.Component {
  render() {
    const { classes, description } = this.props;

    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography align="left" variant="h6">
              Description:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Paper className={classes.description}>{description}</Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Description.propTypes = {
  classes: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired
};

export default withStyles(styles)(Description);
