import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import EmailModal from '../Email/EmailModal';
import {Grid} from '@material-ui/core';
import SingleNote from "./SingleNote";
import AddNoteModal from "./AddNoteModal";
import store from "../../../store";

const styles = {
    notesTitle: {
        textAlign: "center",
        paddingBottom: "3%",
        fontWeight: "bold",
        color: "#094183"
    }
};

class Notes extends React.Component {
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
        const {classes, notes} = this.props;

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
                    : <div/>}
                <Grid container align="right" spacing={1}>
                    <Grid item xs={11} align="right">
                        <AddNoteModal object={this.props.object}
                                      objectType={this.props.objectType}/>
                    </Grid>
                    <Grid item xs={1} align="right">
                        <EmailModal object={this.props.object} objectType={this.props.objectType}/>
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