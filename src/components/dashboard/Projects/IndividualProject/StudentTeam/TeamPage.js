import React from "react";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import TeamCard from "./TeamCard";
import CreateStudentTeamModal from '../StudentTeam/CreateStudentTeamModal';
import store from "../../../../../store";
import PropTypes from "prop-types";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        textAlign: "center",
        color: theme.palette.text.secondary,
        height: "900px",
        width: "400px"
    },
    title: {
        paddingBottom: "20px"
    },
    card: {
        paddingBottom: "30px",
        marginBottom: "40px",
        width: "30px"
    },
    button: {
        marginBottom: "60px",
        marginLeft: "38px"
    },
    list: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: "relative",
        overflow: "auto",
        maxHeight: 100
    },
    teamTitle: {
        textAlign: "center",
        paddingLeft: "3%",
        paddingBottom: "3%",
        fontWeight: "bold",
        color: "#094183"
    },
});

class TeamPage extends React.Component {
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
        const {classes, products} = this.props;
        const {project} = this.state;

        return (
            <div style={{
                position: "relative",
                marginBottom: 10,
                overflow: "auto"
            }}>
                <Typography variant="h5" className={classes.teamTitle}>
                    STUDENT TEAMS
                </Typography>

                {/* Only display teams if they exist */}
                {products ? products.map((product, index) => (
                        <TeamCard
                            key={index}
                            product={product}
                            project={project}
                        />
                    ))
                    : <div/>
                }

                <CreateStudentTeamModal
                    projectId={project._id}
                    project={project}
                />
            </div>
        );
    }
}

TeamPage.propTypes = {
    classes: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired,
};

export default withStyles(styles)(TeamPage);
