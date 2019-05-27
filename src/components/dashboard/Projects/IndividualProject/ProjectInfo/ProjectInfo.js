import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";

import ChangeStatus from './ChangeStatus';
import AssignToSupervisor from './AssignToSupervisor';
import Description from './Description';
import ViewProposal from './ViewProposal';
import ViewClient from './ViewClient';
import Organization from './Organization';

const styles = {
    basic: {
        marginTop: 10,
        paddingLeft: 10,
    }
};

class ProjectInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            project: {}
        }
    }

    componentDidMount() {
        const {project} = this.props;
        this.setState({project: project});
    }

    render() {
        const {classes} = this.props;
        const {project} = this.state;

        return (
            <div>
                <Typography variant="h5" align='center'>
                    PROJECT OUTLINE
                </Typography>
                <Grid container direction='column'>
                    <Grid item className={classes.basic}>
                        <ChangeStatus status={project.status}/>
                    </Grid>

                    <Grid item className={classes.basic}>
                        <Description description={project.description}/>
                    </Grid>

                    <Grid item className={classes.basic}>
                        <ViewProposal proposalID={project.proposalID}/>
                    </Grid>

                    <Grid item className={classes.basic}>
                        <ViewClient client={project.client}/>
                    </Grid>

                    <Grid item className={classes.basic}>
                        <Organization industry={project.industry}/>
                    </Grid>

                    <Grid item className={classes.basic}>
                        <AssignToSupervisor
                            supervisorID={project.supervisorID}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

ProjectInfo.propTypes = {
    classes: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectInfo);
