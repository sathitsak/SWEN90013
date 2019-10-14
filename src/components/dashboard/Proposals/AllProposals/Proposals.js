import React from "react";
import ProposalCard from "./ProposalCard";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import grey from "@material-ui/core/colors/grey";
import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button/Button";
import {Link} from "react-router-dom";
import store from "../../../../store";
import {getAllSubjects, getProposalList} from "../../../../api";
import {
    getAllProposalsAction,
    getAllSubjectsAction
} from "../../../../store/actionCreators";

const styles = theme => ({
    paper: {
        padding: 10,
        margin: 10,
        backgroundColor: grey[50],
        [theme.breakpoints.up("xl")]: {
            width: 600
        },
    },
    link: {
        textDecoration: "none",
        textColor: "white"
    },
    swimTitle: {
        textAlign: "center",
        paddingLeft: "3%",
        paddingBottom: "3%",
        fontWeight: "bold",
        color: "#094183"
    },
    allProposalsButton: {
        position: "absolute",
        color: "#ffffff",
        backgroundColor: "#094183",
        '&:hover': {
            backgroundColor: "#4074B2",
            color: "#ffffff",
        },
        [theme.breakpoints.up("xl")]: {
            marginRight: 198
        },
        [theme.breakpoints.down("xl")]: {
            right: 0
        },
        bottom: 0
    }
});

const status = {
    new: "new",
    approved: "approved"
};

class Proposals extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState();

        this._handleStoreChange = this._handleStoreChange.bind(this);
        store.subscribe(this._handleStoreChange);
    }

    _handleStoreChange() {
        this.setState(store.getState());
    }

    async _reqTodoList() {
        const proposals = await getProposalList();
        const getAllProposalsAct = getAllProposalsAction(proposals);
        store.dispatch(getAllProposalsAct);

        const subjects = await getAllSubjects();
        const getAllSubjectsAct = getAllSubjectsAction(subjects);
        store.dispatch(getAllSubjectsAct);
    }

    componentDidMount() {
        this._reqTodoList();
      
    }

    componentWillUnmount() {
        const unsubscribe = store.subscribe(this._handleStoreChange);
        unsubscribe();
    }

    _filterProposalsByStatus = status => {
        //TODO: filter by user
        const {proposals} = this.state;
        let targetProposals = [];

        proposals.forEach(p => {
            // First check if valid before sending through
            if ('client' in p) {
                if ('organisation' in p.client) {
                    if (p.status === status) {
                        targetProposals.push(p);
                    }
                }
            }

        });
        return targetProposals;
    };

    render() {
        const {classes} = this.props;
        const {subjects} = this.state;

        return (
            <div style={{position: "relative"}}>
                <Grid
                    container
                    spacing={10}
                    alignContent="center"
                    justify="flex-end"
                    direction="row"
                >
                    <Grid item sm>
                        <Paper className={classes.paper}>
                            <Typography variant="h5"
                                        className={classes.swimTitle}>
                                New
                            </Typography>
                            <div>
                                <List dense={true}>
                                    {this._filterProposalsByStatus(status.new).map(p => (
                                        <ProposalCard
                                            key={p._id}
                                            id={p._id}
                                            proposal={p}
                                            subjects={subjects}
                                        />
                                    ))}
                                </List>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item sm>
                        <Paper className={classes.paper}>
                            <Typography variant="h5"
                                        className={classes.swimTitle}>
                                Approved
                            </Typography>
                            <div>
                                <List dense={true}>
                                    {this._filterProposalsByStatus(status.approved).map(p => (
                                        <ProposalCard
                                            key={p._id}
                                            id={p._id}
                                            proposal={p}
                                            subjects={subjects}
                                        />
                                    ))}
                                </List>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
                <Link to={`/dashboard/allProposals`}
                      className={classes.link}>
                    <Button
                        variant="contained"
                        size="medium"
                        className={classes.allProposalsButton}
                    >
                        View All Proposals
                    </Button>
                </Link>
            </div>
        );
    }
}

export default withStyles(styles)(Proposals);
