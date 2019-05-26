import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const styles = {};

class ChangeStatus extends React.Component {

    render() {
        const {classes, status} = this.props;

        return (
            <div>
                <Grid container>
                    <Grid item xs={2} style={{marginTop: 10}}>
                        <Typography align="left" variant="h6">
                            Status
                        </Typography>
                    </Grid>
                    <Grid item xs={2} style={{marginTop: 10}} align="center">
                        <Button
                            variant="contained"
                            color="primary"
                            style={{
                                // backgroundColor: this.determineStatusButtonColour(
                                //     this.props.status
                                // ),
                            }}
                        >
                            {status}
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

ChangeStatus.propTypes = {
    classes: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
};

export default withStyles(styles)(ChangeStatus);