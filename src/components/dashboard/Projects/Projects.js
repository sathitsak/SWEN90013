import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import lightBlue from "@material-ui/core/colors/lightBlue";

import ProjectCard from "./ProjectCard";

const styles = {
  paper: {
    padding: 10,
    margin: 40,
    backgroundColor: lightBlue[200]
  }
};

const myIDs = {
  supervisorID: "supervisor 1 me",
  coordinatorID: "coordinator 1 me"
};

const status = {
  new: "new",
  inProgress: "in progress",
  completed: "completed"
};

class ViewProjects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [
        {
          id: "project 1",
          projectName: "project 1",
          status: "new",
          internal: 0,
          subjectID: "subject 1",
          industry: "industry 1",
          supervisorID: "supervisor 1 me",
          coordinatorID: "coordinator 1 me",
          proposalID: "proposal 1",
          client: "Stephanie Armther"
        },
        {
          id: "project 2",
          projectName: "project 2",
          status: "new",
          internal: 0,
          subjectID: "subject 1",
          industry: "industry 2",
          supervisorID: "supervisor 1 me",
          coordinatorID: "coordinator 1 me",
          proposalID: "proposal 2",
          client: "Stephanie Armther"
        },
        {
          id: "project 3",
          projectName: "project 3",
          status: "new",
          internal: 0,
          subjectID: "subject 1",
          industry: "industry 3",
          supervisorID: "supervisor 1 me",
          coordinatorID: "coordinator 1 me",
          proposalID: "proposal 3",
          client: "Stephanie Armther"
        },
        {
          id: "project 4",
          projectName: "project 4",
          status: "in progress",
          internal: 0,
          subjectID: "subject 1",
          industry: "industry 4",
          supervisorID: "supervisor 1 me",
          coordinatorID: "coordinator 1 me",
          proposalID: "proposal 4",
          client: "Stephanie Armther"
        },
        {
          id: "project 5",
          projectName: "project 5",
          status: "in progress",
          internal: 0,
          subjectID: "subject 1",
          industry: "industry 5",
          supervisorID: "supervisor 1 me",
          coordinatorID: "coordinator 1 me",
          proposalID: "proposal 5",
          client: "Stephanie Armther"
        },
        {
          id: "project 6",
          projectName: "project 6",
          status: "completed",
          internal: 0,
          subjectID: "subject 1",
          industry: "industry 6",
          supervisorID: "supervisor 1 me",
          coordinatorID: "coordinator 1 me",
          proposalID: "proposal 6",
          client: "Stephanie Armther"
        },
        {
          id: "project 7",
          projectName: "project 7",
          status: "completed",
          internal: 0,
          subjectID: "subject 1",
          industry: "industry 7",
          supervisorID: "supervisor 1 me",
          coordinatorID: "coordinator 1 me",
          proposalID: "proposal 7",
          client: "Stephanie Armther"
        }
      ]
    };
  }

  componentWillMount() {
    this._filterProjectsForUser();
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container justify="flex-end" direction="row" alignContent="center">
        <Grid item sm>
          <Paper className={classes.paper}>
            <Typography variant="h5" style={{ textAlign: "center" }}>
              New
            </Typography>
            {this._filterProjectsByStatus(status.new).map((project, index) => (
              <ProjectCard id={project.id} key={index} project={project} />
            ))}
          </Paper>
        </Grid>
        <Grid item sm>
          <Paper className={classes.paper}>
            <Typography variant="h5" style={{ textAlign: "center" }}>
              In Progress
            </Typography>
            {this._filterProjectsByStatus(status.inProgress).map(
              (project, index) => (
                <ProjectCard key={index} id={project.id} project={project} />
              )
            )}
          </Paper>
        </Grid>
        <Grid item sm>
          <Paper className={classes.paper}>
            <Typography variant="h5" style={{ textAlign: "center" }}>
              Completed
            </Typography>
            {this._filterProjectsByStatus(status.completed).map(
              (project, index) => (
                <ProjectCard id={project.id} key={index} project={project} />
              )
            )}
          </Paper>
        </Grid>
      </Grid>
    );
  }

  _filterProjectsForUser = () => {
    const { projects } = this.state;
    let targetProjects = [];

    projects.forEach(project => {
      if (
        project.supervisorID === myIDs.supervisorID ||
        project.coordinatorID === myIDs.coordinatorID
      ) {
        targetProjects.push(project);
      }
    });
    this.setState({
      projects: targetProjects
    });
  };

  _filterProjectsByStatus = status => {
    const { projects } = this.state;
    let targetProjects = [];

    projects.forEach(project => {
      if (project.status === status) {
        targetProjects.push(project);
      }
    });
    return targetProjects;
  };
}

ViewProjects.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewProjects);
