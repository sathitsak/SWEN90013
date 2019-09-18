import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import { Divider } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import store from "../../../store";
import axios from "axios";
import { ENETUNREACH } from "constants";

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
    flexGrow: 1,
    display: "flex",
    flexWrap: "wrap"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    paddingLeft: theme.spacing.unit * 4,
    outline: "none"
  },
  formControl: {
    margin: 2,
    minWidth: 120,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500]
  },
  fab: {
    backgroundColor: "#094183",
    "&:hover": {
      backgroundColor: "#4074B2"
    },
    boxShadow: "none"
  },
  addButton: {
    backgroundColor: "#094183",
    "&:hover": {
      backgroundColor: "#4074B2"
    }
  },
  discardButton: {
    color: "#094183"
  },
  note: {
      width: "100%",
      marginTop: 5,
      paddingBottom: 0,
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: "87%"
    }
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left"
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left"
  },
  getContentAnchorEl: null,
  dense: "true"
};

class AddNoteModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      fullWidth: true
    };
  }

  _handleClickOpen = () => {
    this.setState({ open: true });
  };

  _handleClose = () => {
    this.setState({ open: false });
  };

  _handleAddNote = () => {
    var noteMsg = document.getElementById("note").value;
    var newNote = {
        text: noteMsg,
        date: Date.now().toString(),    // Date is represented as an integer, stored as a string
    }
    var notes = this.props.object.notes;
    if (notes) {
        notes.push(newNote);
    } else {
        notes = [newNote];
    }
    this.props.object.notes = notes;

    var objectType = this.props.objectType;

    // Send PUT request
    const url = `http://localhost:13000/api/` + objectType + "/" + this.props.object._id;

    console.log(url);
    axios
        .put(url, this.props.object)
        .then(function(response) {
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        });
    
    // Close window
    this._handleClose();
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography gutterBottom />
        <Fab
          color="primary"
          aria-label="Add a note"
          className={classes.fab}
          onClick={this._handleClickOpen}
        >
          <NoteAddIcon />
        </Fab>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this._handleClose}
          fullWidth={this.state.fullWidth}
        >
          <DialogTitle onClose={this._handleClose}>Add a note</DialogTitle>

          <Divider />

          <DialogContent>
            <form className={classes.note} noValidate autoComplete="off">
                <InputBase
                    fullWidth
                    id="note"
                    className={classes.note}
                    multiline={true}
                    rows="5"
                />
            </form>
          </DialogContent>

          <Divider />

          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={this._handleAddNote}
              className={classes.addButton}
            >
              Add
            </Button>
            <Button
              onClick={this._handleClose}
              color="primary"
              className={classes.discardButton}
            >
              Discard
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(AddNoteModal);

