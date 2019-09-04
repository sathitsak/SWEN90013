import React from 'react';
import PropTypes from "prop-types";
import {Card, withStyles} from "@material-ui/core";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

const styles = {
    expansionPanelSummary: {
        backgroundColor: "#424242",
        marginTop: 5,
    },
    expansionPanelDetails: {
        backgroundColor: "#757575",
    },
    font:{
        color: "white",
    }
};

class SingleNote extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        }
    }

    render() {
        const {note, classes} = this.props;

        return (
            <ExpansionPanel>
                <ExpansionPanelSummary
                    // expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={classes.expansionPanelSummary}
                >
                    <Typography className={classes.font}>
                        {note.text}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                    <Typography className={classes.font}>
                        {note.text}
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }

}

SingleNote.propTypes = {
    classes: PropTypes.object.isRequired,
    note: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleNote);