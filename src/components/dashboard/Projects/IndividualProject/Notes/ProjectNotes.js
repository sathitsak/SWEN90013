import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import EmailModal from '../../../email/EmailModal';
import {Grid} from '@material-ui/core';
import store from "../../../../../store";
import SingleNote from "./SingleNote";

const styles = {
    font: {
        color: "#757575",
    }
};

class ProjectNotes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [],
        };

        this._handleStoreChange = this._handleStoreChange.bind(this);
        store.subscribe(this._handleStoreChange);
    }

    _handleStoreChange() {
        this.setState({notes: store.getState().project.notes,});
    }

    render() {
        const {classes} = this.props;
        const {notes} = this.state;

        return (
            <div>
                <Typography variant="h5" align='center' className={classes.font}>
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

ProjectNotes.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectNotes);