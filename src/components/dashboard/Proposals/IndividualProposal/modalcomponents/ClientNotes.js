import React from "react";
import Grid from "@material-ui/core/Grid";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  snackbar: {
    margin: theme.spacing.unit
  }
});

class ClientNotes extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12} />
          <SnackbarContent
            className={classes.snackbar}
            message="This is note 1"
          />
          <SnackbarContent
            className={classes.snackbar}
            message="This is note 2"
          />
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(ClientNotes);
