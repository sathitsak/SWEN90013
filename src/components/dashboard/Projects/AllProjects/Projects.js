import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

import ProjectCard from "./ProjectCard";

const styles = {
    paper: {
        padding: 10,
        margin: 40,
        backgroundColor: "#8BBAEE"
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
            projects: [],
        };
    }

    componentDidMount() {
        axios
            .get(`https://5ce928eda8c1ee0014c7045b.mockapi.io/projects`)
            .then(results => {
                this.setState({projects: results.data});
            });
    }

    render() {
        // const {classes} = this.props;

        return (
            <Grid container justify="flex-end" direction="row"
                  alignContent="center">
                <Grid item sm>
                    {/*<Paper className={classes.paper}>*/}
                    <Paper>
                        <Typography
                            variant="h5"
                            style={{textAlign: "center", color: "#FFFFFF"}}
                        >
                            New
                        </Typography>
                        {this._filterProjectsByStatus(status.new).map((project, index) => (
                            <ProjectCard id={project.id} key={index}
                                         project={project}/>
                        ))}
                    </Paper>
                </Grid>
                <Grid item sm>
                    {/*<Paper className={classes.paper}>*/}
                    <Paper>
                        <Typography
                            variant="h5"
                            style={{textAlign: "center", color: "#FFFFFF"}}
                        >
                            In Progress
                        </Typography>
                        {this._filterProjectsByStatus(status.inProgress).map(
                            (project, index) => (
                                <ProjectCard key={index} id={project.id}
                                             project={project}/>
                            )
                        )}
                    </Paper>
                </Grid>
                <Grid item sm>
                    {/*<Paper className={classes.paper}>*/}
                    <Paper>
                        <Typography
                            variant="h5"
                            style={{textAlign: "center", color: "#FFFFFF"}}
                        >
                            Completed
                        </Typography>
                        {this._filterProjectsByStatus(status.completed).map(
                            (project, index) => (
                                <ProjectCard id={project.id} key={index}
                                             project={project}/>
                            )
                        )}
                    </Paper>
                </Grid>
            </Grid>
        );
    }

    _filterProjectsByStatus = status => {
        const projects = this._filterProjectsForUser();
        let targetProjects = [];

        projects.forEach(project => {
            if (project.status === status) {
                targetProjects.push(project);
            }
        });
        return targetProjects;
    };

    _filterProjectsForUser = () => {
        const {projects} = this.state;
        let targetProjects = [];

        projects.forEach(project => {
            if (
                project.supervisorID === myIDs.supervisorID ||
                project.coordinatorID === myIDs.coordinatorID
            ) {
                targetProjects.push(project);
            }
        });
        return targetProjects;
    };
}

// ViewProjects.propTypes = {
//     classes: PropTypes.object.isRequired
// };

// export default withStyles(styles)(ViewProjects);

export default ViewProjects;