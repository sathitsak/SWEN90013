import React from "react";
import grey from "@material-ui/core/colors/grey";
import {withStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Divider } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginTop: 20, 
    },
    question: {
        fontSize: 17,
        fontWeight: "bold",
        color: grey[700],
        marginTop: "2%",
    },
    response: {
        marginBottom: "2%",
    },
    header: {
        textAlign: "center",
        fontWeight: "bold",
        color: "#094183"
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
                    <Typography variant="h5" className={classes.header}>
                        PROPOSAL
                    </Typography>
                    <div className={classes.response}>
                        <Typography variant="h6" className={classes.question}>
                            Briefly outline your project
                        </Typography>
                        <Typography component="p" align='justify'>{this.props.q1}</Typography>
                    </div>

                    <Divider/>
                    <div className={classes.response}>
                        <Typography variant="h6" className={classes.question}>
                            Beneficiaries of the end product
                        </Typography>
                        <Typography component="p" align='justify'>{this.props.q2}</Typography>
                    </div>

                    <Divider/>
                    <div className={classes.response}>
                        <Typography variant="h6" className={classes.question}>
                            Benefits of the end product
                        </Typography>
                        <Typography component="p" align='justify'>{this.props.q3}</Typography>
                    </div>

                    <Divider/>
                    <div className={classes.response}>
                        <Typography variant="h6" className={classes.question}>
                            Originality of the idea or concept underlying the end product
                        </Typography>
                        <Typography component="p" align='justify'>{this.props.q4}</Typography>
                    </div>

                    <Divider/>
                    <div className={classes.response}>
                        <Typography variant="h6" className={classes.question}>
                            Use of the end product
                        </Typography>
                        <Typography component="p" align='justify'>{this.props.q5}</Typography>
                    </div>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(ProposalResponses);
