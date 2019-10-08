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
import axios from 'axios';
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"; 
import Button from "@material-ui/core/Button"
import {addNewCoordinator} from "./AdminFunctions"
import SubjectIcon from "@material-ui/icons/Assignment";

const styles = theme => ({
  margin: {
    marginLeft: 10,
    paddingLeft: 20
  }
});

class AddCoordinatorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinatorFirstName:"",
      coordinatorLastName:"",
      coordinatorEmail:"",
      coordinatorContactNumber:"",
      coordinatorOfficeLocation:"",
      coordinatorSubject:"",
      allCoordinators : []
    }
    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }
  componentDidMount() {
    axios.get('http://localhost:13000/api/coordinator')
  .then(response => {
    this.setState({
      allCoordinators: response.data
    })
  })}

  componentDidUpdate() {
    axios.get('http://localhost:13000/api/coordinator')
  .then(response => {
    this.setState({
      allCoordinators: response.data
    })
  })}

  _handleChange = (field, event) => {
    if (field == "firstName") {
      this.setState({ coordinatorFirstName: event.target.value });
    } else if (field == "lastName") {
      this.setState({ coordinatorLastName: event.target.value });
    } else if (field == "email") {
      this.setState({ coordinatorEmail: event.target.value });
    } else if (field == "contactNumber") {
      this.setState({coordinatorContactNumber: event.target.value})
    } else if (field == "officeLocation") {
      this.setState({coordinatorOfficeLocation: event.target.value})
    } else if(field =="subject") {
      this.setState({coordinatorSubject: event.target.value})
    }
  };

  _handleSubmit(event) {
    addNewCoordinator(this.state.coordinatorFirstName, this.state.coordinatorLastName, this.state.coordinatorEmail, this.state.coordinatorContactNumber, this.state.coordinatorOfficeLocation, this.state.coordinatorSubject)
    this.setState({ coordinatorFirstName: "", coordinatorContactNumber:"", coordinatorLastName: "", coordinatorEmail: "" , coordinatorOfficeLocation:"", coordinatorSubject:""});
  }
  
  render() {
    const{ allCoordinators} = this.state; 
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} style={{paddingBottom:30}}>
          <Paper style={{maxHeight: 200, overflow: 'auto', paddinTop: 50}}> 
       
        <br/>
        <Typography component="p">
   {allCoordinators.map(coordinator => {
     return <p>{coordinator.firstName} {coordinator.lastName} ({coordinator.subjectId})</p>
   })} 
      
        </Typography>
      </Paper>
          </Grid>
          <Grid item xs={12} style={{ paddingBottom: 30 }}>
            <FormControl className={styles.margin}>
              <InputLabel htmlFor="input-with-icon-adornment">
                First Name
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                value={this.state.coordinatorFirstName}
                onChange={e=>this._handleChange("firstName",e)}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <br />
          <Grid item xs={12} style={{ paddingBottom: 30 }}>
            <FormControl className={styles.margin}>
              <InputLabel htmlFor="input-with-icon-adornment">
                Last Name
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                value={this.state.coordinatorLastName}
                onChange={e=>this._handleChange("lastName",e)}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <br />
          <Grid item xs={12} style={{ paddingBottom: 30 }}>
            <FormControl className={styles.margin}>
              <InputLabel htmlFor="input-with-icon-adornment">
                Email{" "}
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                value={this.state.coordinatorEmail}
                onChange={e=>this._handleChange("email",e)}
                startAdornment={
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <br />
          <Grid item xs={12} style={{ paddingBottom: 30 }}>
            <FormControl className={styles.margin}>
              <InputLabel htmlFor="input-with-icon-adornment">
                Contact Number{" "}
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                value={this.state.coordinatorContactNumber}
                onChange={e=>this._handleChange("contactNumber",e)}
                startAdornment={
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <br />
          <Grid item xs={12} style={{ paddingBottom: 30 }}>
            <FormControl className={styles.margin}>
              <InputLabel htmlFor="input-with-icon-adornment">
                Office Location{" "}
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                value={this.state.coordinatorOfficeLocation}
                onChange={e=>this._handleChange("officeLocation",e)}
                startAdornment={
                  <InputAdornment position="start">
                    <BuildingIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid> 
          <Grid item xs={12} style={{paddingBotton:30}}>
          <FormControl className={styles.margin}>
              <InputLabel htmlFor="input-with-icon-adornment">
                Subject Code
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                value={this.state.coordinatorSubject}
                onChange={e => this._handleChange("subject", e)}
                startAdornment={
                  <InputAdornment position="start">
                    <SubjectIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <br/> 
          <Grid item xs={12} style={{ paddingBottom: 30, paddingTop: 30, marginLeft:'50%' }}>
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

export default withStyles(styles)(AddCoordinatorForm);
