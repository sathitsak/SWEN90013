import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import EmailIcon from "@material-ui/icons/Email";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import { Divider } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import store from "../../../store";
import axios from "axios";
import { ENETUNREACH } from "constants";
import {constructNormalEmail} from "./EmailHeaderFooter"; 
import { LoginContext } from "../../admin/LoginProvider";
import {sendProjectDetails} from "./AutomatedEmailFunctions";  
import {addNoteAction} from "../../../store/actionCreators";


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
    maxWidth: 300
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  selectField: {
    [theme.breakpoints.up("md")]: {
      width: 1118
    },
    [theme.breakpoints.down("md")]: {
      width: 480
    }
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
  sendButton: {
    backgroundColor: "#094183",
    "&:hover": {
      backgroundColor: "#4074B2"
    }
  },
  discardButton: {
    color: "#094183"
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

const templatesMap = new Map();
const templatesNewArray = [];
const tempCoordinatorNameArray = [];

const nameEmailMap = new Map();
const coordinatorMap = new Map();

//test username context 
var valueOfContext;
var context; 
var sendProjectDetailsButton; 

const templates = [
  { title: "Template A", message: "template content a" },
  { title: "Template B", message: "template content b" },
  { title: "Template C", message: "template content c" },
  { title: "None", message: "" }
];

class EmailModal extends React.Component {
  static contextType = LoginContext;
  //valueOfContext = this.context; 

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      fullWidth: true,
      maxWidth: "lg",
      email_recipients: [],
      email_cc: [],
      email_bcc: [],
      email_subject: "",
      email_template: "",
      email_message: "",
      context: "",
      available_recipients: [],
      templatesNew: []
    };
    this.handleSendEmail = this.handleSendEmail.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);  
    this._getStudents = this._getStudents.bind(this); 
  }

  componentDidMount() {
    //testing context
    valueOfContext = this.context;
    console.log("another way ");
    console.log(valueOfContext); 
    console.log(valueOfContext.state.userName);
   
    //get students 
    
    axios
    .get(`http://172.26.88.142:3000/api/template`)
    .then(function(response) {
      console.log(response.data);
      var templates = response.data;

      Object.keys(templates).forEach(function(key) {
        console.log(key, templates[key].title);
        templatesNewArray.push(templates[key].title);
        templatesMap.set(templates[key].title, templates[key].message);
      });
    })
    .catch(function(error) {
      console.log(error);
    });

  console.log(this.state.templates);



  }

  handleClickOpen = () => {
    this.setState({ open: true });
  

    //get all coordinators

  
    var subjects = store.getState().subjects;



    subjects.forEach(s => {
      if('coordinator' in s) {
        var fullNameRole = s.coordinator.firstName + " " + s.coordinator.lastName+ " (Coordinator)";
        nameEmailMap.set(fullNameRole, s.coordinator.email);
        this.state.available_recipients.push(fullNameRole); 
      }
    })

    //check the URL to determine the context of the email
    var url = window.location.href;
    var split = url.split("/");
    context = split[4];
    console.log(split[4]);

    var clientName =
      store.getState().proposal.client.firstName +
      " " +
      store.getState().proposal.client.lastName +
      " (Client)";
    var clientEmail = store.getState().proposal.client.email;
    var clientSecondaryName =
      store.getState().proposal.client.secondaryContactFirstName +
      " " +
      store.getState().proposal.client.secondaryContactLastName +
      " (Secondary Contact)";
    var clientSecondaryEmail = store.getState().proposal.client
      .secondaryContactEmail;

    if (split[4] == "proposals") {
      nameEmailMap.set(clientName, clientEmail);
      this.state.available_recipients.push(clientName);

      nameEmailMap.set(clientSecondaryName, clientSecondaryEmail);

      for (const x in tempCoordinatorNameArray) {
        this.state.email_recipients.push(x);
      }

      this.state.available_recipients.push(clientSecondaryName);
    } else if (split[4] == "projects") {
      for (const x in tempCoordinatorNameArray) {
        this.state.email_recipients.push(x);
      }
      this.state.available_recipients.push(clientName, clientSecondaryName);
      nameEmailMap.set(
        store.getState().proposal.client.firstName,
        store.getState().proposal.client.email
      );

      var teams = store.getState().project.products;
      var students = [];

      teams.map(individualTeam => students.push(individualTeam.students));

      var studentsFlattened = students.flat();

      studentsFlattened.map(student => {
        nameEmailMap.set(student.name, student.email);
        this.state.available_recipients.push(student.name);
      });
    }
  };

  handleClose = () => {
    this.setState({ available_recipients: [] });
    this.setState({ email_recipients: [] });
    this.setState({ email_cc: [] });
    nameEmailMap.clear();
    this.setState({ open: false });
  };

  handleChange = (emailField, event) => {
    if (emailField == "email_recipients") {
      this.setState({ email_recipients: event.target.value });
    } else if (emailField == "email_cc") {
      this.setState({ email_cc: event.target.value });
    } else if (emailField == "email_bcc") {
      this.setState({ email_bcc: event.target.value });
    } else if (emailField == "email_subject") {
      this.setState({ email_subject: event.target.value });
    } else if (emailField == "email_template") {
      this.setState({ templatesNew: event.target.value });
      let email_message = this.getEmailMessage(event.target.value);
      this.setState({ email_message: email_message });
    }
  };

  handleChangeMultiple = (emailField, event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    if (emailField == "email_recipients") {
      this.setState({ email_recipients: value });
    } else if (emailField == "email_cc") {
      this.setState({ email_cc: value });
    } else if (emailField == "email_bcc") {
      this.setState({ email_bcc: value });
    }
  };

  getEmailMessage(template_title) {
    // for (var i = 0; i < templates.length; i++) {
    //   if (templates[i].title === template_title) {
    //     return templates[i].message;
    //   }
    // }
    return templatesMap.get(template_title);
  }

  handleSendEmail() {
    var emails = [];
    var emailscc = [];
    this.state.email_recipients.map(name =>
      emails.push(nameEmailMap.get(name))
    );

    this.state.email_cc.map(name => emailscc.push(nameEmailMap.get(name)));

    console.log(emails);

    //send multiple posts

    axios
      .post(`http://35.197.167.244/message`, {
        from: "CIS Project Management",
        to: emails,
        subject: this.state.email_subject,
        html: constructNormalEmail(this.state.email_message),
        projectType: "fdafdsa",
        cc: emailscc,
        projectID: ""
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });

   
    this.setState({ email_recipients: [] });
    this.setState({ available_recipients: [] });
    nameEmailMap.clear();
    this.setState({ open: false });
    
    this._sendNote(); 
    

  }

  _sendNote() {
    const {objectType, object} = this.props;
    var newNote = {
      text: 'EMAIL to ' + this.state.email_recipients + ' from ' + valueOfContext.state.userName + ': ' + this.state.email_message,
      date: Date.now().toString(),    
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
  }



  unsubscribe = store.subscribe(this.handleChange);

  _handleEmailContentChange(e) {
    const email_message = e.target.value;
    this.setState({ email_message: email_message });
  }

  _getStudents() {
    var teams = store.getState().project.products;
    var students = [];

    teams.map(individualTeam => students.push(individualTeam.students));

    var studentsFlattened = students.flat();

    studentsFlattened.map(student => {
      students.push(student.email);

    });



    sendProjectDetails(students, store.getState().project.name, store.getState().project.proposal.outlineOfProject, store.getState().project.proposal.client.organisation.name, store.getState().project.proposal.client.firstName, store.getState().project.proposal.client.lastName); 
    this.handleClose(); 
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography gutterBottom />
        <Fab
          color="primary"
          aria-label="Email"
          className={classes.fab}
          onClick={this.handleClickOpen}
        >
          <EmailIcon />
        </Fab>
        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle onClose={this.handleClose}>Send Email</DialogTitle>

          <Divider />

          <DialogContent>
            <form className={classes.container} noValidate autoComplete="off">
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="email_recipients">To</InputLabel>
                <Select
                  className={classes.selectField}
                  autoWidth="true"
                  multiple
                  value={this.state.email_recipients}
                  onChange={e => this.handleChange("email_recipients", e)}
                  input={<Input id="email_recipients" />}
                  renderValue={selected => (
                    <div className={classes.chips}>
                      {selected.map(value => (
                        <Chip
                          key={value}
                          label={value}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {this.state.available_recipients.map(name => (
                    <MenuItem key={name} value={name} style={{ width: "100%" }}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="email_cc">CC</InputLabel>
                <Select
                  className={classes.selectField}
                  autoWidth="true"
                  multiple
                  value={this.state.email_cc}
                  onChange={e => this.handleChange("email_cc", e)}
                  input={<Input id="email_cc" />}
                  renderValue={selected => (
                    <div className={classes.chips}>
                      {selected.map(value => (
                        <Chip
                          key={value}
                          label={value}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {this.state.available_recipients.map(name => (
                    <MenuItem key={name} value={name} style={{ width: "100%" }}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="email_bcc">BCC</InputLabel>
                <Select
                  className={classes.selectField}
                  autoWidth="true"
                  multiple
                  value={this.state.email_bcc}
                  onChange={e => this.handleChange("email_bcc", e)}
                  input={<Input id="email_bcc" />}
                  renderValue={selected => (
                    <div className={classes.chips}>
                      {selected.map(value => (
                        <Chip
                          key={value}
                          label={value}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                   {this.state.available_recipients.map(name => (
                    <MenuItem key={name} value={name} style={{ width: "100%" }}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              <TextField
                id="standard-with-placeholder"
                label="Please enter a subject"
                placeholder=""
                className={classes.textField}
                margin="normal"
                style={{ maxWidth: 300, minWidth: 120 }}
                onChange={e => this.handleChange("email_subject", e)}
              />
              <br />
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="email_template">
                  Choose template if applicable
                </InputLabel>
                <Select
                  className={classes.selectField}
                  autoWidth="true"
                  value={this.state.templatesNew}
                  onChange={e => this.handleChange("email_template", e)}
                  input={<Input id="email_template" />}
                  MenuProps={MenuProps}
                >
                  {templatesNewArray.map(template => (
                    <MenuItem
                      key={template}
                      value={template}
                      style={{ width: "100%" }}
                    >
                      {template}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Divider style={{ marginTop: "1%", marginBottom: "1%" }} />
              <InputBase
                fullWidth
                id="message"
                className={classes.margin}
                multiline="true"
                rows="10"
                value={this.state.email_message}
                onChange={e => this._handleEmailContentChange(e)}
              />
            </form>
          </DialogContent>
          <Divider />

          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSendEmail}
              className={classes.sendButton}
            >
              Send
            </Button>
            <Button
              onClick={this.handleClose}
              color="primary"
              className={classes.discardButton}
            >
              Discard
            </Button>
            {console.log(context)}
            {context == "projects" ? <Button onClick={this._getStudents} color="primary" > Send Project Details </Button> : null}; 
   
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(EmailModal);
