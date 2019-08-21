import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import { Divider } from "@material-ui/core";

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

class EmailModal extends React.Component {
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
    const { classes } = this.props;
    return (
      <div>
        <Typography gutterBottom />
        <Fab 
            color="primary" 
            aria-label="Add" 
            className={classes.fab} 
            onClick={this.handleClickOpen}
           >
            <AddIcon />
        </Fab>
        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogContent>
            <DialogContentText>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField fullWidth
                        id="recipients"
                        label="To"
                        className={classes.textField}
                        // onChange={handleChange('name')}
                        margin="dense"
                    />
                    <TextField fullWidth
                        id="cc"
                        label="CC"
                        className={classes.textField}
                        // onChange={handleChange('name')}
                        margin="dense"
                    />
                    <TextField fullWidth
                        id="bcc"
                        label="BCC"
                        className={classes.textField}
                        // onChange={handleChange('name')}
                        margin="dense"
                    />
                    <Divider style={{marginTop:"1%"}}/>
                    <InputBase fullWidth
                        id="message"
                        className={classes.margin}
                        multiline="true"
                        rows="10"
                    />
                </form>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Discard
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(EmailModal);
