import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { Divider } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import store from "../../../store";
import Grid from "@material-ui/core/Grid";
import {getProjectById, getProposalById, getAllClients} from "../../../api";
import {
    getProjectByIdAction,
    getProposalByIdAction,
    updateClientAction,
    getAllClientsAction
} from "../../../store/actionCreators";

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
        marginRight: 15,
        width: "45%"
    },
    emailTextField: {
        marginLeft: 0,
        marginRight: 15,
        width: "93%"
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

class EditClientModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            fullWidth: true,
            maxWidth: "lg",
            technicalAbility: this.props.client.technicalAbility,
            orgSize: this.props.client.organisation.size,
            industry: this.props.client.organisation.industry
        };
    }

    _handleOpen = () => {
        this.setState({ open: true });
    };

    _handleDiscard = () => {
        this.setState({ open: false });
    };

    _handleTechnicalAbilityUpdate = (e, attribute) => {
        if (attribute === "technicalAbility") {
            this.setState({ technicalAbility: e.target.value });
        } else if (attribute === "orgSize") {
            this.setState({ orgSize: e.target.value });
        } else if (attribute === "industry") {
            this.setState({ industry: e.target.value });
        }
    };

    _validateEmail = email => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          return true;
        } else {
          return false;
        }
    };
    
    _validateContactInfo = number => {
        if (
          /^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{1}(\ |-){0,1}[0-9]{3}$/.test(
            number
          )
        ) {
          return true;
        } else {
          return false;
        }
    };

    checkClient = input => {
        if (
            input.firstName === "" ||
            input.lastname === "" ||
            !this._validateEmail(input.email) ||
            !this._validateContactInfo(input.number) ||
            input.technical === "-1"
        ) {
            return false;
        }
        return true;
    };

    checkSecondaryContact = input => {
        if (
            input.ci2firstname === "" ||
            input.ci2lastname === "" ||
            !this._validateEmail(input.ci2email) ||
            !this._validateContactInfo(input.ci2number)
        ) {
            return false;
        }
        return true;
    };

    _addEditNote = (client) => {
        var newNote = {
            text: "Client profile has been updated.",
            date: Date.now().toString(),    // Date is represented as an integer, stored as a string
        };
        var notes = client.notes;
        if (notes) {
            notes.push(newNote);
        } else {
            notes = [newNote];
        }

        return notes;
    }

    // handleUpdate gets the data from form HTML
    _handleUpdate = () => {
        //Client
        var firstname = document.getElementById("firstName").value;
        var lastname = document.getElementById("lastName").value;
        var email = document.getElementById("email").value;
        var number = document.getElementById("contactNumber").value;
        var technicalAbility = document.getElementById("technicalAbility").value;
        //SecondaryContact
        var ci2firstname = document.getElementById("secondaryContactFirstName").value;
        var ci2lastname = document.getElementById("secondaryContactLastName").value;
        var ci2email = document.getElementById("secondaryContactEmail").value;
        var ci2number = document.getElementById("secondaryContactNumber").value;
        //Orgranisation info
        var organisationName = document.getElementById("orgName").value;
        var industry = document.getElementById("industry").value;
        var size = document.getElementById("orgSize").value;
        var description = document.getElementById("description").value;

        if (
        !this.checkClient({
            firstname,
            lastname,
            email,
            number,
            technicalAbility
        })
        ) {
        alert("Please fill valid information for the client");
        } else if (
        !this.checkSecondaryContact({
            ci2firstname,
            ci2lastname,
            ci2email,
            ci2number
        })
        ) {
        alert("Please fill valid information for the secondary contact");
        } else {
        
        // Create new client object
        let client = {
            firstName: firstname,
            lastName: lastname,
            email: email,
            contactNumber: number,
            secondaryContactFirstName: ci2firstname,
            secondaryContactLastName: ci2lastname,
            secondaryContactEmail: ci2email,
            secondaryContactNumber: ci2number,
            technicalAbility: technicalAbility,
            organisation: {
                name: organisationName,
                size: size,
                industry: industry,
                description: description,
            },
            _id: this.props.client._id,
            notes: this._addEditNote(this.props.client),
            flag: this.props.client.flag,
            __v: this.props.client.__v
        }

         // Send PUT request
         const updateClientAct = updateClientAction(this.props.client._id, client);
         store.dispatch(updateClientAct);

         // Update project/proposal state
         this._updateObjectState();

         // Close window
         this._handleDiscard();
        }
    };

    async _updateObjectState() {
        let objType = this.props.objType;
        let objId = this.props.objID;

        if (objType === "proposal") {
            const proposal = await getProposalById(objId);
            const getProposalAction = getProposalByIdAction(proposal);
            store.dispatch(getProposalAction);    
        } else if (objType === "project") {
            const project = await getProjectById(objId);
            const getProjectAction = getProjectByIdAction(project);
            store.dispatch(getProjectAction);
        } else if (objType === "allClients") {
            const clients = await getAllClients();
            const getAllClientsAct = getAllClientsAction(clients);
            store.dispatch(getAllClientsAct);
        }
    }


    render() {
        const { classes, client } = this.props;

        return (
            <div>
                <Button onClick={this._handleOpen}
                    className={classes.editButton}>
                    Edit
                </Button>
                <Dialog
                    fullWidth={this.state.fullWidth}
                    maxWidth={this.state.maxWidth}
                    open={this.state.open}
                    onClose={this._handleDiscard}
                    aria-labelledby="max-width-dialog-title"
                >
                    <DialogTitle onClose={this._handleDiscard}>Edit Client Profile</DialogTitle>

                    <Divider />

                    <DialogContent>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <h5 style={{ marginBottom: 0 }}>Primary Contact</h5>
                                <form className={classes.container} noValidate autoComplete="off">
                                    <TextField
                                        id="firstName"
                                        label="First Name"
                                        defaultValue={client.firstName}
                                        className={classes.textField}
                                        margin="normal"
                                    />
                                    <TextField
                                        id="lastName"
                                        label="Last Name"
                                        defaultValue={client.lastName}
                                        className={classes.textField}
                                        margin="normal"
                                    />
                                    <TextField
                                        id="email"
                                        label="Email Address"
                                        defaultValue={client.email}
                                        className={classes.emailTextField}
                                        margin="normal"
                                    />
                                    <TextField
                                        id="contactNumber"
                                        label="Mobile Number"
                                        defaultValue={client.contactNumber}
                                        className={classes.textField}
                                        margin="normal"
                                    />
                                    <TextField
                                        id="technicalAbility"
                                        select
                                        label="Technical Ability"
                                        className={classes.textField}
                                        defaultValue={this.state.technicalAbility}
                                        value={this.state.technicalAbility}
                                        onChange={e => this._handleTechnicalAbilityUpdate(e, "technicalAbility")}
                                        SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                        margin="normal"
                                    >
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={6}>6</MenuItem>
                                        <MenuItem value={7}>7</MenuItem>
                                        <MenuItem value={8}>8</MenuItem>
                                        <MenuItem value={9}>9</MenuItem>
                                        <MenuItem value={10}>10</MenuItem>
                                    </TextField>
                                </form>
                                <br />
                                <h5 style={{ marginBottom: 0 }}>Secondary Contact</h5>
                                <form className={classes.container} noValidate autoComplete="off">
                                    <TextField
                                        id="secondaryContactFirstName"
                                        label="First Name"
                                        defaultValue={client.secondaryContactFirstName}
                                        className={classes.textField}
                                        margin="normal"
                                    />
                                    <TextField
                                        id="secondaryContactLastName"
                                        label="Last Name"
                                        defaultValue={client.secondaryContactLastName}
                                        className={classes.textField}
                                        margin="normal"
                                    />
                                    <TextField
                                        id="secondaryContactEmail"
                                        label="Email Address"
                                        defaultValue={client.secondaryContactEmail}
                                        className={classes.emailTextField}
                                        margin="normal"
                                    />
                                    <TextField
                                        id="secondaryContactNumber"
                                        label="Mobile Number"
                                        defaultValue={client.secondaryContactNumber}
                                        className={classes.textField}
                                        margin="normal"
                                    />
                                </form>
                            </Grid>
                            <Grid item xs={6}>
                                <h5 style={{ marginBottom: 0 }}>Organisation</h5>
                                <form className={classes.container} noValidate autoComplete="off">
                                    <TextField
                                        id="orgName"
                                        label="Organisation Name"
                                        defaultValue={client.organisation.name}
                                        className={classes.textField}
                                        margin="normal"
                                    />
                                    <TextField
                                        id="orgSize"
                                        select
                                        label="Size of Organisation"
                                        className={classes.textField}
                                        defaultValue={this.state.orgSize}
                                        value={this.state.orgSize}
                                        onChange={e => this._handleTechnicalAbilityUpdate(e, "orgSize")}
                                        SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                        margin="normal"
                                    >
                                        <MenuItem value={"More than 250 employees"}>More than 250 employees</MenuItem>
                                        <MenuItem value={"Between 50 - 249 employees"}>Between 50 - 249 employees</MenuItem>
                                        <MenuItem value={"Between 10 - 49 employees"}>Between 10 - 49 employees</MenuItem>
                                        <MenuItem value={"Less than 10 employees"}>Less than 10 employees</MenuItem>
                                    </TextField>
                                    <TextField
                                        id="industry"
                                        select
                                        label="Industry"
                                        className={classes.emailTextField}
                                        defaultValue={this.state.industry}
                                        value={this.state.industry}
                                        onChange={e => this._handleTechnicalAbilityUpdate(e, "industry")}
                                        SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                        margin="normal"
                                    >
                                        <MenuItem value="Aged care">Aged care</MenuItem>
                                        <MenuItem value="Agriculture">Agriculture</MenuItem>
                                        <MenuItem value="Amusement, events and recreation">Amusement, events and recreation</MenuItem>
                                        <MenuItem value="Animal care and veterinary services">Animal care and veterinary services</MenuItem>
                                        <MenuItem value="Children’s services">Children’s services</MenuItem>
                                        <MenuItem value="Commercial sales ">Commercial sales</MenuItem>
                                        <MenuItem value="Education">Education</MenuItem>
                                        <MenuItem value="Graphic arts">Graphic arts</MenuItem>
                                        <MenuItem value="Hair and beauty ">Hair and beauty</MenuItem>
                                        <MenuItem value="Health and welfare services">
                                            Health and welfare services
                                        </MenuItem>
                                        <MenuItem value="Hospitality ">Hospitality</MenuItem>
                                        <MenuItem value="Indigenous organisations and services">
                                            Indigenous organisations and services
                                        </MenuItem>
                                        <MenuItem value="Journalism">Journalism</MenuItem>
                                        <MenuItem value="Local government administration">
                                            Local government administration
                                        </MenuItem>
                                        <MenuItem value="Market and business consultancy services">
                                            Market and business consultancy services
                                        </MenuItem>
                                        <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
                                        <MenuItem value="Real estate">Real estate</MenuItem>
                                        <MenuItem value="Restaurants">Restaurants</MenuItem>
                                        <MenuItem value="Retail">Retail</MenuItem>
                                        <MenuItem value="Social, community, home care and disability services">
                                            Social, community, home care and disability services
                                        </MenuItem>
                                        <MenuItem value="Sporting organisations">
                                            Sporting organisations
                                        </MenuItem>
                                        <MenuItem value="Storage services">Storage services</MenuItem>
                                        <MenuItem value="Technical services">
                                            Technical services
                                        </MenuItem>
                                        <MenuItem value="Telecommunications services">
                                            Telecommunications services
                                        </MenuItem>
                                        <MenuItem value="Tourism">Tourism</MenuItem>
                                    </TextField>
                                    <TextField
                                        id="description"
                                        label="Description of Organisation"
                                        defaultValue={client.organisation.description}
                                        className={classes.emailTextField}
                                        margin="normal"
                                    />
                                </form>
                            </Grid>
                        </Grid>


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

export default withStyles(styles)(EditClientModal);
