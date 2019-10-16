import React from 'react'
import axios from 'axios'
import {baseURL} from '../../api/index'
import Grid from "@material-ui/core/Grid";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from "@material-ui/core/TextField";

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from "@material-ui/core/Button"
import {addTemplate} from "../admin/AdminFunctions"

const classes = ({
    root: {
      width: '100%',
    },
  });

class AddEmailTemplateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id:"",
            title:"",
            templateMessage:"",
            allTemplates: []
        }
        this._handleChange = this._handleChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }
    
    componentDidMount() {
        axios.get(baseURL+'/template')
        .then(response => {
            this.setState({
                allTemplates: response.data
            })
        })
    }

    componentDidUpdate() {
        axios.get(baseURL+'/template')
        .then(response => {
            this.setState({
                allTemplates: response.data
            })
        })
    }

    _handleChange = (field, event) => {
        if (field == "id") {
          this.setState({ id: event.target.value });
        } else if (field == "title") {
          this.setState({ title: event.target.value });
        } else if (field == "templateMessage") {
          this.setState({ templateMessage: event.target.value });
        } 
      };

      _handleSubmit(event) {
         addTemplate(this.state.id, this.state.title, this.state.templateMessage);
         this.setState({ id:"", title:"", templateMessage:""}); 
      }

    render() {
        const{allTemplates} = this.state; 
        return (
            <div > 
                 <Grid container spacing={3}> 
                 <Grid item xs={12} style={{paddingBottom:30}}>

                     
                     {allTemplates.map((temp) => {
                         return (
                         <ExpansionPanel>
                         <ExpansionPanelSummary
                           expandIcon={<ExpandMoreIcon />}
                           aria-controls="panel1a-content"
                           id="panel1a-header"
                         >
                           <Typography className={classes.heading}>{temp.title}</Typography>
                         </ExpansionPanelSummary>
                         <ExpansionPanelDetails>
                           <Typography>
                             {temp.message}
                           </Typography>
                         </ExpansionPanelDetails>
                       </ExpansionPanel>
                         )
                     })}
                     </Grid> 
                     <br/>
                     <Grid item xs={12} style={{paddingBottom:30}}>
                     <TextField
        id="standard-name"
        label="Template ID"
        name="id"
        className={classes.textField}
        value={this.state.id}
        onChange={e=>this._handleChange('id', e)}
        margin="normal"
      />

                     </Grid> 
                     <Grid item xs={12} style={{paddingBottom:30}}>
                     <TextField
        id="standard-name"
        label="Title"
        name="title"
        className={classes.textField}
        value={this.state.title}
        onChange={e=>this._handleChange('title', e)}
        margin="normal"
      />

                     </Grid> 

                     <Grid item xs={12} style={{paddingBottom:30}}>

                     <TextField
        id="standard-multiline-static"
        name="templateMessage"
        label="Template"
        multiline
        rows="10"
        onChange={e=>this._handleChange('templateMessage', e)}
        value={this.state.templateMessage}
        className={classes.textField}
        margin="normal"
      />
</Grid> 
                     <Grid item xs={12} style={{paddingBottom:30}}>
                     <Button onClick={this._handleSubmit}
              variant="contained"
              color="primary"
              
              type="submit"
            >
              Submit
            </Button>
                     </Grid>
                     </Grid> 
            </div>
          );
    }
}

export default AddEmailTemplateForm; 