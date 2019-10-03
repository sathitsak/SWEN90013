import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ProjectInfo from "./ProjectInfo/ProjectInfo";
import Notes from "../../Notes/Notes";
import {getProjectById, getProposalById} from "../../../../api";
import {
    getProjectByIdAction,
    getProposalByIdAction
} from "../../../../store/actionCreators";
import store from "../../../../store";
import {Paper} from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";

import TeamPage from "./StudentTeam/TeamPage";
import PropTypes from "prop-types";

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
        const getProAction = getProjectByIdAction(project);
        store.dispatch(getProAction);

        const proposal = await getProposalById(this.state.project.proposalId);
        const proposalAction = getProposalByIdAction(proposal);
        store.dispatch(proposalAction);
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
                spacing={16}
                justify="flex-end"
                direction="row"
            >
                <Grid item xs={6}>
                    <Paper className={classes.paper} style={{height: "100%"}}>
                        <ProjectInfo/>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}
                           style={{position: "relative"}}>
                        <TeamPage
                            products={this.state.project.products}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} className={classes.notes}>
                    <Paper className={classes.paper}
                           style={{marginBottom: "20px"}}>
                        <Notes
                            notes={this.state.project.notes}
                            object={this.state.project}
                            objectType={"project"}
                        />
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

ProjectById.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectById);
