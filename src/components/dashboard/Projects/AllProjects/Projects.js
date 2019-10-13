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
import {getAllSubjects, getProjectList, getSupervisors} from "../../../../api";
import {
    getAllProjectAction,
    getSupervisorsAction,
    getAllSubjectsAction
} from "../../../../store/actionCreators";
import {projectStatus} from "../Constants/Constants";
import Button from "@material-ui/core/Button/Button";
import {Link} from "react-router-dom";

const styles = theme => ({
    paper: {
        padding: 10,
        margin: 10,
        backgroundColor: grey[50],
    },
    swimTitle: {
        textAlign: "center",
        paddingLeft: "3%",
        paddingBottom: "3%",
        fontWeight: "bold",
        color: "#094183"
    },
    link: {
        textDecoration: "none",
        textColor: "white"
    },
    allProjectsButton: {
        position: "absolute",
        color: "#ffffff",
        backgroundColor: "#094183",
        '&:hover': {
            backgroundColor: "#4074B2",
            color: "#ffffff",
        },
        [theme.breakpoints.up("xl")]: {
            marginRight: 198
        },
        [theme.breakpoints.down("xl")]: {
            right: 0
        },
        bottom: 0
    }
    
});

const myIDs = {
    supervisorID: "supervisor 1 me",
    coordinatorID: "coordinator 1 me"
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
        const projects = await getProjectList();
        const getAllProjectAct = getAllProjectAction(projects);
        store.dispatch(getAllProjectAct);

        const supervisors = await getSupervisors();
        const getSupervisorsAct = getSupervisorsAction(supervisors);
        store.dispatch(getSupervisorsAct);

        const subjects = await getAllSubjects();
        const getAllSubjectsAct = getAllSubjectsAction(subjects);
        store.dispatch(getAllSubjectsAct);
    }

    componentDidMount() {
        this._reqTodoList();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.currentPage);
    }

    _filterProjectsByStatus = status => {
        // TODO: Filter by user
        const {projects} = this.state;
        let targetProjects = [];

        projects.forEach(p => {
            // First check if valid before sending through
            // May not need this when back-end is fixed
            if ('proposal' in p) {
                if ('client' in p.proposal) {
                    if ('organisation' in p.proposal.client) {
                        if (p.status === status) {
                            targetProjects.push(p);
                        }
                    }
                }
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
        const {supervisors, subjects} = this.state;

        return (
            <div style={{position: "relative"}}>
                <Grid container justify="flex-end" direction="row"
                    alignContent="center">
                    <Grid item sm>
                        <Paper className={classes.paper}>
                            <Typography variant="h5" className={classes.swimTitle}>
                                New
                            </Typography>
                            <div>
                                <List dense={true}>
                                    {this._filterProjectsByStatus(projectStatus.new).map(
                                        (project, index) => (
                                            <ProjectCard
                                                _id={project._id}
                                                key={index}
                                                project={project}
                                                supervisors={supervisors}
                                                subjects={subjects}
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
                                        this._filterProjectsByStatus(projectStatus.inProgress).map(
                                            (project, index) => (
                                                <ProjectCard
                                                    _id={project._id}
                                                    key={index}
                                                    project={project}
                                                    supervisors={supervisors}
                                                    subjects={subjects}
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
                                    {this._filterProjectsByStatus(projectStatus.completed).map(
                                        (project, index) => (
                                            <ProjectCard
                                                _id={project._id}
                                                key={index}
                                                project={project}
                                                supervisors={supervisors}
                                                subjects={subjects}
                                            />
                                        )
                                    )}
                                </List>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>

                <Link to={`/dashboard/allProjects`}
                    className={classes.link}>
                    <Button
                        variant="contained"
                        size="medium"
                        className={classes.allProjectsButton}
                    >
                        View All Projects
                    </Button>
                </Link>
            </div>
        );
    }
}

ViewProjects.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewProjects);
