import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import BuildingIcon from "@material-ui/icons/AccountBalance";
import TimeIcon from "@material-ui/icons/AccessTime";
import SubjectIcon from "@material-ui/icons/Assignment";

import Button from "@material-ui/core/Button";

const styles = theme => ({
  margin: {
    marginLeft: 10,
    paddingLeft: 20
  }
});

class AddSubjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectName: "",
      subjectCode: "",
      subjectSemester: ""
    };
    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(event) {
    console.log(this.state.subjectName);
    console.log(this.state.subjectCode);
    console.log(this.state.subjectSemester);
    this.setState({ subjectName: "", subjectCode: "", subjectSemester: "" });
  }

  _handleChange = (field, event) => {
    if (field == "name") {
      this.setState({ subjectName: event.target.value });
    } else if (field == "code") {
      this.setState({ subjectCode: event.target.value });
    } else if (field == "semester") {
      this.setState({ subjectSemester: event.target.value });
    }
  };

  render() {
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} style={{ paddingBottom: 30 }}>
            <FormControl className={styles.margin}>
              <InputLabel htmlFor="input-with-icon-adornment">Name</InputLabel>
              <Input
                id="input-with-icon-adornment"
                value={this.state.subjectName}
                onChange={e => this._handleChange("name", e)}
                startAdornment={
                  <InputAdornment position="start">
                    <SubjectIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <br />
          <Grid item xs={12} style={{ paddingBottom: 30 }}>
            <FormControl className={styles.margin}>
              <InputLabel htmlFor="input-with-icon-adornment">
                Subject Code
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                value={this.state.subjectCode}
                onChange={e => this._handleChange("code", e)}
                startAdornment={
                  <InputAdornment position="start">
                    <SubjectIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <br />
          <Grid item xs={12} style={{ paddingBottom: 30 }}>
            <FormControl className={styles.margin}>
              <InputLabel htmlFor="input-with-icon-adornment">
                Semester{" "}
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                value={this.state.subjectSemester}
                onChange={e => this._handleChange("semester", e)}
                startAdornment={
                  <InputAdornment position="start">
                    <TimeIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <br />
          <Grid item xs={12} style={{ paddingBottom: 30 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={this._handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(AddSubjectForm);
