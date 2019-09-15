import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ProjectInfo from "./ProjectInfo/ProjectInfo";
import Notes from "../../Notes/Notes";
import {getProjectById, getProposalById} from "../../../../api";
import {
    getGetProjectByIdAction,
    getGetProposalByIdAction
} from "../../../../store/actionCreators";
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
        const project = await getProjectById(projID);
        const getProAction = getGetProjectByIdAction(project);
        store.dispatch(getProAction);

        const proposalResult = await getProposalById(this.state.project.proposalId);
        const proposalAction = getGetProposalByIdAction(proposalResult);
        store.dispatch(proposalAction);
    }

    componentDidMount() {
        const projID = this.props.match.params.id;
        this._reqTodoList(projID);
    }

    // _handleChange = () => {
    //     this.setState({project: store.getState().project});
    //     console.log(this.state.project.proposal);
    // };

    // unsubscribe = store.subscribe(this._handleChange);

    render() {
        const {classes} = this.props;

        return (
            <Grid
                container
                spacing={16}
                justify="flex-end"
                direction="row"
            >
                <Grid item xs={6}>
                    <Paper className={classes.paper} style={{height: "100%"}}>
                        <ProjectInfo
                            project={this.state.project}
                            proposal={this.state.proposal}
                            description={this.state.proposal.outlineOfProject}/>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper} style={{ position: "relative" }}>
                        <TeamPage />
                    </Paper>
                    </Grid>
                    <Grid item xs={12} className={classes.notes}>
                    <Paper className={classes.paper} style={{ marginBottom: "20px" }}>
                        <Notes
                            notes={this.state.project.notes}
                        />
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

// ProjectById.propTypes = {
//     classes: PropTypes.object.isRequired
// };

export default withStyles(styles)(ProjectById);
