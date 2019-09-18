import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
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
    },
    infoTitle: {
        textAlign: "center",
        paddingLeft: "3%",
        paddingBottom: "3%",
        fontWeight: "bold",
        color: "#094183"
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

    render() {
        const {classes, project, description} = this.props;
        const {proposal} = this.state;

        return (
            <div>
                <Typography variant="h5" className={classes.infoTitle}>
                    PROJECT OUTLINE
                </Typography>
                <Grid container direction='column'>
                    <Grid item className={classes.basic}>
                        {project.status ? 
                            <ChangeStatus status={project.status}/>
                        : <div/>
                        }
                    </Grid>

                    <Grid item className={classes.basic}>
                        {description ? 
                            <Description description={description}/>
                        : <div />
                        }
                    </Grid>

                    <Grid item className={classes.basic}>
                        {project.proposalId ? 
                            <ViewProposal proposalID={project.proposalId}/>
                        : <div/>
                        }
                    </Grid>

                    <Grid item className={classes.basic}>
                        {proposal.client ? 
                            <ViewClient client={proposal.client}/>
                            : <div />
                        }
                    </Grid>

                    <Grid item className={classes.basic}>
                        {proposal.client ? 
                            <Organization orgName={proposal.client.organisation.name}/>
                            : <div />
                        }
                    </Grid>

                    <Grid item className={classes.basic}>
                        {/* <AssignToSupervisor
                            supervisorID={project.supervisorId}
                            supervisors={supervisors}
                            currentSupervisor={currentSupervisor}
                        /> */}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(ProjectInfo);
