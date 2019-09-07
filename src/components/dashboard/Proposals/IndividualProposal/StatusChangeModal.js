import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { green, red }from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";


const styles = theme => ({
  acceptButton: {
    backgroundColor: green[400],
    "&:hover": {
      backgroundColor: green[500]
    }
  },
  rejectButton: {
    backgroundColor: red[400],
    "&:hover": {
      backgroundColor: red[600]
    }
  }
})

class StatusChangeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      fullWidth: true,
      maxWidth: "md",
      option: "",
      rerender: "",
      supervisor: "",
      status: ""
    };
  }

  _handleClickOpen(status) {
    this.setState({ open: true, option: status });
  }

  _handleClose = () => {
    this.setState({ open: false });
  };

  _handleUpdate = () => {
    var responseText = document.getElementById("reason").value;

    if (responseText == "" || this.state.supervisor == "") {
      alert("Please complete all fields");
    } else {
      if (this.state.option === "approved") {
        this.setState({ open: false });
        console.log("the proposal id is " + this.props.id);
        console.log(
          "the supervisor for this project is " + this.state.supervisor
        );
        axios
          .post(
            "http://localhost:13000/api/proposal/" + this.props.id + "/accept",
            {
              supervisor: this.state.supervisor,
              acceptReason: responseText
            }
          )
          .then(function(response) {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      } else if (this.state.option === "reject") {
        this.setState({ open: false });
        console.log("the proposal id is" + this.props.id);
        console.log("the reason to reject is " + responseText);
        axios
          .post(
            "http://localhost:13000/api/proposal/" + this.props.id + " /reject",
            {
              supervisor: this.state.supervisor,
              rejectReason: responseText
            }
          )
          .then(function(response) {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  };

  _handleChange = event => {
    this.setState({ supervisor: [event.target.value] });
    console.log(this.state.coordinator);
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={6} style={{ marginTop: 30 }} align="center">
            <Button
              variant="contained"
              color="primary"
              className={classes.acceptButton}
              onClick={() => this._handleClickOpen("approved")}
            >
              Accept
            </Button>
          </Grid>
          <Grid item xs={6} style={{ marginTop: 30 }} align="center">
            <Button
              variant="contained"
              color="secondary"
              className={classes.rejectButton}
              align="center"
              onClick={() => this._handleClickOpen("reject")}
            >
              Reject
            </Button>
            <Dialog
              fullWidth={this.state.fullWidth}
              maxWidth={this.state.maxWidth}
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="max-width-dialog-title"
            >
              <DialogTitle id="alert-dialog-title">
                Change proposal status
              </DialogTitle>
              <Grid container spacing={24} alignItems="center">
                <Grid item xs={6} style={{ marginTop: 30 }} align="center">
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Provide a reason for status change
                    </DialogContentText>
                  </DialogContent>
                  <TextField
                    id="reason"
                    multiline
                    rows="4"
                    margin="normal"
                    variant="filled"
                    style={{ width: 300 }}
                  />
                </Grid>
                <Grid item xs={6} style={{ marginTop: 30 }} align="center">
                  <FormControl style={{ minWidth: 200, marginTop: 50 }}>
                    <InputLabel htmlFor="age-simple">
                      Select supervisor
                    </InputLabel>
                    <Select
                      value={this.state.supervisor}
                      id="supervisor"
                      inputProps={{
                        name: "age",
                        id: "age-simple"
                      }}
                      onChange={this._handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"None"}>None</MenuItem>
                      <MenuItem value={"Eduardo"}>Eduardo</MenuItem>
                      <MenuItem value={"Doc"}>Doc</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <DialogActions>
                <Button onClick={this._handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this._handleUpdate} color="primary" autoFocus>
                  Confirm Changes
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(StatusChangeModal);
