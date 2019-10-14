import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {grey, red} from "@material-ui/core/colors";
import ErrorOutlinedIcon from '@material-ui/icons/ErrorOutlined';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import ClientDetails from "./modalcomponents/ClientDetails";
import ClientOrg from "./modalcomponents/ClientOrg";
import Notes from "../Notes/Notes";
import store from "../../../store";
import {updateClientAction} from "../../../store/actionCreators";
import EditClientModal from "./EditClientModal";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        paddingLeft: theme.spacing(4),
        outline: "none"
    },
    editButton: {
        color: "#094183",
    },
    closeButton: {
        marginTop: 0,
        color: "#094183",  
    },
    iconFalse: {
        marginLeft: 20,
        marginBottom: 10,
        color: grey[500],
        '&:hover': {
            color: red[500],
        },
        fontSize: 35,
        verticalAlign: 'middle',
    },
    iconTrue: {
        marginLeft: 20,
        marginBottom: 10,
        '&:hover': {
            color: grey[500],
        },
        fontSize: 35,
        verticalAlign: 'middle',
        color: red[500]
    },
    chipFlag: {
        color: red[500]
    },
    fab: {
        backgroundColor: "#FFFFFF",
        color: grey[700],
        "&:hover": {
            backgroundColor: grey[400],
            color: grey[800]
        },
        boxShadow: "none"
    }
});

class ClientPageModal extends React.Component {
    state = {
        open: false,
        fullWidth: true,
        maxWidth: "xl",
        client: "",
        clientFlag: this.props.client.flag
    };

    _handleClickOpen = () => {
        this.setState({open: true});
    };

    _handleClose = () => {
        this.setState({open: false});
    };

    _concatenateNames = (firstName, lastName) => {
        return (firstName + " " + lastName);
    };

    _handleClientFlagUpdate = () => {
        // Invert clientFlag value and update state and DB
        var currentFlag = !this.state.clientFlag;
        this.setState({clientFlag: currentFlag});

        let client = this.props.client;
        client.flag = currentFlag;

        // Add note to client
        let noteMsg = "false";
        if (currentFlag) {
            noteMsg = "true";
        } 
        var newNote = {
            text: "Client flag has been updated to " + noteMsg + ".",
            date: Date.now().toString(),    // Date is represented as an integer, stored as a string
        };
        var notes = client.notes;
        if (notes) {
            notes.push(newNote);
        } else {
            notes = [newNote];
        }
        client.notes = notes;

        // Send PUT request
        const updateClientAct = updateClientAction(client._id, client);
        store.dispatch(updateClientAct);
    };

    render() {
        const {classes} = this.props;
        var flagIcon;
        var client = this.props.client;
        var objType = this.props.objType;
        var objID = this.props.objID;
        var fabButton;

        if (client.flag) {
            flagIcon = <ErrorOutlinedIcon className={classes.iconTrue}
                                          onClick={this._handleClientFlagUpdate}/>
        } else {
            flagIcon = <ErrorOutlineOutlinedIcon className={classes.iconFalse}
                                                 onClick={this._handleClientFlagUpdate}/>
        }

        if (!client) {
            return <div/>
        }

        // Return a view icon on allClients page, and a chip with clients name for all other pages.
        if (this.props.objType === "allClients") {
            fabButton = 
                <Fab
                    color="default"
                    aria-label="View/Edit"
                    className={classes.fab}
                    onClick={this._handleClickOpen}
                    size="small"
                >
                    <EditIcon />
                </Fab>
        } else {
            fabButton = 
                <Chip
                    onClick={this._handleClickOpen}
                    icon={client.flag ? <ErrorOutlinedIcon className={classes.chipFlag}/> : <FaceIcon/>}
                    label={this._concatenateNames(client.firstName, client.lastName)}
                    variant="outlined"
                    align="center"
                />
        }

        return (
            <div>
                {fabButton}
                <Dialog
                    fullWidth={this.state.fullWidth}
                    maxWidth={this.state.maxWidth}
                    open={this.state.open}
                    onClose={this._handleClose}
                    aria-labelledby="max-width-dialog-title"
                >
                    <DialogContent>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Paper className={classes.paper}>
                                    <h1 style={{color: "#094183"}}>
                                        {this._concatenateNames(client.firstName, client.lastName)}{flagIcon}
                                    </h1>
                                    <ClientDetails
                                        email={client.email}
                                        technicalAbility={client.technicalAbility}
                                        contactNumber={client.contactNumber}
                                        orgNumber={client.organisation.number}
                                        secondaryContactName={this._concatenateNames(client.secondaryContactFirstName, client.secondaryContactLastName)}
                                        secondaryContactEmail={client.secondaryContactEmail}
                                        secondaryContactNumber={client.secondaryContactNumber}
                                    />
                                </Paper>
                            </Grid>

                            <Grid item xs={6}>
                                <Grid style={{marginBottom: "5%"}}>
                                    <Paper className={classes.paper}>
                                        <ClientOrg
                                            orgName={client.organisation.name}
                                            orgSize={client.organisation.size}
                                            industryType={client.organisation.industryType}
                                            description={client.organisation.description}
                                        />
                                    </Paper>
                                </Grid>
                                <Grid>
                                    <Paper className={classes.paper}>
                                        <Notes
                                            notes={client.notes}
                                            object={client}
                                            objectType={"client"}
                                        />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <EditClientModal 
                            client={client}
                            objType={objType}
                            objID={objID} 
                        />
                        <Button onClick={this._handleClose}
                                className={classes.closeButton}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(ClientPageModal);
