/**
 * This component contains the pop-up for creating a student team.
 * It sits within an individual project page under the student team module.
 * Author: Reyna Tan
 * Date: 01/09/2019
 */

import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import TextField from "@material-ui/core/TextField";
import {Divider} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from "@material-ui/core/TableHead/TableHead";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import store from "../../../../../store";
import PropTypes from "prop-types";
import {
    createNewProductAction,
    updateProjectAction,
} from "../../../../../store/actionCreators";
import {LoginContext} from "../../../../admin/LoginProvider";

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: "flex",
        flexWrap: "wrap"
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        paddingLeft: theme.spacing(4),
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
            backgroundColor: "#4074B2",
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
const MINIMUM_TEAM_NAME_LENGTH = 2;

var userName;

class CreateStudentTeamModal extends React.Component {
    static contextType = LoginContext;

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            fullWidth: true,
            maxWidth: "lg",
            numStudents: INITIAL_NUM_STUDENTS,
        };
    }

    componentDidMount() {
        userName = this.context;
    }

    _handleClickOpen = () => {
        this.setState({open: true});
    };

    _handleClose = () => {
        this.setState({open: false});
    };

    _handleNumStudentsChange = (event) => {
        this.setState({numStudents: event.target.value})
    };

    _createStudentRows = () => {
        let rows = [];

        for (var i = 0; i < this.state.numStudents; i++) {
            let newObject = {index: i};
            rows.push(newObject);
        }
        return rows;
    };

    _concatenateNames = (firstName, lastName) => {
        return (firstName + " " + lastName);
    };

    _validateTeamName = teamName => {
        // teamName will always start with "Team "; the length should be > 2
        let teamNameList = teamName.split(" ");
        if ((teamNameList.length < MINIMUM_TEAM_NAME_LENGTH) || (teamNameList[1] === "")){
            return false;
        } else {
            return true;
        }
    }

    _validateEmail = email => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          return true;
        } else {
          return false;
        }
    };

    _validateStudentDetails = student => {
        let nameList = student.name.split(" ");
        console.log(nameList);
        var i;
        if (!this._validateEmail(student.email)){
            return false;
        } else {
            for (i = 0; i < nameList.length; i++) {
                if (nameList[i] === "") {
                    return false;
                }
            }
        }

        return true;

    }

    _checkStudentTeamDetails(teamName, studentList) {
        var i;

        if (!this._validateTeamName(teamName)) {
           alert("Please enter a valid student team name."); 
           return false;
        } else {
            for (i = 0; i < studentList.length; i++) {
               if (!this._validateStudentDetails(studentList[i])) {
                   alert("Please enter valid student details.");
                   return false;
               }
            }
        }
        return true;
    }

    _handleCreateStudentTeam = () => {
        const {projectId, project} = this.props;

        const studentList = [];
        for (var i = 0; i < this.state.numStudents; i++) {
            let firstName = document.getElementById("firstName" + i).value;
            let lastName = document.getElementById("lastName" + i).value;
            let email = document.getElementById("email" + i).value;
            var nextStudent = {
                name: this._concatenateNames(firstName, lastName),
                email: email,
            };
            studentList.push(nextStudent);
        }

        const teamName = document.getElementById("teamName").value;

        if (this._checkStudentTeamDetails(teamName, studentList)) {   
            const newProduct = {
                name: teamName,
                projectId: projectId,
                students: studentList,
                productLinks: [],
                technologies: []
            };

            // Send POST request
            const createNewProdAction = createNewProductAction(newProduct);
            store.dispatch(createNewProdAction);

            // Add note to project
            var newNote = {
                text: "created " + teamName + ".",
                date: Date.now().toString(),    // Date is represented as an integer, stored as a string
                userName: userName.state.userName
            };
            var notes = project.notes;
            if (notes) {
                notes.push(newNote);
            } else {
                notes = [newNote];
            }
            project.notes = notes;

            // Add product to project (to display in state)
            var products = project.products
            if (products) {
                products.push(newProduct);
            } else {
                products = [newProduct];
            }
            project.products = products;

            // Send PUT request
            const updateProjectAct = updateProjectAction(project._id, project);
            store.dispatch(updateProjectAct);
        
            // Close window
            this._handleClose();
        }
    };

    render() {
        const {classes} = this.props;

        return (
            <div>
                <Typography gutterBottom/>

                <Grid align="right">
                    <Fab
                        color="primary"
                        aria-label="Create Student Team"
                        className={classes.fab}
                        onClick={this._handleClickOpen}
                    >
                        <GroupAddIcon/>
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

                    <Divider/>

                    <DialogContent>
                        <Grid container spacing={8}>
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
                                        id="teamName"
                                        className={classes.textField}
                                        margin="normal"
                                        inputProps={{'aria-label': 'Team Name'}}
                                        fullWidth
                                        defaultValue="Team "
                                    />
                                </form>
                            </Grid>
                        </Grid>

                        <Grid container spacing={8}>
                            <Grid item xs={2}>
                                <div className={classes.studentTeamHeader}>
                                    Number of students
                                </div>
                            </Grid>
                            <Grid item xs={10}>
                                <form className={classes.container} noValidate
                                      autoComplete="off">
                                    <Select
                                        className={classes.selectField}
                                        autoWidth={true}
                                        value={this.state.numStudents}
                                        onChange={e => this._handleNumStudentsChange(e)}
                                        // input={<Input id="email_template" />}
                                        MenuProps={MenuProps}
                                    >
                                        {TEAM_SIZE.map(size => (
                                            <MenuItem value={size} key={size}>
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
                                    <TableCell align="left">First
                                        Name</TableCell>
                                    <TableCell align="left">Last
                                        Name</TableCell>
                                    <TableCell align="left">Email
                                        Address</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {this._createStudentRows().map(
                                    (index) => (
                                        <TableRow key={index.index}>
                                            <TableCell component="th"
                                                       scope="row">
                                                <form
                                                    className={classes.container}
                                                    noValidate
                                                    autoComplete="off"
                                                >
                                                    <TextField
                                                        id={"firstName" + index.index}
                                                        className={classes.textField}
                                                        margin="dense"
                                                        inputProps={{'aria-label': 'First Name'}}
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
                                                        id={"lastName" + index.index}
                                                        className={classes.textField}
                                                        margin="dense"
                                                        inputProps={{'aria-label': 'Last Name'}}
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
                                                        id={"email" + index.index}
                                                        className={classes.textField}
                                                        margin="dense"
                                                        inputProps={{'aria-label': 'Email Address'}}
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

                    <Divider/>

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

CreateStudentTeamModal.propTypes = {
    classes: PropTypes.object.isRequired,
    projectId: PropTypes.string.isRequired,
};

export default withStyles(styles)(CreateStudentTeamModal);
