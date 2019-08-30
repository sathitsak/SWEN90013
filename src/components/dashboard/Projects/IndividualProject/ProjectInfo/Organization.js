import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const styles = {
    organization: {
        textAlign: 'justify',
        paddingLeft: 10,
        marginLeft: 20,
        height: 30,
        width: 670,
        fontSize: 17,
    }
};

class Organization extends React.Component {

    render() {
        const {classes, industry} = this.props;

        return (
            <div>
                <Grid container direction='column'>
                    <Grid item xs={2} style={{marginTop: 10}}>
                        <Typography align="left" variant="h6">
                            Organization:
                        </Typography>
                    </Grid>
                    <Grid item xs={2} style={{marginTop: 10,}} align="center">
                        <Paper className={classes.organization}>
                            {industry}
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Organization.propTypes = {
    classes: PropTypes.object.isRequired,
    industry: PropTypes.string.isRequired,
};

export default withStyles(styles)(Organization);