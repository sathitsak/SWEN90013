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
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

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

    //return false is what you check is true 
    ValidatorForm.addValidationRule("nameValidator", value => {
      var regex = new RegExp("[0-9]+"); 
      if(regex.test(value)) {
        return false;
      } else {
        return true; 
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
      if(value.length != 10) {
        return false;
      } else {
        return true; 
      }
    })

    axios.get(baseURL+'/coordinator')
  .then(response => {
    this.setState({
      allCoordinators: response.data
    })
  })}

  componentDidUpdate() {
    axios.get(baseURL+'/coordinator')
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
         
       
        <br/>
        <List style={{maxHeight:200, overflow: 'auto'}}> 
        {allCoordinators.map((coordinator) => {
     return  <ListItem>
       
     <ListItemIcon>
       <AccountCircle />
     </ListItemIcon>
     <ListItemText
       primary={coordinator.firstName + " " + coordinator.lastName + " (" +coordinator.subjectId+")"}
      
       
     />
      <IconButton edge="end" aria-label="delete" >
         <DeleteIcon />
       </IconButton>
   </ListItem>
   })} 
            
       </List>
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
                    value={this.state.coordinatorFirstName}
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
                    value={this.state.coordinatorLastName}
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
                    value={this.state.coordinatorEmail}
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
                    value={this.state.coordinatorContactNumber}
                    validators={['required','numberValidator', 'checkNumberLength']}
                    errorMessages={['This field is required','Please enter a valid phone number', 'Please enter a phone number of the correct length']}
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
      value={this.state.coordinatorOfficeLocation}
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
      value={this.state.coordinatorSubject}
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

export default withStyles(styles)(AddCoordinatorForm);
