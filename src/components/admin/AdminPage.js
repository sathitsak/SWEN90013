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
                <h1>Add supervisor</h1>
                <AddSupervisorFrom />
              </Grid>
              <Grid item xs={4}>
                <h1>Add subject</h1>
                <AddSubjectForm />
              </Grid>
              <Grid item xs={4}>
                <h1>Add coordinator</h1>
                <AddCoordinatorForm />
              </Grid>
            </Grid>
          </div>
        );
      }
}

export default AdminPage; 