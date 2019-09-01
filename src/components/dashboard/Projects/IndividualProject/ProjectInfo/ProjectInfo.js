import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";

import ChangeStatus from "./ChangeStatus";
import AssignToSupervisor from "./AssignToSupervisor";
import Description from "./Description";
import ViewProposal from "./ViewProposal";
import ViewClient from "./ViewClient";
import Organization from "./Organization";
import store from "../../../../../store";

const styles = {
  basic: {
    marginTop: 10,
    paddingLeft: 10
  }
};

class ProjectInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this._handleStoreChange = this._handleStoreChange.bind(this);
    store.subscribe(this._handleStoreChange);
  }

  _handleStoreChange() {
    this.setState(store.getState());
  }

  // async _reqTodoList() {
  //     const result = await getSupervisors();
  //     // console.log(result);
  //     const action = getGetSupervisorsAction(result);
  //     store.dispatch(action);
  // }

  // componentWillMount() {
  //     // this._reqTodoList();
  //     const {supervisors, project} = this.state;
  //     const supervisorID = project.supervisorID;
  //     alert(supervisorID);
  //     // console.log(project);
  //
  //     let currentSupervisor = "";
  //     supervisors.forEach((supervisor) => {
  //         // alert(supervisor.id);
  //         // alert(supervisorID);
  //         if (supervisor.id === supervisorID) {
  //             currentSupervisor = supervisor.firstName + " " + supervisor.lastName;
  //             const action = getSetCurrentSupervisorAction(currentSupervisor);
  //             store.dispatch(action);
  //         }
  //     })
  // }

  render() {
    const { classes } = this.props;
    const { project, supervisors, currentSupervisor } = this.state;

    return (
      <div>
        <Typography variant="h5" align="center">
          PROJECT OUTLINE
        </Typography>
        <Grid container>
          <Grid item className={classes.basic}>
            <ChangeStatus status={project.status} />
          </Grid>

          <Grid item className={classes.basic}>
            <Description description={project.description} />
          </Grid>

          <Grid item className={classes.basic}>
            <ViewProposal proposalID={project.proposalID} />
          </Grid>

          <Grid item className={classes.basic}>
            <ViewClient client={project.client} />
          </Grid>

          <Grid item className={classes.basic}>
            <Organization industry={project.industry} />
          </Grid>

          <Grid item className={classes.basic}>
            <AssignToSupervisor
              supervisorID={project.supervisorID}
              supervisors={supervisors}
              currentSupervisor={currentSupervisor}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

ProjectInfo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectInfo);
