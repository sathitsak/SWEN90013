/**
 * This component contains the pop-up for creating a student team. 
 * It sits within an individual project page under the student team module.
 * Author: Reyna Tan
 * Date: 01/09/2019
 */

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import TextField from "@material-ui/core/TextField";
import { Divider } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from "@material-ui/core/TableHead/TableHead";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";

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
    maxWidth: 300
  },
  fab: {
    backgroundColor: "#094183",
    '&:hover': {
      backgroundColor: "#4074B2"
    },
    boxShadow: "none",
  },
  studentTeamHeader: {
    fontWeight: "bold",
    [theme.breakpoints.up('sm')]: {
      paddingTop: 20,
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: 5,
    },
  },
  selectField: {
    marginTop: 15,
  },
  resize: {
    fontSize: 15,
    padding: 10
  },
  createButton: {
    backgroundColor: "#094183",
    '&:hover': {
      backgroundColor:"#4074B2",
    }
  },
  discardButton: {
    color: "#094183",
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
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

const TEAM_SIZE = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const INITIAL_NUM_STUDENTS = 4;

class CreateStudentTeamModal extends React.Component {
  state = {
    open: false,
    fullWidth: true,
    maxWidth: "lg",
    numStudents: INITIAL_NUM_STUDENTS,
  };

  _handleClickOpen = () => {
    this.setState({ open: true });
  };

  _handleClose = () => {
    this.setState({ open: false });
  };

  _handleNumStudentsChange = (event) => {
    this.setState({ numStudents: event.target.value})
  };
  
  _createStudentRows = () => {
    let rows = [];

    for (var i = 0; i < this.state.numStudents; i++) {
      console.log(i);
      let newObject = { index: i };
      rows.push(newObject);
    };
    {console.log(rows)}
    return rows;
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography gutterBottom />

        <Grid align="right">
          <Fab
            color="primary"
            aria-label="Create Student Team"
            className={classes.fab}
            onClick={this._handleClickOpen}
          >
            <GroupAddIcon />
          </Fab>
        </Grid>
        
        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.state.open}
          onClose={this._handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle onClose={this._handleClose}>
            Create a new student team
          </DialogTitle>

          <Divider />

          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={2}>
                <div className={classes.studentTeamHeader}>
                  Team Name
                </div>
              </Grid>
              <Grid item xs={10}>
                <form 
                  className={classes.container} 
                  noValidate 
                  autoComplete="off"
                >
                  <TextField
                    id="Team Name"
                    className={classes.textField}
                    margin="normal"
                    inputProps={{ 'aria-label': 'Team Name' }}
                    fullWidth
                  />
                </form>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={2}>
                <div className={classes.studentTeamHeader}>
                  Number of students
                </div>
              </Grid>
              <Grid item xs={10}>
                <form className={classes.container} noValidate autoComplete="off">
                  <Select
                    className={classes.selectField}
                    autoWidth="true"
                    value={this.state.numStudents}
                    onChange={e => this._handleNumStudentsChange(e)}
                    input={<Input id="email_template" />}
                    MenuProps={MenuProps}
                  >
                    {TEAM_SIZE.map(size => (
                      <MenuItem value={size}>
                        {size}
                      </MenuItem>
                    ))}
                  </Select>
                </form>
              </Grid>
            </Grid>

            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align="left" >First Name</TableCell>
                        <TableCell align="left" >Last Name</TableCell>
                        <TableCell align="left" >Email Address</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                  {this._createStudentRows().map(   
                    (index) => (
                      <TableRow>
                           <TableCell component="th" scope="row">
                              <form 
                                className={classes.container} 
                                noValidate 
                                autoComplete="off"
                              >                              
                                <TextField
                                  id={"firstName"+index}
                                  className={classes.textField}
                                  margin="dense"
                                  inputProps={{ 'aria-label': 'First Name' }}
                                  fullWidth
                                  variant="outlined"
                                  InputProps={{
                                    classes: {
                                      input: classes.resize,
                                    },
                                  }}
                                />
                              </form>
                          </TableCell>
                          <TableCell align="left">
                            <form 
                              className={classes.container} 
                              noValidate 
                              autoComplete="off"
                            >
                              <TextField
                                id={"lastName"+index}
                                className={classes.textField}
                                margin="dense"
                                inputProps={{ 'aria-label': 'Last Name' }}
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                  classes: {
                                    input: classes.resize,
                                  },
                                }}
                              />
                            </form>
                          </TableCell>
                          <TableCell align="left">
                            <form 
                              className={classes.container} 
                              noValidate 
                              autoComplete="off"
                            >
                              <TextField
                                id={"emailAddress"+index}
                                className={classes.textField}
                                margin="dense"
                                inputProps={{ 'aria-label': 'Email Address' }}
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                  classes: {
                                    input: classes.resize,
                                  },
                                }}
                              />
                            </form>
                          </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
            </Table>
          </DialogContent>

          <Divider />

          <DialogActions>
            <Button
              className={classes.createButton}
              variant="contained"
              color="primary"
              onClick={this._handleCreateStudentTeam}
            >
              Create
            </Button>
            <Button 
              className={classes.discardButton}
              onClick={this._handleClose} 
              color="primary">
              Discard
            </Button>
          </DialogActions>

        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(CreateStudentTeamModal);
