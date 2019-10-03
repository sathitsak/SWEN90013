import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

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
        const {classes, proposal} = this.props;

        return (
            <div>
                <Typography align="left" color="textSecondary" variant="h6"
                            style={{fontWeight: "bold"}}>
                    Subject:
                </Typography>
                <Paper className={classes.subject}>
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
                subjectName = sb.name;
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
