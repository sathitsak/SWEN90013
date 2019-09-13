import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import ClientDetails from "./modalcomponents/ClientDetails";
import ClientOrg from "./modalcomponents/ClientOrg";
import Notes from "../Notes/Notes";
import { getClientById } from "../../../api";
import { getClientByIdAction } from "../../../store/actionCreators";
import store from "../../../store";


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
    }
});

class ClientPageModal extends React.Component {
    state = {
        open: false,
        fullWidth: true,
        maxWidth: "xl",
        client: "",
    };

    // async _reqTodoList(clientId) {
    //     const clientResult = await getClientById(clientId);
    //     const clientAction = getClientByIdAction(clientResult);
    //     store.dispatch(clientAction);
    // }

    // componentDidMount() {
    //     //PASSING THE ID
    //     const clientId = this.props.match.params.clientId;
    //     this._reqTodoList(clientId);
    // }

    // _handleChange = () => {
    //     this.setState({ client: store.getState().client });
    // };

    _handleClickOpen = () => {
        this.setState({open: true});
    };

    _handleClose = () => {
        this.setState({open: false});
    };

    _concatenateNames = (firstName, lastName) => {
        return (firstName + " " + lastName);
    }

    render() {
        const { classes, client } = this.props;
        // const { client } = this.state.client;

        return (
            <div>
                <Typography gutterBottom/>
                <Chip
                    onClick={this._handleClickOpen}
                    icon={<FaceIcon/>}
                    label={this._concatenateNames(client.firstName,client.lastName)}
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
                        <DialogContentText>
                            <Grid container spacing={24}>
                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>
                                        <ClientDetails
                                            clientName={this._concatenateNames(client.firstName,client.lastName)}
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
                                    <Grid xs={12} style={{ marginBottom: "5%" }}>
                                        <Paper className={classes.paper}>
                                            <ClientOrg 
                                                orgName={client.organisation.name}
                                                orgSize={client.organisation.size}
                                                industry={client.organisation.industry}
                                                description={client.organisation.description}
                                            />
                                        </Paper>
                                    </Grid>
                                    <Grid xs={12}>
                                        <Paper className={classes.paper}>
                                            <Notes notes={client.notes}/>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this._handleClose} className={classes.closeButton}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(ClientPageModal);
