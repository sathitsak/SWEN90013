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
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from "axios"
import SubjectIcon from "@material-ui/icons/Assignment";
import {addNewSupervisor} from "./AdminFunctions"

import Button from "@material-ui/core/Button";


const styles = theme => ({
  margin: {
    marginLeft: 10,
    paddingLeft: 20
  },
});

var allSupervisorsArray=[]

class AddSupervisorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      supervisorFirstName:"",
      supervisorLastName:"",
      supervisorEmail:"",
      supervisorContactNumber:"",
      supervisorOfficeLocation:"",
      supervisorSubject:"",
      allSupervisors: []
    }
    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }
  _handleSubmit() {
   
  }

  componentDidMount() {
    axios.get('http://localhost:13000/api/supervisor')
  .then(response => {
    this.setState({
      allSupervisors: response.data
    })
  })
  .catch(function (error) {
    console.log(error);
  });
  }

  componentDidUpdate() {
    axios.get('http://localhost:13000/api/supervisor')
  .then(response => {
    this.setState({
      allSupervisors: response.data
    })
  })}


  _handleChange = (field, event) => {
    if (field == "firstName") {
      this.setState({ supervisorFirstName: event.target.value });
    } else if (field == "lastName") {
      this.setState({ supervisorLastName: event.target.value });
    } else if (field == "email") {
      this.setState({ supervisorEmail: event.target.value });
    } else if (field == "contactNumber") {
      this.setState({supervisorContactNumber: event.target.value})
    } else if (field == "officeLocation") {
      this.setState({supervisorOfficeLocation: event.target.value})
    } else if(field =="subject") {
      this.setState({supervisorSubject: event.target.value})
    }
  };

  _handleSubmit(event) {
    addNewSupervisor(this.state.supervisorFirstName, this.state.supervisorLastName, this.state.supervisorEmail, this.state.supervisorContactNumber, this.state.supervisorOfficeLocation, this.state.supervisorSubject)
    this.setState({ supervisorFirstName: "", supervisorContactNumber:"", supervisorLastName: "", supervisorEmail: "" , supervisorOfficeLocation:"", supervisorSubject:""});
  }
  
  
  render() {
    const {allSupervisors} = this.state; 

    return (
     
      <div>
         
        <Grid container spacing={3}>
        <Grid item xs={12} style={{ paddingBottom: 30 }}> 
        <div>
      <Paper style={{maxHeight: 200, overflow: 'auto', paddinTop: 50}}> 
       
        <br/>
        <Typography component="p">
   {allSupervisors.map(supervisor => {
     return <p>{supervisor.firstName} {supervisor.lastName} ({supervisor.subjectId})</p>
   })} 
      
        </Typography>
      </Paper>
    </div>
 
          </Grid>
          <Grid item xs={12} style={{ paddingBottom: 30 }}>
            <FormControl className={styles.margin}>
              <InputLabel htmlFor="input-with-icon-adornment">
                First Name 
              </InputLabel>
              <Input
                id="input-with-icon-adornment" 
                value={this.state.supervisorFirstName}
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
                value={this.state.supervisorLastName}
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
                value={this.state.supervisorEmail}
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
                value={this.state.supervisorContactNumber}
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
                value={this.state.supervisorOfficeLocation}
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
                value={this.state.supervisorSubject}
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
          <Grid item xs={12} style={{ paddingBottom: 30, paddingTop:30, marginLeft:'50%'}}>
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

export default withStyles(styles)(AddSupervisorForm);
