import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";


import ProjectCard from "./ProjectCard";

import store from "../../../../store";
import {getProjectList} from "../../../../api";
import {getGetAllProjectAction} from "../../../../store/actionCreators";

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

        this.state = store.getState();

        this._handleStoreChange = this._handleStoreChange.bind(this);
        store.subscribe(this._handleStoreChange);
    }

    _handleStoreChange() {
        this.setState(store.getState());
    }

    async _reqTodoList() {
        const result = await getProjectList();
        // console.log(result);
        const action = getGetAllProjectAction(result);
        store.dispatch(action);
    }

    componentDidMount() {
        this._reqTodoList();
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