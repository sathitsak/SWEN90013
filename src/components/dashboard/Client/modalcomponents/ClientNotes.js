import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import EmailModal from '../../Email/EmailModal';
import {Grid} from '@material-ui/core';
import store from "../../../../store";
import SingleNote from "../../Notes/SingleNote";

const styles = {
    notesTitle: {
        textAlign: "center",
        paddingLeft: "3%",
        paddingBottom: "3%",
        fontWeight: "bold",
        color: "#094183"
    }
};

class ClientNotes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [],
        };

        this._handleStoreChange = this._handleStoreChange.bind(this);
        store.subscribe(this._handleStoreChange);
    }

    _handleStoreChange() {
        // this.setState({notes: store.getState().client.notes,});
    }

    render() {
        const {classes} = this.props;
        const {notes} = this.state;

        return (
            <div>
                <Typography variant="h5" className={classes.notesTitle}>
                    NOTES
                </Typography>
                <div>
                    {
                        notes.map(
                            (note, index) =>
                                <SingleNote key={index} note={note}/>
                        )
                    }
                </div>
                <Grid align='right'>
                    <EmailModal/>
                </Grid>
            </div>
        );
    }
}

ClientNotes.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClientNotes);