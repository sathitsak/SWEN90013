import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import {projectStatus} from "../../Constants/Constants";
import store from "../../../../../store";
import {updateProjectAction} from "../../../../../store/actionCreators";
import { LoginContext } from "../../../../admin/LoginProvider";

const styles = {};
var userName;

class ChangeStatus extends React.Component {
    static contextType = LoginContext;

    constructor(props) {
        super(props);
        this.state = {
            selectedStatus: this.props.project.status,
            open: false
        };
    }

    render() {
        const {classes, project} = this.props;
        const {open} = this.state;

        return (
            <div>
                <Grid container>
                    <Grid item style={{marginTop: 10, marginRight: 80}}>
                        <Typography align="left" color="textSecondary"
                                    variant="h6" style={{fontWeight: "bold"}}>
                            Status:
                        </Typography>
                    </Grid>
                    <Grid item style={{marginTop: 10}} align="center">
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={this._handleClickOpen}
                        >
                            {this._showProjectStatus(project.status)}
                        </Button>
                    </Grid>
                </Grid>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={open}
                    onClose={this._handleClose}
                >
                    <DialogTitle>Update project status</DialogTitle>
                    <DialogContent>
                        <form className={classes.container}>
                            <FormControl className={classes.formControl}>
                                <InputLabel
                                    htmlFor="sp-native-simple">Status</InputLabel>
                                <Select
                                    native
                                    defaultValue={this.state.selectedStatus}
                                    onChange={e => this._handleSelect(e)}
                                    input={<Input id="sp-native-simple"/>}
                                >
                                    <option value={projectStatus.new}>
                                        New
                                    </option>
                                    <option value={projectStatus.inProgress}>
                                        In Progress
                                    </option>
                                    <option value={projectStatus.completed}>
                                        Completed
                                    </option>
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

    componentDidMount() {
        userName = this.context;
    }

    _handleClickOpen = () => {
        this.setState({open: true});
    };

    _handleClose = () => {
        this.setState({open: false});
    };

    _handleSelect = e => {
        this.setState({selectedStatus: e.target.value});
    };

    _formatProjectStatus(status) {
        if (status === "new") {
            return "New";
        } else if (status === "inProgress") {
            return "In Progress";
        } else if (status === "completed") {
            return "Completed";
        }
    }

    _handleOK = () => {
        const {selectedStatus} = this.state;
        const {project} = this.props;
        project.status = selectedStatus;

        // Add note to project
        var newNote = {
            text: "updated the project status to " + this._formatProjectStatus(project.status) + ".",
            date: Date.now().toString(),    // Date is represented as an integer, stored as a string
            userName: userName.state.userName,
        };
        var notes = project.notes;
        if (notes) {
            notes.push(newNote);
        } else {
            notes = [newNote];
        }
        project.notes = notes;

        // Update project in DB
        const updateProjAction = updateProjectAction(project._id, project);
        store.dispatch(updateProjAction);
        this.setState({open: false});
    };

    _showProjectStatus = status => {
        switch (status) {
            case projectStatus.new:
                return "NEW";
            case projectStatus.inProgress:
                return "IN PROGRESS";
            case projectStatus.completed:
                return "COMPLETED";
            default:
                return "INVALID STATUS OF PROJECT";
        }
    };

}

ChangeStatus.propTypes = {
    classes: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired
};

export default withStyles(styles)(ChangeStatus);
