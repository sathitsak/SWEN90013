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
import grey from "@material-ui/core/colors/grey";

import TeamPage from "./StudentTeam/TeamPage";

const styles = theme => ({
  notes: {
    width: "100%",
    height: 140
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    backgroundColor: grey[50]
  },
});

class ProjectById extends React.Component {
    async _reqTodoList(projID) {
        const project = await getProjectById(projID);
        const getProAction = getGetProjectByIdAction(project);
        console.log(getProAction);
        store.dispatch(getProAction);
    }

    componentDidMount() {
        const projID = this.props.match.params.id;
        this._reqTodoList(projID);
    }

    render() {
        const {classes} = this.props
        
    return (
      <Grid
        container
        spacing={16}
        justify="flex-end"
        direction="row"
      >
        <Grid item xs={6}>
          <Paper className={classes.paper} style={{ height: "100%" }}>
            <ProjectInfo />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper} style={{ position: "relative" }}>
            <TeamPage />
          </Paper>
        </Grid>
        <Grid item xs={12} className={classes.notes}>
          <Paper className={classes.paper} style={{ marginBottom: "20px" }}>
            <ProjectNotes />
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
