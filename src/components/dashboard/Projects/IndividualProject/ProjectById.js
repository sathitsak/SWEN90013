import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import lightBlue from "@material-ui/core/colors/lightBlue";
import axios from "axios";

import ProjectInfo from './ProjectInfo/ProjectInfo';
import StudentTeam from './StudentTeam/StudentTeam';
import Notes from './Notes/Notes';

const styles = {
    projectInfo: {
        backgroundColor: "white",
        width: "47%",
        height: 670,
        float: "left",
        padding: 10,
        margin: 20,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black",
        // borderRadius: "3%"
    },
    studentsInfo: {
        backgroundColor: "white",
        width: "47%",
        height: 670,
        float: "right",
        padding: 10,
        margin: 20,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black",
        // borderRadius: "3%"
    },
    notes: {
        backgroundColor: "white",
        width: "96%",
        height: 140,
        padding: 10,
        margin: 20,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black"
        // borderRadius: '10%',
    }
};

class ProjectDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: {
                id: "1",
                projectName: "project 1",
                status: "new",
                internal: "0",
                subjectID: "subject 1",
                industry: "industry 1",
                supervisorID: "2",
                coordinatorID: "coordinator 1 me",
                proposalID: "2",
                client: "Stephanie Armther",
                description: "A computer is a machine that can be instructed to carry out sequences of arithmetic or logical operations automatically via computer programming. Modern computers have the ability to follow generalized sets of operations, called programs. These programs enable computers to perform an extremely wide range of tasks. A \"complete\" computer including the hardware, the operating system (main software), and peripheral equipment required and used for \"full\" operation can be referred to as a computer system. This term may as well be used for a group of computers that are connected and work together, in particular a computer network or computer cluster. Early computers were only conceived as calculating devices. Since ancient times, simple manual devices like the abacus aided people in doing calculations. Early in the Industrial Revolution, some mechanical devices were built to automate long tedious tasks, such as guiding patterns for looms. More sophisticated electrical machines did specialized analog calculations in the early 20th century. The first digital electronic calculating machines were developed during World War II. The speed, power, and versatility of computers have been increasing dramatically ever since then."
            }
        };
    }

    componentDidMount() {
        const projID = this.props.match.params.id;
        axios
            .get(`https://5ce928eda8c1ee0014c7045b.mockapi.io/projects/` + projID)
            .then(results => {
                this.setState({project: results.data});
            });
    }

    render() {
        const {classes} = this.props;
        const {project} = this.state;

        return (
            <Grid
                container
                direction="column"
                alignContent="center"
                justify="flex-end"
            >
                <Grid container direction="row">
                    <Grid item className={classes.projectInfo}>
                        <ProjectInfo project={project}/>
                    </Grid>
                    <Grid item className={classes.studentsInfo}>
                        <StudentTeam/>
                    </Grid>
                </Grid>
                <Grid item className={classes.notes}>
                    <Notes/>
                </Grid>
            </Grid>
        );
    }
}

ProjectDetail.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectDetail);
