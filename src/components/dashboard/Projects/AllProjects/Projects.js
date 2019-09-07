import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import grey from "@material-ui/core/colors/grey";
import List from "@material-ui/core/List";
import ProjectCard from "./ProjectCard";
import store from "../../../../store";
import {getProjectList, getSupervisors} from "../../../../api";
import {
    getGetAllProjectAction,
    getGetSupervisorsAction
} from "../../../../store/actionCreators";

const styles = {
    paper: {
        padding: 10,
        margin: 10,
        // backgroundColor: grey[50]
    },
    swimTitle: {
        textAlign: "center",
        paddingLeft: "3%",
        paddingBottom: "3%",
        fontWeight: "bold",
        color: "#094183"
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

        const supervisors = await getSupervisors();
        // console.log(result);
        const getSupsAction = getGetSupervisorsAction(supervisors);
        store.dispatch(getSupsAction);
    }

    componentDidMount() {
        this._reqTodoList();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.currentPage);
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

    render() {
        const {classes} = this.props;

        return (
            <Grid container justify="flex-end" direction="row"
                  alignContent="center">
                <Grid item sm>
                    <Paper className={classes.paper}>
                        <Typography variant="h5" className={classes.swimTitle}>
                            New
                        </Typography>
                        <div>
                            <List dense={true}>
                                {this._filterProjectsByStatus(status.new).map(
                                    (project, index) => (
                                        <ProjectCard
                                            id={project.id}
                                            key={index}
                                            project={project}
                                        />
                                    )
                                )}
                            </List>
                        </div>
                    </Paper>
                </Grid>
                <Grid item sm>
                    <Paper className={classes.paper}>
                        <Typography variant="h5" className={classes.swimTitle}>
                            In Progress
                        </Typography>
                        <div>
                            <List dense={true}>
                                {
                                    this._filterProjectsByStatus(status.inProgress).map(
                                        (project, index) => (
                                            <ProjectCard
                                                id={project.id}
                                                key={index}
                                                project={project}
                                            />
                                        )
                                    )
                                }
                            </List>
                        </div>
                    </Paper>
                </Grid>
                <Grid item sm>
                    <Paper className={classes.paper}>
                        <Typography variant="h5" className={classes.swimTitle}>
                            Completed
                        </Typography>
                        <div>
                            <List dense={true}>
                                {this._filterProjectsByStatus(status.completed).map(
                                    (project, index) => (
                                        <ProjectCard
                                            id={project.id}
                                            key={index}
                                            project={project}
                                        />
                                    )
                                )}
                            </List>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

ViewProjects.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewProjects);
