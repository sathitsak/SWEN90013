import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import DialogActions from "@material-ui/core/DialogActions";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { getSetCurrentSupervisorAction } from "../../../../../store/actionCreators";
import store from "../../../../../store";

const styles = theme => ({
  showSup: {
    overflow: "auto",
    textAlign: "justify",
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: "2%",
    marginBottom: "3%",
    height: 35,
    marginRight: 10,
    color: "#000000",
    [theme.breakpoints.down("sm")]: {
        marginRight: 30
    },
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    minWidth: 120
  },
  assignButton: {
    color: "#ffffff",
    backgroundColor: "#094183",
    '&:hover': {
        backgroundColor: "#4074B2",
        color: "#ffffff",
    }
  },
});

class AssignToSupervisor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSupervisor: "",
      open: false
    };
  }

  render() {
    const { classes, currentSupervisor, supervisors } = this.props;
    const { open } = this.state;

    return (
      <div>
        <Grid container>
          <Grid item style={{ marginTop: 10, marginRight: 30 }}>
            <Typography align="left" color="textSecondary" variant="h6" style={{ fontWeight: "bold"}}>
              Supervisor:
            </Typography>
          </Grid>
          <Grid item style={{ marginTop: 10 }} align="center">
            <Button
              onClick={this._handleClickOpen}
              className={classes.assignButton}
              variant="contained"
            >
              (Re) Assign
            </Button>
          </Grid>
        </Grid>
        <Paper className={classes.showSup}>{currentSupervisor}</Paper>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={open}
          onClose={this._handleClose}
        >
          <DialogTitle>Choose one supervisor to assign to</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="sp-native-simple">Supervisor</InputLabel>
                <Select
                  native
                  onChange={e => this._handleSelect(e)}
                  input={<Input id="sp-native-simple" />}
                >
                  <option value="" />
                  {supervisors.map((sp, index) => (
                    <option
                      key={index}
                      value={sp.firstName + " " + sp.lastName}
                    >
                      {sp.firstName + " " + sp.lastName}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this._handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this._handleOK} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  _handleClickOpen = () => {
    this.setState({ open: true });
  };

  _handleClose = () => {
    this.setState({ open: false });
  };

  _handleSelect = e => {
    this.setState({ selectedSupervisor: e.target.value });
  };

  _handleOK = () => {
    const { selectedSupervisor } = this.state;

    const action = getSetCurrentSupervisorAction(selectedSupervisor);
    store.dispatch(action);

    this.setState({
      selectedSupervisor: "",
      open: false
    });
    if (selectedSupervisor !== "") {
      alert("This project is assigned to:\n" + selectedSupervisor);
    } else {
      alert("This project doesn't have responsible supervisor now.");
    }
  };
}

AssignToSupervisor.propTypes = {
  classes: PropTypes.object.isRequired,
  supervisorID: PropTypes.string.isRequired,
  supervisors: PropTypes.array.isRequired,
  currentSupervisor: PropTypes.string.isRequired
};

export default withStyles(styles)(AssignToSupervisor);
