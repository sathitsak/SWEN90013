import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import EditProposalModal from "./EditProposalModal";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        marginTop: 20, 
        marginLeft: 15
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
                >
                    <Grid container spacing={0}>
                        <Grid item xs={11}>
                            <Typography variant="h6" component="h3">
                                Project outline
                            </Typography>
                        </Grid>
                        <Grid item xs={1} justify="flex-end">
                            <EditProposalModal proposal={this.props.proposal}/>
                        </Grid>
                    </Grid>
                    
                    <Typography component="p" align='justify' style={{paddingTop: 0}}>{this.props.q1}</Typography>
                </Paper>
                <Paper
                    className={classes.root}
                    elevation={5}
                >
                    <Typography variant="h6" component="h3">
                        Use of the end-product
                    </Typography>
                    <Typography component="p" align='justify'>{this.props.q5}</Typography>
                </Paper>
                <Paper
                    className={classes.root}
                    elevation={5}
                >
                    <Typography variant="h6" component="h3">
                        Benefits of end product
                    </Typography>
                    <Typography component="p" align='justify'>{this.props.q3}</Typography>
                </Paper>
                
                <Paper
                    className={classes.root}
                    elevation={5}
                >
                    <Typography variant="h6" component="h3">
                        Beneficiaries of end-product
                    </Typography>
                    <Typography component="p" align='justify'>{this.props.q2}</Typography>
                </Paper>
                <Paper
                    className={classes.root}
                    elevation={5}
                >
                    <Typography variant="h6" component="h3">
                        Originality of the idea
                    </Typography>
                    <Typography component="p" align='justify'>{this.props.q4}</Typography>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(ProposalResponses);
