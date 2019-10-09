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
import grey from '@material-ui/core/colors/grey';
import {getProposalById} from "../../../../api";
import {
    getProposalByIdAction,
    updateProposalAction,
} from "../../../../store/actionCreators";

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

class EditProposalModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            fullWidth: true,
            maxWidth: "lg",
        };
    }

    _handleOpen = () => {
        this.setState({ open: true });
    };

    _handleDiscard = () => {
        this.setState({ open: false });
    };

    _addEditNote = (proposal) => {
        var newNote = {
            text: "Proposal has been updated.",
            date: Date.now().toString(),    // Date is represented as an integer, stored as a string
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
        var subjectId = document.getElementById("subjectId").value;

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
            subjectId: subjectId,
            date: this.props.proposal.date,
            __v: this.props.proposal.__v,
        }

         // Send PUT request
         const updateProposalAct = updateProposalAction(this.props.proposal._id, proposal);
         store.dispatch(updateProposalAct);

         // Update project/proposal state
         this._updateProposalState(this.props.proposal._id);

         // Close window
         this._handleDiscard();
    };

    async _updateProposalState(proposalID) {
        const proposal = await getProposalById(proposalID);
        const getProposalAction = getProposalByIdAction(proposal);
        store.dispatch(getProposalAction);    
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
                                className={classes.textField}
                                margin="normal"
                            />
                            <TextField
                                id="subjectId"
                                label="Subject assigned to"
                                defaultValue={proposal.subjectId}
                                className={classes.textField}
                                margin="normal"
                            />
                            <TextField
                                id="outlineOfProject"
                                label="Project outline"
                                defaultValue={proposal.outlineOfProject}
                                className={classes.textField}
                                margin="normal"
                                multiline="true"
                                rows="5"
                                variant="outlined"
                            />
                            <TextField
                                id="endProductUse"
                                label="Use of the end product"
                                defaultValue={proposal.endProductUse}
                                className={classes.textField}
                                margin="normal"
                                multiline="true"
                                rows="5"
                                variant="outlined"
                            />
                            <TextField
                                id="endProductBenefits"
                                label="Benefits of end product"
                                defaultValue={proposal.endProductBenefits}
                                className={classes.textField}
                                margin="normal"
                                multiline="true"
                                rows="5"
                                variant="outlined"
                            />
                            <TextField
                                id="beneficiaries"
                                label="Beneficiaries of end product"
                                defaultValue={proposal.beneficiaries}
                                className={classes.textField}
                                margin="normal"
                                multiline="true"
                                rows="5"
                                variant="outlined"
                            />
                            <TextField
                                id="originality"
                                label="Originality of the idea"
                                defaultValue={proposal.originality}
                                className={classes.textField}
                                margin="normal"
                                multiline="true"
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
