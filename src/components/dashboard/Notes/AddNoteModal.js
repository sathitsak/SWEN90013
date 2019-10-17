import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import InputBase from "@material-ui/core/InputBase";
import {Divider} from "@material-ui/core";
import store from "../../../store";
import {addNoteAction} from "../../../store/actionCreators";
import { LoginContext } from "../../admin/LoginProvider";

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
    fab: {
        backgroundColor: "#094183",
        "&:hover": {
            backgroundColor: "#4074B2"
        },
        boxShadow: "none"
    },
    addButton: {
        backgroundColor: "#094183",
        "&:hover": {
            backgroundColor: "#4074B2"
        }
    },
    discardButton: {
        color: "#094183"
    },
    note: {
        width: "100%",
        marginTop: 5,
        paddingBottom: 0,
    }
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

var userName;

class AddNoteModal extends React.Component {
    static contextType = LoginContext;

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            fullWidth: true
        };
    }

    componentDidMount() {
        userName = this.context;
    };

    _handleClickOpen = () => {
        this.setState({open: true});
    };

    _handleClose = () => {
        this.setState({open: false});
    };

    _handleAddNote = () => {
        const {objectType, object} = this.props;

        var noteMsg = document.getElementById("note").value;   

        if (noteMsg) {
            var newNote = {
                text: "added a note: " + noteMsg,
                date: Date.now().toString(),    // Date is represented as an integer, stored as a string
                userName: userName.state.userName
            };
            var notes = object.notes;
            if (notes) {
                notes.push(newNote);
            } else {
                notes = [newNote];
            }
            object.notes = notes;

            // Send PUT request
            const addNoteAct = addNoteAction(objectType, object._id, object);
            console.log(addNoteAct);
            store.dispatch(addNoteAct);

            // Close window
            this._handleClose();
        } else {
            alert("Please provide a valid note.");
        }
    };

    render() {
        const {classes} = this.props;

        return (
            <div>
                <Typography gutterBottom/>
                <Fab
                    color="primary"
                    aria-label="Add a note"
                    className={classes.fab}
                    onClick={this._handleClickOpen}
                >
                    <NoteAddIcon/>
                </Fab>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.state.open}
                    onClose={this._handleClose}
                    fullWidth={this.state.fullWidth}
                >
                    <DialogTitle onClose={this._handleClose}>Add a
                        note</DialogTitle>

                    <Divider/>

                    <DialogContent>
                        <form className={classes.note} noValidate
                              autoComplete="off">
                            <InputBase
                                fullWidth
                                id="note"
                                className={classes.note}
                                multiline={true}
                                rows="5"
                            />
                        </form>
                    </DialogContent>

                    <Divider/>

                    <DialogActions>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this._handleAddNote}
                            className={classes.addButton}
                        >
                            Add
                        </Button>
                        <Button
                            onClick={this._handleClose}
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

export default withStyles(styles)(AddNoteModal);

