import React from 'react';  
import DenseAppBar from "./TopAppBar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AddCoordinatorForm from "./AddCoordinatorForm"; 
import AddSubjectForm from "./AddSubjectForm" 
import AddSupervisorFrom from "./AddSupervisorForm"

const styles = theme => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(20),
      textAlign: "center",
      color: theme.palette.text.secondary
    }
  });

class AdminPage extends React.Component {
    render() {
        return (
          <div>
            <DenseAppBar />
            <br />
            <Grid container spacing={3}>
              <Grid item xs={4} style={{ paddingLeft: 20 }}>
                <h1>Add Supervisor</h1>
                <br/>
                <h5>Supervisors in System</h5>
                <AddSupervisorFrom />
              </Grid>
              <Grid item xs={4} style={{paddingLeft: 30}}>
                <h1>Add Subject</h1>
                <br/>
                <h5>Subjects in System</h5>
                <AddSubjectForm />
              </Grid>
              <Grid item xs={4} style={{paddingLeft: 30}}>
                <h1>Add Coordinator</h1>
                <br/>
                <h5>Coordinators in System</h5>
                <AddCoordinatorForm />
              </Grid>
            </Grid>
          </div>
        );
      }
}

export default AdminPage; 