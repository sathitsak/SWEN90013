import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import DialogActions from "@material-ui/core/DialogActions";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import store from "../../../../../store";
import {updateProjectAction} from "../../../../../store/actionCreators";
import {grey} from "@material-ui/core/colors";
import { LoginContext } from "../../../../admin/LoginProvider";

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
    confirmButton: {
        backgroundColor: "#094183",
        color: "#FFFFFF",
        "&:hover": {
            backgroundColor: "#4074B2"
        }
    },
    discardButton: {
        color: "#094183"
    },
});

var userName;

class AssignToSupervisor extends React.Component {
    static contextType = LoginContext;

    constructor(props) {
        super(props);

        this.state = {
            selectedSupervisorId: "",
            open: false
        };
    }

    render() {
        const {classes, project, supervisors} = this.props;
        const {open} = this.state;

        return (
            <div>
                <Grid container>
                    <Grid item style={{marginTop: 10, marginRight: 30}}>
                        <Typography align="left" color="textSecondary"
                                    variant="h6" style={{fontWeight: "bold"}}>
                            Supervisor:
                        </Typography>
                    </Grid>
                    <Grid item style={{marginTop: 10}} align="center">
                        <Button
                            onClick={this._handleClickOpen}
                            className={classes.assignButton}
                            variant="contained"
                        >
                            (Re) Assign
                        </Button>
                    </Grid>
                </Grid>
                <Paper className={classes.showSup}>
                    {this._showSupervisor(project.supervisorId)}
                </Paper>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={open}
                    onClose={this._handleClose}
                >
                    <DialogTitle>
                        Choose one supervisor to assign to
                    </DialogTitle>
                    <DialogContent>
                        <form className={classes.container}>
                            <FormControl className={classes.formControl}>
                                <h6 style={{color: grey[800]}}>
                                    Supervisors
                                </h6>
                                <Select
                                    native
                                    onChange={e => this._handleSelect(e)}
                                    input={<Input id="sp-native-simple"/>}
                                    defaultValue={project.supervisorId}
                                >
                                    <option value="">None</option>
                                    {supervisors.map((sp, index) => (
                                        <option
                                            key={index}
                                            value={sp._id}
                                        >
                                            {sp.firstName + " " + sp.lastName}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this._handleOK} color="primary" className={classes.confirmButton}>
                            Ok
                        </Button>
                        <Button onClick={this._handleClose} color="primary" className={classes.discardButton}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    componentDidMount() {
        userName = this.context;
    }
    _showSupervisor = (supervisorId) => {
        const {supervisors} = this.props;
        let supervisorName = "NO SUPERVISOR ASSIGNED";
        supervisors.forEach(sp => {
            if (sp._id === supervisorId) {
                supervisorName = sp.firstName + " " + sp.lastName;
            }
        });
        return supervisorName;
    };

    _handleClickOpen = () => {
        this.setState({open: true});
    };

    _handleClose = () => {
        this.setState({open: false});
    };

    _handleSelect = e => {
        this.setState({selectedSupervisorId: e.target.value});
    };

    _handleOK = () => {
        const {selectedSupervisorId} = this.state;
        const {project, supervisors} = this.props;
        project.supervisorId = selectedSupervisorId;
        var text;

        if (selectedSupervisorId === "") {
            text = "removed the supervisor assigned to the project."
        } else {
            text = "assigned the project to " + this._showSupervisor(project.supervisorId) + "."
        };

        // Add note to project
        var newNote = {
            text: text,
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

        // Update project to DB
        const updateProjAction = updateProjectAction(project._id, project);
        store.dispatch(updateProjAction);
        this.setState({
            selectedSupervisorId: "",
            open: false
        });
    };

}

AssignToSupervisor.propTypes = {
    classes: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    supervisors: PropTypes.array.isRequired,
};

export default withStyles(styles)(AssignToSupervisor);
