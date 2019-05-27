import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = {
    title: {
        textAlign: 'center',
        fontSize: 20,
    },
};

class StudentTeam extends React.Component {
    render() {
        const {classes} = this.props;

        return (
            <div>
                <Typography variant="h5" align='center'>
                    STUDENT TEAM
                </Typography>
            </div>
        );
    }
}

StudentTeam.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StudentTeam);