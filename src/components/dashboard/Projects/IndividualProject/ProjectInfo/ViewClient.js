import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import ClientPageModal
    from '../../../Client/ClientPageModal';

const styles = {};

class ViewClient extends React.Component {

    render() {
        const {client, objType, objID} = this.props;

        return (
            <div>
                <Grid container>
                    <Grid item style={{marginTop: "2%", marginRight: 80}}>
                        <Typography align="left" color="textSecondary"
                                    variant="h6" style={{fontWeight: "bold"}}>
                            Client:
                        </Typography>
                    </Grid>
                    <Grid item style={{marginTop: 10}} align="center">
                        <ClientPageModal 
                            client={client}
                            objType={objType}
                            objID={objID}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

ViewClient.propTypes = {
    classes: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewClient);
