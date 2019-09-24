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

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        paddingLeft: theme.spacing.unit * 4,
        outline: "none"
    },
    closeButton: {
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

        // Send PUT request
        const updateClientAct = updateClientAction(client._id, client);
        store.dispatch(updateClientAct);
    };

    render() {
        const {classes} = this.props;
        var flagIcon;
        var client = this.props.client;
        var clientFlag = this.state.clientFlag;

        if (clientFlag) {
            flagIcon = <ErrorOutlinedIcon className={classes.iconTrue}
                                          onClick={this._handleClientFlagUpdate}/>
        } else {
            flagIcon = <ErrorOutlineOutlinedIcon className={classes.iconFalse}
                                                 onClick={this._handleClientFlagUpdate}/>
        }

        if (!client) {
            return <div/>
        }

        return (
            <div>
                <Chip
                    onClick={this._handleClickOpen}
                    icon={<FaceIcon/>}
                    label={this._concatenateNames(client.firstName, client.lastName)}
                    variant="outlined"
                    align="center"
                />
                <Dialog
                    fullWidth={this.state.fullWidth}
                    maxWidth={this.state.maxWidth}
                    open={this.state.open}
                    onClose={this._handleClose}
                    aria-labelledby="max-width-dialog-title"
                >
                    <DialogContent>
                        <Grid container spacing={24}>
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
                                        flag={client.flag}
                                    />
                                </Paper>
                            </Grid>

                            <Grid item xs={6}>
                                <Grid style={{marginBottom: "5%"}}>
                                    <Paper className={classes.paper}>
                                        <ClientOrg
                                            orgName={client.organisation.name}
                                            orgSize={client.organisation.size}
                                            industry={client.organisation.industryType}
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
