import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import DoneIcon from "@material-ui/icons/Done";
import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "right",
    flexWrap: "wrap"
  },
  chip: {
    marginLeft: 20
  }
});

function ClientChip(props) {
  const { classes } = props;
  return (
    <Chip
      icon={<FaceIcon />}
      label={props.clientName}
      clickable
      className={classes.chip}
      color="primary"
      variant="outlined"
    />
  );
}

export default withStyles(styles)(ClientChip);
