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

const status = {
  new: "new",
  inProgress: "in progress",
  completed: "completed"
};

class ViewProjectPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [
        {
          id: "project 1",
          status: "new"
        },
        {
          id: "project 2",
          status: "new"
        },
        {
          id: "project 3",
          status: "in progress"
        },
        {
          id: "project 4",
          status: "in progress"
        },
        {
          id: "project 5",
          status: "completed"
        },
        {
          id: "project 6",
          status: "completed"
        },
        {
          id: "project 7",
          status: "completed"
        }
      ]
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container justify="flex-end" direction="row" alignContent="center">
        <Grid item sm>
          <Paper className={classes.paper}>
            <Typography variant="h6">New</Typography>
            {this._filterProjects(status.new).map((project, index) => (
              <ProjectCard project={project} key={index} />
            ))}
          </Paper>
        </Grid>
        <Grid item sm>
          <Paper className={classes.paper}>
            <Typography variant="h6">In Progress</Typography>
            {this._filterProjects(status.inProgress).map((project, index) => (
              <ProjectCard project={project} key={index} />
            ))}
          </Paper>
        </Grid>
        <Grid item sm>
          <Paper className={classes.paper}>
            <Typography variant="h6">Completed</Typography>
            {this._filterProjects(status.completed).map((project, index) => (
              <ProjectCard project={project} key={index} />
            ))}
          </Paper>
        </Grid>
      </Grid>
    );
  }

  _filterProjects = status => {
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

ViewProjectPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewProjectPage);
