import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom"

const styles = {
    viewProposalButton: {
        color: "#ffffff",
        backgroundColor: "#094183",
        '&:hover': {
            backgroundColor: "#4074B2",
            color: "#ffffff",
        }
    }
};

class ViewProposal extends React.Component {

    render() {
        const {classes, proposalID} = this.props;

        return (
            <div>
                <Grid container>
                    <Grid item style={{marginTop: 10, marginRight: 80}}>
                        <Typography align="left" color="textSecondary" variant="h6" style={{ fontWeight: "bold"}}>
                            Detail:
                        </Typography>
                    </Grid>
                    <Grid item style={{marginTop: 10}} align="center">
                        <Link
                            to={`/dashboard/proposals/${proposalID}`}
                            style={{textDecoration: "none"}}
                        >
                            <Button variant="contained"
                            color="primary"  className={classes.viewProposalButton}>
                                View proposal
                            </Button>
                        
                        </Link>
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
