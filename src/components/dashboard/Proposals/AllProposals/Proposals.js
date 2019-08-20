import React, {useContext} from "react";
import axios from "axios";
import ProposalCard from "./ProposalCard";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import {ProposalContext} from "../../state/Proposal";
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button/Button";
import {Link} from "react-router-dom";
import store from "../../../../store";
import {getProposalList} from "../../../../api";
import {getGetAllProposalsAction} from "../../../../store/actionCreators";

// {title: 'test'}
// new proposals works, just going to new proposal array
//Proposal card structure
// key={p.id}
// id={p.id}
// title={p.name}
// organisation={p.organisation}
// client={p.client}
// supervisor={p.supervisor}
// initial={this._getFirstCharacter(p.name)}

const styles = theme => ({
    paper: {
        padding: 10,
        margin: 40,
        backgroundColor: "#8BBAEE",
        width: 390
    },
    link: {
        textDecoration: "none",
        textColor: "white"
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
        const result = await getProposalList();
        // console.log(result);
        const action = getGetAllProposalsAction(result);
        store.dispatch(action);
    }

    componentDidMount() {
        this._reqTodoList();
      //http://localhost:13000/api/proposal

    }

    _filterProposalsByStatus = status => {
        const {proposals} = this.state;
        let targetProposals = [];

        proposals.forEach(p => {
            if (p.status === status) {
                targetProposals.push(p);
            }
        });
        console.log('Filtered propsal'+proposals);
        return targetProposals;
    };

    _getFirstCharacter = title => {
        var string = title;
        return string.charAt(0);
    };

    render() {
        const {classes} = this.props;

        return (
            <Grid
                container
                spacing={16}
                alignContent="center"
                justify="flex-end"
                direction="row"
            >
                <Grid item sm>
                    <Paper className={classes.paper} style={{backgroundColor: "#f3f3f3"}}>
                        <Typography
                            variant="h5"
                            style={{textAlign: "left", paddingLeft: "3%", paddingBottom: "3%", fontWeight: "bold", color: "#094183"}}
                        >
                            New
                        </Typography>
                        <div>
                            <List dense={true}>
                                {this._filterProposalsByStatus(status.new).map(p => (
                                    <ProposalCard
                                        key={p.clientId}
                                        id={p.clientId}
                                        title={p.name}
                                        organisation={p.name}
                                        client={p.name}
                                        supervisor={p.name}
                                        initial={this._getFirstCharacter(p.name)}
                                    />
                                ))}
                            </List>
                        </div>
                    </Paper>
                </Grid>
                <Grid item sm>
                    <Paper className={classes.paper} style={{backgroundColor: "#f3f3f3"}}>
                        <Typography
                            variant="h5"
                            style={{textAlign: "left", paddingLeft: "3%",  paddingBottom: "3%", fontWeight: "bold", color: "#094183"}}
                        >
                            Approved
                        </Typography>
                        <div>
                            <List dense={true}>
                                {this._filterProposalsByStatus(status.approved).map(p => (
                                    <ProposalCard
                                        key={p.id}
                                        id={p.id}
                                        title={p.name}
                                        organisation={p.organisation}
                                        client={p.client}
                                        supervisor={p.supervisor}
                                        initial={this._getFirstCharacter(p.name)}
                                    />
                                ))}
                            </List>
                        </div>
                    </Paper>
                </Grid>

                <Link
                    to={`/dashboard/rejectedProposals`}
                    className={classes.link}
                >
                    <Button variant="contained" size="medium" style={{backgroundColor: "#094183", color: "#ffffff"}}
                            className={classes.margin}>
                        View Rejected Proposals
                    </Button>
                </Link>
            </Grid>
        );
    }
}

export default withStyles(styles)(Proposals);