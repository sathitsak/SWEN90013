import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProposalCard from "../dashboard/ProposalCard";

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
});

function SimpleExpansionPanel(props) {
    const { classes, teamName, students } = props;

    return (
        <div className={classes.root}>
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>{ teamName }</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <StudentList students={students} />
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}

function StudentList({ students }) {
    return students.map(student => (
        <p>{student.firstName} {student.lastName} {student.email}
        </p>
    ));
}

SimpleExpansionPanel.propTypes = {
    classes: PropTypes.object.isRequired,
    teamName: PropTypes.object.isRequired,
    students: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleExpansionPanel);