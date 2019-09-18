import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import EmailModal from '../Email/EmailModal';
import {Grid} from '@material-ui/core';
import SingleNote from "./SingleNote";
import AddNoteModal from "./AddNoteModal";

const styles = {
    notesTitle: {
        textAlign: "center",
        paddingBottom: "3%",
        fontWeight: "bold",
        color: "#094183"
    }
};

class Notes extends React.Component {

    render() {
        const { classes, notes } = this.props;

        return (
            <div>
                <Typography variant="h5" className={classes.notesTitle}>
                    NOTES
                </Typography>
                {notes ? 
                   <div>
                        {
                            notes.map(
                                (note, index) =>
                                    <SingleNote key={index} note={note}/>
                            )
                        }
                    </div>
                : <div/> }
                <Grid container align="right" spacing={8}>
                    <Grid item xs={11} align="right">
                        <AddNoteModal object={this.props.object} objectType={this.props.objectType}/>
                    </Grid>
                    <Grid item xs={1} align="right">
                        <EmailModal/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Notes.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Notes);