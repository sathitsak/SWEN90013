import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const styles = {};

class ViewProposal extends React.Component {

    render() {
        const {classes, proposalID} = this.props;

        return (
            <div>
                <Grid container>
                    <Grid item xs={2} style={{marginTop: 10}}>
                        <Typography
                            variant="h6">Detail:
                        </Typography>
                    </Grid>
                    <Grid item xs={2} style={{marginTop: 10}} align="center">
                        <Button
                            variant="contained"
                            color="secondary"
                            href={`/dashboard/proposals/${proposalID}`}
                            style={{width: 140}}
                        >
                            View Proposal
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

ViewProposal.propTypes = {
    classes: PropTypes.object.isRequired,
    proposalID: PropTypes.string.isRequired,
};

export default withStyles(styles)(ViewProposal);
