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
import axios from 'axios'
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"


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

import {addNewSubject} from "./AdminFunctions"
import { baseURL } from "../../api";

import {deleteSubjectMethod} from "./AdminFunctions"

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
      subjectSemester: "",
      allSubjects:[]
    };
    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  } 


  componentDidMount() { 
    ValidatorForm.addValidationRule("nameValidator", value => {
      var regex = new RegExp("[0-9]+"); 
      if(regex.test(value)) {
        return false;
      } else {
        return true; 
      }
    })

    ValidatorForm.addValidationRule("semesterValidator", value => {
      var regex = new RegExp("[0-9]+"); 
      
      if(value != null) {
        if(regex.test(value)) {
          if(value.length == 1 && (value == 1 || value == 2)) {
            return true; 
          } else {
            return false; 
          }
        } else {
          return false; 
        }
      } else {
        return true; 
      }
      
    })



    axios.get(baseURL+'/subject')
  .then(response => {
    this.setState({
      allSubjects: response.data.flat()
    })
  })
  .catch(function (error) {
    console.log(error);
  })};

  componentDidUpdate() {
    axios.get(baseURL+'/subject')
    .then(response => {
      this.setState({
        allSubjects: response.data.flat()
      })
    })
    .catch(function (error) {
      console.log(error);
    })};

  _handleSubmit(event) {
    addNewSubject(this.state.subjectName, this.state.subjectCode, this.state.subjectSemester); 
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

  _deleteSubject(id) { 
    deleteSubjectMethod(id); 
}

  render() {
    const{allSubjects} = this.state; 
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} style={{paddingBottom:30}}>
            <br/>
          <List style={{maxHeight:200, overflow: 'auto'}}> 
        {allSubjects.map((subject) => {
     return  <ListItem>
       
     <ListItemIcon>
       <SubjectIcon />
     </ListItemIcon>
     <ListItemText
       primary={subject.name + " (" + subject.code+")"}
      
       
     />
      <IconButton  aria-label="delete" onClick={() => this._deleteSubject(subject._id)} >
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
                    label="Subject Name"
                    onChange={e=>this._handleChange("name",e)}
                    name="subjectName"
                    value={this.state.subjectName}
                    validators={['required','nameValidator']}
                    errorMessages={['This field is required', 'Please enter a valid subject name']}
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
                <Grid container spacing={1} alignItems="flex-end">
          
          <Grid item>
          <TextValidator
            style={{marginLeft: 20, marginBottom: 30}}
                    label="Subject Code"
                    onChange={e=>this._handleChange("code",e)}
                    name="subjectCode"
                    value={this.state.subjectCode}
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
                <Grid container spacing={1} alignItems="flex-end">
         
          <Grid item>
          <TextValidator
            style={{marginLeft: 20, marginBottom: 30}}
                    label="Subject Semester"
                    onChange={e=>this._handleChange("semester",e)}
                    name="subjectSemester"
                    value={this.state.subjectSemester}
                    validators={['required', 'semesterValidator']}
                    errorMessages={['This field is required', 'Please enter either Semester 1 or 2']}
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

    
          <br />
          <Grid item xs={12} style={{ paddingBottom: 30, paddingTop: 30, marginLeft: '50%' }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
            
          </Grid></ValidatorForm>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(AddSubjectForm);
