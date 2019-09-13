import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


const styles = theme => ({
    expansionPanel: {
        borderRadius: 5,
        marginBottom: 7,
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
          duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: "rotate(180deg)"
    },
});

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
            <ExpansionPanel className={classes.expansionPanel}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
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