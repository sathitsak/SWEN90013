import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import ClientPageModal
    from '../../../Proposals/IndividualProposal/ClientPageModal';

const styles = {};

class ViewClient extends React.Component {

    render() {
        const {classes, client} = this.props;

        return (
            <div>
                <Grid container>
                    <Grid item style={{marginTop: "2%", marginRight: 80}}>
                        <Typography align="left" color="textSecondary" variant="h6" style={{ fontWeight: "bold"}}>
                            Client:
                        </Typography>
                    </Grid>
                    <Grid item style={{marginTop: 10}} align="center">
                        <ClientPageModal client={client}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

ViewClient.propTypes = {
    classes: PropTypes.object.isRequired,
    client: PropTypes.string.isRequired,
};

export default withStyles(styles)(ViewClient);
