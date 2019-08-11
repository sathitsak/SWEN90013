import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

import ProjectInfo from './ProjectInfo/ProjectInfo';
import StudentTeam from './StudentTeam/StudentTeam';
import Notes from './Notes/Notes';
import {getProjectById} from "../../../../api";
import {getGetProjectByIdAction} from "../../../../store/actionCreators";
import store from "../../../../store";

const styles = {
    projectInfo: {
        backgroundColor: "white",
        width: "47%",
        height: 670,
        float: "left",
        padding: 10,
        margin: 20,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black",
        // borderRadius: "3%"
    },
    studentsInfo: {
        backgroundColor: "white",
        width: "47%",
        height: 670,
        float: "right",
        padding: 10,
        margin: 20,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black",
        // borderRadius: "3%"
    },
    notes: {
        backgroundColor: "white",
        width: "96%",
        height: 140,
        padding: 10,
        margin: 20,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black"
        // borderRadius: '10%',
    }
};

class ProjectById extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState();

        this._handleStoreChange = this._handleStoreChange.bind(this);
        store.subscribe(this._handleStoreChange);
    }

    _handleStoreChange() {
        this.setState(store.getState());
    }

    async _reqTodoList(projID) {
        const result = await getProjectById(projID);
        console.log(result);
        const action = getGetProjectByIdAction(result);
        store.dispatch(action);
    }

    componentDidMount() {
        const projID = this.props.match.params.id;
        this._reqTodoList(projID);
    }

    // componentDidMount() {
    //     const projID = this.props.match.params.id;
    //     console.log(projID);
    //     axios
    //         .get(`https://5ce928eda8c1ee0014c7045b.mockapi.io/projects/` + projID)
    //         .then(results => {
    //             this.setState({project: results.data});
    //         });
    //     console.log(this.state.project);
    // }

    render() {
        const {classes} = this.props;
        const {project} = this.state;

        return (
            <Grid
                container
                direction="column"
                alignContent="center"
                justify="flex-end"
            >
                <Grid container direction="row">
                    <Grid item className={classes.projectInfo}>
                        <ProjectInfo project={project}/>
                    </Grid>
                    <Grid item className={classes.studentsInfo}>
                        <StudentTeam/>
                    </Grid>
                </Grid>
                <Grid item className={classes.notes}>
                    <Notes/>
                </Grid>
            </Grid>
        );
    }
}

ProjectById.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectById);
