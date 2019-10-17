import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import DialogActions from "@material-ui/core/DialogActions";
import store from "../../../../store";
import {updateProposalAction, updateProjectAction} from "../../../../store/actionCreators";
import {grey} from "@material-ui/core/colors";
import { LoginContext } from "../../../admin/LoginProvider";

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

class AssignToSubject extends React.Component {
    static contextType = LoginContext;

    constructor(props) {
        super(props);

        this.state = {
            selectedSubjectId: this.props.proposal.subjectId,
            open: false
        };
    }

    render() {
        const {classes, proposal, subjects} = this.props;
        const {open} = this.state;

        return (
            <div>
                <Button
                    onClick={this._handleClickOpen}
                    className={classes.assignButton}
                    variant="contained"
                >
                    (Re) Assign
                </Button>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={open}
                    onClose={this._handleClose}
                >
                    <DialogTitle>
                        {this._getDialogTitle()}
                    </DialogTitle>
                    <DialogContent>
                        <form className={classes.container}>
                            <FormControl className={classes.formControl}>
                                <h6 style={{color: grey[800]}}>
                                    Subjects
                                </h6>
                                <Select
                                    native
                                    onChange={e => this._handleSelect(e)}
                                    input={<Input id="sp-native-simple"/>}
                                    defaultValue={proposal.subjectId}
                                >
                                    <option value="">None</option>
                                    {subjects.map((s, index) => (
                                        <option
                                            key={index}
                                            value={s._id}
                                        >
                                            {s.code + " " + s.name}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button className={classes.confirmButton} onClick={this._handleOK} color="primary">
                            Ok
                        </Button>
                        <Button className={classes.discardButton} onClick={this._handleClose} color="primary">
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

    _handleClickOpen = () => {
        this.setState({open: true});
    };

    _handleClose = () => {
        this.setState({open: false});
    };

    _handleSelect = e => {
        this.setState({selectedSubjectId: e.target.value});
    };

    _showSubject = (subjectId) => {
        const {subjects} = this.props;
        let subjectName = "None";
        subjects.forEach(s => {
            if (s._id === subjectId) {
                subjectName = s.code + " " + s.name;
            }
        });
        return subjectName;
    };

    _getDialogTitle() {
        if (this.props.project) {
            return "Choose a subject to assign this project to";
        } else {
            return "Choose a subject to assign this proposal to";
        }
    }

    _getNoteMsg = (selectedSubjectId, object) => {
        if (selectedSubjectId === "") {
            return ("removed the subject assigned to the " + object + ".")
        } else {
            return ("assigned the " + object + " to " + this._showSubject(selectedSubjectId) + ".");
        }
    }

    _handleOK = () => {
        const {selectedSubjectId} = this.state;
        const {proposal} = this.props;
        proposal.subjectId = selectedSubjectId;

        // Add note to proposal
        var newNote = {
            text: this._getNoteMsg(selectedSubjectId, "proposal"),
            date: Date.now().toString(),    // Date is represented as an integer, stored as a string
            userName: userName.state.userName,
        };
        var notes = proposal.notes;
        if (notes) {
            notes.push(newNote);
        } else {
            notes = [newNote];
        }
        proposal.notes = notes;

        // Send PUT request
        const updateProposalAct = updateProposalAction(proposal._id, proposal);
        store.dispatch(updateProposalAct);

        if (this.props.project) {
            // Add note to project
            var newNote = {
                text: this._getNoteMsg(selectedSubjectId, "project"),
                date: Date.now().toString(),    // Date is represented as an integer, stored as a string
                userName: userName.state.userName,
            };
            var projectNotes = this.props.project.notes;
            if (projectNotes) {
                projectNotes.push(newNote);
            } else {
                projectNotes = [newNote];
            }
            this.props.project.notes = projectNotes;
            this.props.project.proposal = proposal;

            // Send PUT request
            const updateProjectAct = updateProjectAction(this.props.project._id, this.props.project);
            store.dispatch(updateProjectAct);
        }

        this.setState({
            selectedSupervisorId: "",
            open: false
        });
    };

}

export default withStyles(styles)(AssignToSubject);
