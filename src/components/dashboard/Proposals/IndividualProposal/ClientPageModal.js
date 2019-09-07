/**
 * This component renders the client modal that contains the information of the client associated with the proposal or project.
 * It sits within the individual proposal page and is accessed via the client button.
 * Author: Chamira Balasuriya
 */

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import ClientDetails from "./modalcomponents/ClientDetails";
import ClientOrgAndContact from "./modalcomponents/ClientOrgAndContact";
import ClientNotes from "./modalcomponents/ClientNotes";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    paddingLeft: theme.spacing.unit * 4,
    outline: "none"
  }
});

class ClientPageModal extends React.Component {
  state = {
    open: false,
    fullWidth: true,
    maxWidth: "xl"
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    console.log("modal");
    console.log(this.state);
    const { classes } = this.props;
    return (
      <div>
        <Typography gutterBottom />
        <Chip
          onClick={this.handleClickOpen}
          icon={<FaceIcon />}
          label={this.props.client}
          variant="outlined"
          align="center"
        />
        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogContent>
            <DialogContentText>
              <Grid container spacing={24}>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    <ClientDetails client={this.props.client} />
                  </Paper>
                </Grid>

                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    <ClientOrgAndContact />
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <h1>Notes</h1>
                    <ClientNotes />
                  </Paper>
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(ClientPageModal);
