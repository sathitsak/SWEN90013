import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import { Divider } from "@material-ui/core";
import store from "../../../../store";
import grey from '@material-ui/core/colors/grey'

import {getProposalById} from "../../../../api";
import {
    updatePageTitleAction,
    getProposalByIdAction,
    updateProposalAction,
} from "../../../../store/actionCreators";
import { LoginContext } from "../../../admin/LoginProvider";

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
    chips: {
        display: "flex",
        flexWrap: "wrap"
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(),
        top: theme.spacing(),
        color: theme.palette.grey[500]
    },
    sendButton: {
        backgroundColor: "#094183",
        "&:hover": {
            backgroundColor: "#4074B2"
        }
    },
    discardButton: {
        color: "#094183"
    },
    editButton: {
        marginTop: 0,
        color: "#094183",
    },
    textField: {
        marginLeft: 0,
        marginRight: "5%",
        width: "45%"
    },
    nameTextField: {
        marginLeft: 0,
        marginRight: "5%",
        width: "95%"
    },
    fab: {
        backgroundColor: "#FFFFFF",
        color: grey[700],
        "&:hover": {
            backgroundColor: grey[400],
            color: grey[800]
        },
        boxShadow: "none"
    },
});

var userName;

class EditProposalModal extends React.Component {
    static contextType = LoginContext;

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            fullWidth: true,
            maxWidth: "lg",
        };
    }

    componentDidMount() {
        userName = this.context;
    }

    _handleOpen = () => {
        this.setState({ open: true });
    };

    _handleDiscard = () => {
        this.setState({ open: false });
    };

    _handleSelectUpdate = (e) => {
        this.setState({ subjectId: e.target.value });
    }

    _addEditNote = (proposal) => {

        var newNote = {
            text: "updated the proposal.",
            date: Date.now().toString(),    // Date is represented as an integer, stored as a string
            userName: userName.state.userName,
        };
        var notes = proposal.notes;
        if (notes) {
            notes.push(newNote);
        } else {
            notes = [newNote];
        }

        return notes;
    }

    // handleUpdate gets the data from form HTML
    _handleUpdate = () => {
        var name = document.getElementById("name").value;
        var outlineOfProject = document.getElementById("outlineOfProject").value;
        var endProductBenefits = document.getElementById("endProductBenefits").value;
        var endProductUse = document.getElementById("endProductUse").value;
        var beneficiaries = document.getElementById("beneficiaries").value;
        var originality = document.getElementById("originality").value;

        // Create new proposal object
        let proposal = {
            status: this.props.proposal.status,
            notes: this._addEditNote(this.props.proposal),
            _id: this.props.proposal._id,
            name: name,
            outlineOfProject: outlineOfProject,
            endProductBenefits: endProductBenefits,
            endProductUse: endProductUse,
            beneficiaries: beneficiaries,
            originality: originality,
            clientId: this.props.proposal.clientId,
            subjectId: this.props.proposal.subjectId,
            date: this.props.proposal.date,
            client: this.props.proposal.client,
            __v: this.props.proposal.__v,
        }

         // Send PUT request
         const updateProposalAct = updateProposalAction(this.props.proposal._id, proposal);
         store.dispatch(updateProposalAct);

         // Update project/proposal state
         const updatePageTitleAct = updatePageTitleAction(name);
         store.dispatch(updatePageTitleAct);

         // Close window
         this._handleDiscard();
    };

    render() {
        const { classes, proposal } = this.props;

        return (
            <div>
                <Fab
                    color="default"
                    aria-label="Edit"
                    className={classes.fab}
                    onClick={this._handleOpen}
                    size="small"
                    >
                    <EditIcon />
                </Fab>
                <Dialog
                    fullWidth={this.state.fullWidth}
                    maxWidth={this.state.maxWidth}
                    open={this.state.open}
                    onClose={this._handleDiscard}
                    aria-labelledby="max-width-dialog-title"
                >
                    <DialogTitle onClose={this._handleDiscard}>Edit Proposal</DialogTitle>

                    <Divider />

                    <DialogContent>
                        <form className={classes.container} noValidate autoComplete="off">
                            <TextField
                                id="name"
                                label="Proposal name"
                                defaultValue={proposal.name}
                                className={classes.nameTextField}
                                margin="normal"
                            />
                            <TextField
                                id="outlineOfProject"
                                label="Project outline"
                                defaultValue={proposal.outlineOfProject}
                                className={classes.textField}
                                margin="normal"
                                multiline
                                rows="5"
                                variant="outlined"
                            />
                            <TextField
                                id="endProductUse"
                                label="Use of the end product"
                                defaultValue={proposal.endProductUse}
                                className={classes.textField}
                                margin="normal"
                                multiline
                                rows="5"
                                variant="outlined"
                            />
                            <TextField
                                id="endProductBenefits"
                                label="Benefits of end product"
                                defaultValue={proposal.endProductBenefits}
                                className={classes.textField}
                                margin="normal"
                                multiline
                                rows="5"
                                variant="outlined"
                            />
                            <TextField
                                id="beneficiaries"
                                label="Beneficiaries of end product"
                                defaultValue={proposal.beneficiaries}
                                className={classes.textField}
                                margin="normal"
                                multiline
                                rows="5"
                                variant="outlined"
                            />
                            <TextField
                                id="originality"
                                label="Originality of the idea"
                                defaultValue={proposal.originality}
                                className={classes.textField}
                                margin="normal"
                                multiline
                                rows="5"
                                variant="outlined"
                            />
                        </form>
                    </DialogContent>
                    <Divider />

                    <DialogActions>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this._handleUpdate}
                            className={classes.sendButton}
                        >
                            Update
                        </Button>
                        <Button
                            onClick={this._handleDiscard}
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

export default withStyles(styles)(EditProposalModal);
