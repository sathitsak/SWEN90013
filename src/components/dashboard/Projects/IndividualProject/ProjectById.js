import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import ProjectInfo from './ProjectInfo/ProjectInfo';
import Notes from './Notes/Notes';
import {getProjectById} from "../../../../api";
import {getGetProjectByIdAction} from "../../../../store/actionCreators";
import store from "../../../../store";

const styles = {
    projectInfo: {
        backgroundColor: "white",
        width: "100%",
        height: 670,
        float: "left",
        padding: 10,
        margin: 20,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black",
        // borderRadius: "3%"
    },
    notes: {
        backgroundColor: "white",
        width: "100%",
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
    async _reqTodoList(projID) {
        const result = await getProjectById(projID);
        // console.log(result);
        const action = getGetProjectByIdAction(result);
        store.dispatch(action);
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
                    <ProjectInfo/>
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
