import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {green, red, grey} from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import store from "../../../../store";
import {withStyles} from "@material-ui/core/styles";
import {getAllSubjects, getProposalById,} from "../../../../api";
import {
    getAllSubjectsAction,
    updateProposalAction,
    getProposalByIdAction,
    changeProposalStatusAction
} from "../../../../store/actionCreators";

import { LoginContext } from "../../../admin/LoginProvider";

import {proposalOutcome} from "../../Email/AutomatedEmailFunctions"


const styles = theme => ({
    acceptButton: {
        backgroundColor: green[400],
        "&:hover": {
            backgroundColor: green[800]
        }
    },
    rejectButton: {
        backgroundColor: red[400],
        "&:hover": {
            backgroundColor: red[800]
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
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
});

var userName;

class StatusChangeModal extends React.Component {
    static contextType = LoginContext;

    constructor(props) {
        super(props);
        this.state = {
            openAccept: false,
            openReject: false,
            fullWidth: true,
            maxWidth: "md",
            option: "",
            rerender: "",
            subjectId: "",
            status: ""
        };
    }

    async _reqTodoList() {
        const subjectsResult = await getAllSubjects();
        const subjectsAction = getAllSubjectsAction(subjectsResult);
        store.dispatch(subjectsAction);
    }

    componentDidMount() {
        this._reqTodoList();
        userName = this.context;
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={6} style={{paddingLeft: 22}}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.acceptButton}
                            onClick={() => this._handleClickOpen("accept")}
                        >
                            Accept
                        </Button>
                    </Grid>
                    <Grid item xs={6} align="left">
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.rejectButton}
                            align="center"
                            onClick={() => this._handleClickOpen("reject")}
                        >
                            Reject
                        </Button>

                        <Dialog
                            fullWidth={this.state.fullWidth}
                            maxWidth={this.state.maxWidth}
                            open={this.state.openAccept}
                            aria-labelledby="max-width-dialog-title"
                        >
                            <DialogTitle id="alert-dialog-title">
                                Accept Proposal
                            </DialogTitle>
                            <Grid container spacing={3}>
                                <Grid item xs={6} style={{padding: 50}}>
                                    <h6 style={{color: grey[800]}}>
                                        Please state your reasoning:
                                    </h6>
                                    <TextField
                                        id="reason"
                                        multiline
                                        rows="4"
                                        margin="dense"
                                        variant="filled"
                                        style={{width: "100%"}}
                                    />
                                </Grid>
                                <Grid item xs={6} style={{marginTop: 30}}>
                                    <form className={classes.container}>
                                        <FormControl style={{
                                            width: "70%",
                                            marginTop: 9
                                        }}>
                                            <h6 style={{color: grey[800]}}>
                                                If applicable, please assign
                                                this proposal to a subject
                                            </h6>
                                            <Select
                                                value={this.state.subjectId}
                                                id="subjectName"
                                                onChange={e => this._handleChange(e)}
                                            >
                                                {this.props.subjects ? (
                                                    this.props.subjects.map(s => (
                                                        <MenuItem key={s._id}
                                                            value={s._id}>{s.code} {s.name}</MenuItem>
                                                    ))
                                                ) : (
                                                    <div/>
                                                )}
                                            </Select>
                                        </FormControl>
                                    </form>
                                </Grid>
                            </Grid>

                            <DialogActions>
                                <Button
                                    onClick={this._handleUpdate}
                                    color="primary"
                                    className={classes.confirmButton}
                                >
                                    Confirm Changes
                                </Button>

                                <Button
                                    onClick={() => this._handleClose("accept")}
                                    color="primary"
                                    className={classes.discardButton}
                                >
                                    Cancel
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <Dialog
                            fullWidth={this.state.fullWidth}
                            maxWidth={this.state.maxWidth}
                            open={this.state.openReject}
                            aria-labelledby="max-width-dialog-title"
                        >
                            <DialogTitle id="alert-dialog-title">
                                Reject Proposal
                            </DialogTitle>
                            <Grid container spacing={3}>
                                <Grid item xs={12} style={{padding: 50}}>
                                    <h6 style={{color: grey[800]}}>
                                        Please state your reasoning:
                                    </h6>
                                    <TextField
                                        id="reason"
                                        multiline
                                        rows="4"
                                        margin="dense"
                                        variant="filled"
                                        style={{width: "100%"}}
                                    />
                                </Grid>
                            </Grid>

                            <DialogActions>
                                <Button
                                    onClick={this._handleUpdate}
                                    color="primary"
                                    className={classes.confirmButton}
                                >
                                    Confirm Changes
                                </Button>

                                <Button
                                    onClick={() => this._handleClose("reject")}
                                    color="primary"
                                    className={classes.discardButton}
                                >
                                    Cancel
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>
                </Grid>
            </div>
        );
    }

    _handleChange = event => {
        this.setState(() => {
            return {
                subjectId: event.target.value
            };
        });
    };

    async _updateProposalState(proposalId) {
        const proposalResult = await getProposalById(proposalId);
        const proposalAction = getProposalByIdAction(proposalResult);
        store.dispatch(proposalAction);
    }

    _handleClickOpen = (status) => {
        if (status === 'accept') {
            this.setState({openAccept: true, option: status});
        } else if (status === 'reject') {
            this.setState({openReject: true, option: status});
        }

        
    };

    _handleClose = (status) => {
        if (status === 'accept') {
            this.setState({openAccept: false});
        } else if (status === 'reject') {
            this.setState({openReject: false});
        }
    };

    _handleUpdate = () => {
        let responseText = document.getElementById("reason").value;
        const {subjectId, option} = this.state;
        const {proposal} = this.props;
        var noteMsg;

        if (option === "accept") {
            if (responseText === "") {
                alert("Please enter the reason why you have accepted this proposal")
            } else if (subjectId === "") {
                alert("Please assign this proposal to a subject")
            } else {
                this.setState({openAccept: false});
                // proposal.status = "approved";
                noteMsg = "accepted the proposal. Reason: " + responseText;
                // proposal.subjectId = subjectId;
                proposalOutcome("accept", responseText, proposal.client.firstName, proposal.client.secondaryContactFirstName, proposal.client.email, proposal.client.secondaryContactEmail);

                // Send accept API call
                const object = {
                    subjectId: subjectId,
                    acceptReason: noteMsg,
                    userName: userName.state.userName
                }
                const changeProposalStatusAct = changeProposalStatusAction(proposal._id, option, object);
                store.dispatch(changeProposalStatusAct);
            }
        } else if (option === "reject") {
            if (responseText === "") {
                alert("Please enter the reason why you have rejected this proposal")
            } else {
                this.setState({openReject: false});
                // proposal.status = "reject";
                noteMsg = "rejected the proposal. Reason: " + responseText;
                proposalOutcome("reject", responseText, proposal.client.firstName, proposal.client.secondaryContactFirstName, proposal.client.email, proposal.client.secondaryContactEmail);

                // Send accept API call
                const object = {
                    rejectReason: noteMsg,
                    userName: userName.state.userName
                }
                const changeProposalStatusAct = changeProposalStatusAction(proposal._id, option, object);
                store.dispatch(changeProposalStatusAct);
            }
        }

        // // Add note to proposal
        // var newNote = {
        //     text: noteMsg,
        //     date: Date.now().toString(),    // Date is represented as an integer, stored as a string
        //     userName: userName.state.userName,
        // };
        // var notes = proposal.notes;
        // if (notes) {
        //     notes.push(newNote);
        // } else {
        //     notes = [newNote];
        // }
        // proposal.notes = notes;

        // // Send PUT request
        // const updateProposalAct = updateProposalAction(proposal._id, proposal);
        // store.dispatch(updateProposalAct);
        this._updateProposalState(proposal._id);
    };

}

export default withStyles(styles)(StatusChangeModal);
