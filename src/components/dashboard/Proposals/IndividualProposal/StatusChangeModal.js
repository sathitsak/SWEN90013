import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import red from "@material-ui/core/colors/red";
import lightGreen from "@material-ui/core/colors/lightGreen";
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

class StatusChangeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      fullWidth: true,
      maxWidth: "md",
      option: "",
      rerender: "",
      supervisor: ""
    };
  }

  _handleClickOpen(status) {
    this.setState({ open: true, option: status });
  }

  _handleClose = () => {
    this.setState({ open: false });
  };

  _handleUpdate = () => {
    var response = document.getElementById("reason").value;
    if ((response = -1)) {
      alert("Please fill all fields");
    } else {
      this.setState({ open: false });
      axios.put(
        "https://5ce79b719f2c390014dba00f.mockapi.io/proposal/" + this.props.id,
        {
          status: this.state.option,
          supervisor: this.state.supervisor
        }
      );
    }
  };

  _handleChange = event => {
    this.setState({ supervisor: [event.target.value] });
    console.log(this.state.coordinator);
  };

  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={6} style={{ marginTop: 30 }}>
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: lightGreen[500], marginLeft: 100 }}
              onClick={() => this._handleClickOpen("approved")}
            >
              Accept
            </Button>
          </Grid>
          <Grid item xs={6} style={{ marginTop: 30 }} align="center">
            <Button
              variant="contained"
              color="secondary"
              style={{ backgroundColor: red[500], marginLeft: 80 }}
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
              <Grid container spacing={24}>
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
                  Accept Changes
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default StatusChangeModal;
