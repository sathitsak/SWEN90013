import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = {
};

class Notes extends React.Component {
    render() {
        const {classes} = this.props;

        return (
            <div>
                <Typography variant="h5" align='center'>
                    NOTES
                </Typography>
            </div>
        );
    }
}

Notes.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Notes);