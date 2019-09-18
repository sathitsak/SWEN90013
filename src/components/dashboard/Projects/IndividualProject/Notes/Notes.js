import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import EmailModal from "../../../email/EmailModal";
import { Grid } from "@material-ui/core";

const styles = {
  notesTitle: {
    textAlign: "center",
    paddingLeft: "3%",
    paddingBottom: "3%",
    fontWeight: "bold",
    color: "#094183"
  }
};

class Notes extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography variant="h5" className={classes.notesTitle}>
          NOTES
        </Typography>
        <Grid align="right">
          <EmailModal />
        </Grid>
      </div>
    );
  }
}

Notes.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Notes);
