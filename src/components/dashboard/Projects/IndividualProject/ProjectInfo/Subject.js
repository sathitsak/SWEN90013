import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AssignToSubject from "../../../Proposals/IndividualProposal/AssignToSubject";

const styles = theme => ({
    subject: {
        overflow: "auto",
        textAlign: "justify",
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        height: 35,
        marginRight: 10,
        marginBottom: "1%",
        color: "#000000",
        [theme.breakpoints.down("sm")]: {
            marginRight: 30
        },
    }
});

class Subject extends React.Component {
    render() {
        const {classes, proposal, project, subjects} = this.props;

        return (
            <div>
                <Grid container>
                    <Grid item style={{marginTop: 10, marginRight: 60}}>
                        <Typography align="left" color="textSecondary"
                                    variant="h6" style={{fontWeight: "bold"}}>
                            Subject:
                        </Typography>
                    </Grid>
                    <Grid item style={{marginTop: 10}} align="center">
                        <AssignToSubject 
                            proposal={proposal}
                            project={project} 
                            subjects={subjects}/>
                    </Grid>
                </Grid>
                <Paper className={classes.subject} style={{marginTop: "2%"}}>
                    {proposal.subjectId ?
                        this._showSubject(proposal.subjectId)
                        : "NO RELATED SUBJECT"
                    }
                </Paper>
            </div>
        );
    }

    _showSubject = (subjectId) => {
        const {subjects} = this.props;
        let subjectName = "NO RELATED SUBJECT";
        subjects.forEach(sb => {
            if (sb._id === subjectId)
                subjectName = sb.code + " " + sb.name;
        });
        return subjectName;
    };
}

Subject.propTypes = {
    classes: PropTypes.object.isRequired,
    proposal: PropTypes.object.isRequired,
    subjects: PropTypes.array.isRequired,
};

export default withStyles(styles)(Subject);
