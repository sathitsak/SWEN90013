import React from "react";
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
    padding: theme.spacing.unit * 4,
    paddingLeft: theme.spacing.unit * 4,
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
  chip: {
    margin: theme.spacing.unit / 4
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
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500]
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

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder"
];

const templates = [
  { title: "Template A", message: "template content a" },
  { title: "Template B", message: "template content b" },
  { title: "Template C", message: "template content c" },
  { title: "None", message: "" }
];

class EmailModal extends React.Component {
  state = {
    open: false,
    fullWidth: true,
    maxWidth: "lg",
    email_recipients: [],
    email_cc: [],
    email_bcc: [],
    email_template: "",
    email_message: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (emailField, event) => {
    if (emailField == "email_recipients") {
      this.setState({ email_recipients: event.target.value });
    } else if (emailField == "email_cc") {
      this.setState({ email_cc: event.target.value });
    } else if (emailField == "email_bcc") {
      this.setState({ email_bcc: event.target.value });
    } else if (emailField == "email_template") {
      this.setState({ email_template: event.target.value });
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
    for (var i = 0; i < templates.length; i++) {
      if (templates[i].title === template_title) {
        return templates[i].message;
      }
    }
  }

  // UPDATE URL FROM BOWEN
  handleSendEmail() {
    axios
      .post(`http://localhost:13000/api/email`, {
        account: {
          user: "cis.projectmanagementsystem@gmail",
          pw: "finalyearproj2019"
        },
        message: {
          from: "this supervisor",
          to: this.state.email_recipients,
          html: this.state.email_message
        }
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    alert("sending email");
  }

  unsubscribe = store.subscribe(this.handleChange);

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
                  {names.map(name => (
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
                  {names.map(name => (
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
                  {names.map(name => (
                    <MenuItem key={name} value={name} style={{ width: "100%" }}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="email_template">
                  Choose template if applicable
                </InputLabel>
                <Select
                  className={classes.selectField}
                  autoWidth="true"
                  value={this.state.email_template}
                  onChange={e => this.handleChange("email_template", e)}
                  input={<Input id="email_template" />}
                  MenuProps={MenuProps}
                >
                  {templates.map((template, index) => (
                    <MenuItem
                      key={index}
                      value={template.title}
                      style={{ width: "100%" }}
                    >
                      {template.title}
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
                // onChange={this.handleChange.bind(this)}
              />
            </form>
          </DialogContent>

          <Divider />

          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSendEmail}
            >
              Send
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Discard
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(EmailModal);
