import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import EmailModal from '../Email/EmailModal';
import {Grid} from '@material-ui/core';
import SingleNote from "./SingleNote"

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
                <Grid align='right'>
                    <EmailModal/>
                </Grid>
            </div>
        );
    }
}

Notes.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Notes);