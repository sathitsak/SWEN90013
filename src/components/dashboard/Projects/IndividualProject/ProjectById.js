import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ProjectInfo from "./ProjectInfo/ProjectInfo";
import ProjectNotes from "./Notes/ProjectNotes";
import {getProjectById} from "../../../../api";
import {getGetProjectByIdAction} from "../../../../store/actionCreators";
import store from "../../../../store";
import {Paper} from "@material-ui/core";

const styles = {
    projectInfo: {
        marginBottom: 10,
        width: "100%",
        // height: 670
    },
    notes: {
        width: "100%",
        // height: 140
    },
    paper: {
        padding: 20,
        backgroundColor: "#f3f3f3"
    }
};

class ProjectById extends React.Component {
    async _reqTodoList(projID) {
        const project = await getProjectById(projID);
        // console.log(result);
        const getProAction = getGetProjectByIdAction(project);
        console.log(getProAction);
        store.dispatch(getProAction);
    }

    componentDidMount() {
        const projID = this.props.match.params.id;
        this._reqTodoList(projID);
    }

    render() {
        const {classes} = this.props;

        return (
            <Grid
                container
                direction="column"
                alignContent="center"
                justify="flex-end"
            >
                <Grid item className={classes.projectInfo}>
                    <Paper className={classes.paper}>
                        <ProjectInfo/>
                    </Paper>
                </Grid>
                <Grid item className={classes.notes}>
                    <Paper className={classes.paper}>
                        <ProjectNotes/>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

ProjectById.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectById);
