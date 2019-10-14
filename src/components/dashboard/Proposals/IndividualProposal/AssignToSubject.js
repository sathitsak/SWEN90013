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
import {updateProposalAction} from "../../../../store/actionCreators";
import {grey} from "@material-ui/core/colors";

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

class AssignToSubject extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedSubjectId: "",
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
                        Choose a subject to assign this proposal to
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

    _handleOK = () => {
        const {selectedSubjectId} = this.state;
        const {proposal} = this.props;
        proposal.subjectId = selectedSubjectId;

        // Add note to proposal
        var newNote = {
            text: "Proposal has been assigned to " + this._showSubject(proposal.subjectId) + ".",
            date: Date.now().toString(),    // Date is represented as an integer, stored as a string
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
        this.setState({
            selectedSupervisorId: "",
            open: false
        });
    };

}

export default withStyles(styles)(AssignToSubject);
