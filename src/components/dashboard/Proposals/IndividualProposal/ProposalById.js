import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import ProposalInfo from "./ProposalInfo";
import ProposalResponses from "./ProposalResponses";
import Notes from "../../Notes/Notes";
import {getProposalById, getAllSubjects} from "../../../../api";
import {
    getProposalByIdAction,
} from "../../../../store/actionCreators";
import store from "../../../../store";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        height: "400px"
    }
});

class ProposalById extends React.Component {
    constructor(props) {
        super(props);

        this.state = store.getState();
        this._handleStoreChange = this._handleStoreChange.bind(this);
        store.subscribe(this._handleStoreChange);
    }

    _handleStoreChange() {
        this.setState(store.getState());
    }

    async _reqTodoList(propID) {
        const proposalResult = await getProposalById(propID);
        const proposalAction = getProposalByIdAction(proposalResult);
        store.dispatch(proposalAction);
    }

    componentDidMount() {
        //PASSING THE ID
        const propID = this.props.match.params.id;
        this._reqTodoList(propID);
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root} style={{flex:1}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={8}>
                        {
                            <ProposalResponses
                                proposal={this.state.proposal}
                                subjects={this.state.subjects}
                            />
                        }
                    </Grid>

                    {this.state.proposal.client ? (
                        <Grid item xs={12} sm={4}>
                            <Paper className={classes.paper}
                                   style={{marginTop: "20px", height: "fit-content"}}>
                                <ProposalInfo
                                    proposal={this.state.proposal}
                                    subjects={this.state.subjects}
                                />
                            </Paper>
                        </Grid>
                    ) : (
                        <div/>
                    )}

                    {this.state.proposal.notes ? (
                        <Grid item xs={12} className={classes.notes}>
                            <Paper
                                className={classes.paper}
                                style={{
                                    padding: "2% 3% 3% 3%",
                                    marginBottom: "20px",
                                    height: "auto"
                                }}
                            >
                                <Notes
                                    notes={this.state.proposal.notes}
                                    object={this.state.proposal}
                                    objectType={"proposal"}
                                />
                            </Paper>
                        </Grid>
                    ) : (
                        <div/>
                    )}
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(ProposalById);
