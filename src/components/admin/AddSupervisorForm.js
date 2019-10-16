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
import {baseURL} from "../../api/index" 


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import {deleteSupervisorMethod} from "./AdminFunctions";

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
    //return false is what you check is true 
    ValidatorForm.addValidationRule("nameValidator", value => {
      var regex = new RegExp("[0-9]+"); 
      if(value != null) {
        if(!regex.test(value)) {
          return false;
        } else {
          return true; 
        }
      }
     
    })

    ValidatorForm.addValidationRule("numberValidator", value => {
      var regex = new RegExp("[0-9]+"); 
      if(!regex.test(value)) {
        return false;
      } else {
        return true; 
      }
    })

    ValidatorForm.addValidationRule("checkNumberLength", value => {
      if(value.length != 8 && value.length != 10) {
        return false;
      } else {
        return true; 
      }
    })




    axios.get(baseURL+'/supervisor')
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
    axios.get(baseURL+'/supervisor')
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

  _deleteSupervisor(id) { 
    deleteSupervisorMethod(id); 
}
  
  
  render() {
    const {allSupervisors} = this.state; 

    return (
     
      <div>
         
        <Grid container spacing={3}>
        <Grid item xs={12} style={{ paddingBottom: 30 }}> 
        <div>
    
       
        <br/>
        <List style={{maxHeight:200, overflow: 'auto'}}> 
        {allSupervisors.map((supervisor) => {
     return  <ListItem>
       
     <ListItemIcon>
       <AccountCircle />
     </ListItemIcon>
     <ListItemText
       primary={supervisor.firstName + " " + supervisor.lastName + " (" + supervisor.subjectId+")"}
      
       
     />
      <IconButton edge="end" aria-label="delete" onClick={() => this._deleteSupervisor(supervisor._id)}>
         <DeleteIcon />
       </IconButton>
   </ListItem>
   })} 
            
       </List>
    </div>
 
          </Grid>
          
          <ValidatorForm
                ref="form"
                onSubmit={this._handleSubmit}
                onError={errors => console.log(errors)}
            > 
            <Grid container spacing={1} alignItems="flex-end">
         
          <Grid item>
          <TextValidator
                    style={{marginLeft: 20, marginBottom: 30}}
                    label="First Name"
                    onChange={e=>this._handleChange("firstName",e)}
                    name="firstName"
                    value={this.state.supervisorFirstName}
                    validators={['required','nameValidator']}
                    errorMessages={['This field is required', 'Please enter a valid name']}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                />
          </Grid>
        </Grid>
                <br/> 
                <Grid container spacing={1} alignItems="flex-end">
          
          <Grid item>
          <TextValidator
            style={{marginLeft: 20, marginBottom: 30}}
                    label="Last Name"
                    onChange={e=>this._handleChange("lastName",e)}
                    name="lastName"
                    value={this.state.supervisorLastName}
                    validators={['required', 'nameValidator']}
                    errorMessages={['This field is required', 'Please enter a valid name']}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                />
          </Grid>
        </Grid>
                <br/> 
                <Grid container spacing={1} alignItems="flex-end">
         
          <Grid item>
          <TextValidator
            style={{marginLeft: 20, marginBottom: 30}}
                    label="Email"
                    onChange={e=>this._handleChange("email",e)}
                    name="email"
                    value={this.state.supervisorEmail}
                    validators={['required', 'isEmail']}
                    errorMessages={['This field is required','Please enter a valid email']}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                />
          </Grid>
        </Grid>
                <br/> 
                <Grid container spacing={1} alignItems="flex-end">
         
          <Grid item>
         
          <TextValidator
            style={{marginLeft: 20, marginBottom: 30}}
                    label="Contact Number"
                    onChange={e=>this._handleChange("contactNumber",e)}
                    name="contactNumber"
                    value={this.state.supervisorContactNumber}
                    validators={['required','numberValidator', 'checkNumberLength']}
                    errorMessages={['This field is required', 'Please enter a valid phone number', 'Please enter a phone number of the correct length']}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon />
                        </InputAdornment>
                      ),
                    }}
                />
          </Grid>
        </Grid>
                <br/> 
                <Grid container spacing={1} alignItems="flex-end">
         
          <Grid item>
          <TextValidator
            style={{marginLeft: 20 ,marginBottom: 30}}
      label="Office Location"
      onChange={e=>this._handleChange("officeLocation",e)}
      name="officeLocation"
      value={this.state.supervisorOfficeLocation}
      validators={['required']}
      errorMessages={['This field is required']}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <BuildingIcon />
          </InputAdornment>
        ),
      }}
  />

          </Grid>
        </Grid>
                <br/> 
                <Grid container spacing={1} alignItems="flex-end">
          
          <Grid item>
          <TextValidator
            style={{marginLeft: 20, marginBottom: 30}}
      label="Subject"
      onChange={e=>this._handleChange("subject",e)}
      name="subject"
      value={this.state.supervisorSubject}
      validators={['required']}
      errorMessages={['This field is required']}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SubjectIcon />
          </InputAdornment>
        ),
      }}
  />
          </Grid>
        </Grid>
               


  <br/>
  <br/>
  <Grid item xs={12} style={{ paddingBottom: 30 }}>
 <Button
              variant="contained"
              color="primary"
              
              type="submit"
            >
              Submit
            </Button>
</Grid> 

            </ValidatorForm>
            </Grid>
            </div>
    )

           
  }
}

export default withStyles(styles)(AddSupervisorForm);
