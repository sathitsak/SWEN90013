import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";

const SUMMARY_LENGTH = 45;

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

    // Convert dates from integers to string
    _convertDate(dateInt) {
        // Dates are sent as integer representations of dates e.g. '1568340623387'
        // Converting them into Date objects give 'Fri Sep 13 2019 12:10:23 GMT+1000 (Australian Eastern Standard Time)'
        var dateObj = new Date(parseInt(dateInt, 10));
        var dateString = dateObj.toString();
        // Split string into array of separate words and use only what is required
        var dateList = dateString.split(" ");
        let day = dateList[2];
        let month = dateList[1];
        let year = dateList[3];
        let time = this._convertTime(dateList[4]);
        return (month + " " + day + ", " + year + " " + time);
    }

    // Convert time from 24hr format to 12hr format
    // E.g. 14:10:23 converts to 02:10 PM
    _convertTime(timeString) {
        var timeOfDay;
        var timeList = timeString.split(":");
        var hour = timeList[0];
        var minutes = timeList[1];
        if (hour > 12) {
            // Afternoon
            hour = hour - 12;
            timeOfDay = "PM";
        } else if (hour < 1) {
            // Midnight
            hour = 12;
            timeOfDay = "AM";
        } else {
            timeOfDay = "AM";
        }

        // Add 0 in front of a single digit
        hour = ('0' + hour).slice(-2)

        return (hour + ":" + minutes + " " + timeOfDay);
    }
    // Shortens the given note into a set length to display 
    _shortenText(text) {
        let output = text.split("");

        // If text exceeds SUMMARY_LENGTH, take the first SUMMARY_LENGTH bits 
        if (output.length > SUMMARY_LENGTH) {
            output = output.slice(0, SUMMARY_LENGTH);
            output.push("...");
        }
        output = output.join("");
        
        return output
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
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Typography className={classes.font}>
                                <b>{note.userName} </b>{note.text ? this._shortenText(note.text) : ""}
                            </Typography>
                        </Grid>

                        <Grid item xs align="right">
                            <Typography className={classes.font}>
                                {this._convertDate(note.date)}
                            </Typography>
                        </Grid>
                     </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                    <Typography className={classes.font}>
                        <b>{note.userName} </b>{note.text}
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