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
import ClientOrgAndContact from "./modalcomponents/ClientOrgAndContact";
import ClientNotes from "./modalcomponents/ClientNotes";
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
        client: ""
    };

    async _reqTodoList(clientId) {
        // const clientId = store.getState().proposal.clientId;
        // console.log(clientId);
        const clientResult = await getClientById(clientId);
        const clientAction = getClientByIdAction(clientResult);
        store.dispatch(clientAction);
    }

    componentDidMount() {
        //PASSING THE ID
        const id = this.props.clientId;
        console.log("clientId" + " " + id);
        // const id = "";
        // if (type === "proposal") {
        //     id =  store.getState().proposal.clientId;
        //     console.log("clientModal"+ " "+id);
        // } else if (type === "project") {
        //     id = store.getState().project;
        // };
        this._reqTodoList(id);
      }

    _handleClickOpen = () => {
        this.setState({open: true});
    };

    _handleClose = () => {
        this.setState({open: false});
    };

    _handleChange = () => {
        this.setState({ client: store.getState().client });
      };
    
    unsubscribe = store.subscribe(this._handleChange);

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Typography gutterBottom/>
                <Chip
                    onClick={this._handleClickOpen}
                    icon={<FaceIcon/>}
                    label="Stephanie Armther"
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
                                            client={this.state.client}/>
                                    </Paper>
                                </Grid>

                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>
                                        <ClientOrgAndContact/>
                                    </Paper>
                                </Grid>

                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        <ClientNotes/>
                                    </Paper>
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
