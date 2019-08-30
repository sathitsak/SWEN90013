import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import {withStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    }
});

class ProposalResponses extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div>
                <Paper
                    className={classes.root}
                    elevation={5}
                    style={{marginTop: 20, marginLeft: 15}}
                >
                    <Typography variant="h6" component="h3">
                        Briefly outline your project
                    </Typography>
                    <Typography component="p">{this.props.q1}</Typography>
                </Paper>
                <Paper
                    className={classes.root}
                    elevation={5}
                    style={{marginTop: 20, marginLeft: 15}}
                >
                    <Typography variant="h6" component="h3">
                        Benefits of end product
                    </Typography>
                    <Typography component="p">{this.props.q2}</Typography>
                </Paper>
                <Paper
                    className={classes.root}
                    elevation={5}
                    style={{marginTop: 20, marginLeft: 15}}
                >
                    <Typography variant="h6" component="h3">
                        Use of the end-product
                    </Typography>
                    <Typography component="p">{this.props.q3}</Typography>
                </Paper>
                <Paper
                    className={classes.root}
                    elevation={5}
                    style={{marginTop: 20, marginLeft: 15}}
                >
                    <Typography variant="h6" component="h3">
                        Beneficiaries of end-product
                    </Typography>
                    <Typography component="p">{this.props.q4}</Typography>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(ProposalResponses);
