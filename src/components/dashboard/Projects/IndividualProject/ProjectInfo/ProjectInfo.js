import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import store from "../../../../../store";
import PropTypes from "prop-types";

import ChangeStatus from "./ChangeStatus";
import AssignToSupervisor from "./AssignToSupervisor";
import Description from "./Description";
import ViewProposal from "./ViewProposal";
import ViewClient from "./ViewClient";
import Organization from "./Organization";
import Subject from "./Subject";

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
        const {classes} = this.props;
        const {project, proposal, subjects, supervisors} = this.props;

        return (
            <div>
                <Typography variant="h5" className={classes.infoTitle}>
                    PROJECT OUTLINE
                </Typography>
                <Grid container direction='column' spacing={1}>
                    <Grid item className={classes.basic}>
                        {project.status ?
                            <ChangeStatus project={project}/>
                            : <div/>
                        }
                    </Grid>

                    <Grid item className={classes.basic}>
                        {proposal.outlineOfProject ?
                            <Description
                                description={proposal.outlineOfProject}/>
                            : <div/>
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
                            <ViewClient 
                                client={project.proposal.client} 
                                objType={"project"} 
                                objID={project._id}
                            />
                            : <div/>
                        }
                    </Grid>

                    <Grid item className={classes.basic}>
                        {proposal.client ?
                            <Organization
                                orgName={proposal.client.organisation.name}/>
                            : <div/>
                        }
                    </Grid>

                    <Grid item className={classes.basic}>
                        <Subject
                            proposal={proposal}
                            subjects={subjects}
                        />
                    </Grid>

                    <Grid item className={classes.basic}>
                        <AssignToSupervisor
                            project={project}
                            supervisors={supervisors}
                        />
                    </Grid>

                </Grid>
            </div>
        );
    }
}

ProjectInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectInfo);
