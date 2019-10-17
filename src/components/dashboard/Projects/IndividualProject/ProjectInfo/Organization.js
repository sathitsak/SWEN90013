import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  organisation: {
    overflow: "auto",
    textAlign: "justify",
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    height: 35,
    marginRight: 10,
    marginTop: "2%",
    marginBottom: "1%",
    color: "#000000",
    [theme.breakpoints.down("sm")]: {
        marginRight: 30
    },
}
});

class Organization extends React.Component {
  render() {
    const { classes, orgName } = this.props;

    return (
      <div>
        <Typography align="left" color="textSecondary" variant="h6" style={{ fontWeight: "bold"}}>
          Organization:
        </Typography>
        <Paper className={classes.organisation}>{orgName}</Paper>
      </div>
    );
  }
}

Organization.propTypes = {
  classes: PropTypes.object.isRequired,
  orgName: PropTypes.string.isRequired
};

export default withStyles(styles)(Organization);
