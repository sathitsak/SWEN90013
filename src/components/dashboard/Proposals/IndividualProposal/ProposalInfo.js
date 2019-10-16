import React from "react";
import Grid from "@material-ui/core/Grid";
import ClientPageModal from "../../Client/ClientPageModal";
import StatusChangeModal from "./StatusChangeModal";
import {green, amber, red, grey} from "@material-ui/core/colors";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AssignToSubject from "../IndividualProposal/AssignToSubject";
import store from "../../../../store";

const styles = theme => ({
    container: {
        justifyItems: "start",
    },
    button: {
        marginRight: "20px"
    },
    infoHeader: {
        fontWeight: "bold",
        fontSize: 18,
        verticalAlign: "middle",
        position: "relative",
        color: grey[700],
        marginBottom: "5%"
    },
    infoContent: {
        fontSize: 16,
        verticalAlign: "middle",
        position: "relative",
        color: "#000000"
    },
    status: {
        width: 25,
        height: 25,
        marginRight: 10,
        float: "left",
        borderRadius: 50,
    },
    row: {
        alignItems: "center",
    },
    header: {
        textAlign: "center",
        fontWeight: "bold",
        color: "#094183",
        marginBottom: "5%",
    }
});

class ProposalInfo extends React.Component {

    render() {
        const {classes} = this.props;
        const {proposal, subjects} = this.props;

        return (
            <div>
                <Typography variant="h5" className={classes.header}>
                    INFO
                </Typography>
                <Grid
                    container
                    spacing={3}
                    style={{padding: 10, alignItems: "center"}}
                >
                    <Grid item md={4} xs={12}>
                        <div className={classes.infoHeader}>Status</div>
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <div
                            className={classes.status}
                            style={{
                                backgroundColor: this._determineStatusButtonColour(
                                    proposal.status
                                )
                            }}
                        />
                        <div className={classes.infoContent}>
                            {this._capitalize(proposal.status)}
                        </div>
                    </Grid>

                    <br/>
                    <br/>

                    <Grid item md={4} xs={12}>
                        <div className={classes.infoHeader}>Client</div>
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <ClientPageModal 
                            client={proposal.client}
                            objType={"proposal"}
                            objID={proposal._id}/>
                    </Grid>

                    <br/>
                    <br/>

                    <Grid item xs={12} style={{marginBottom: "3%"}}>
                        <div className={classes.infoHeader}>Organisation</div>
                        <div className={classes.infoContent}>
                            {proposal.client.organisation.name}
                        </div>
                    </Grid>

                    <br />
                    <br />
                    
                    <Grid item xs={12} style={{marginBottom: "3%"}}>
                        <Grid container spacing={3}  direction="row">
                            <Grid item md={4} xs={12}>
                                <div className={classes.infoHeader}>Subject</div>
                            </Grid>
                            <Grid item md={8} xs={12}>
                                <AssignToSubject proposal={proposal} subjects={subjects}/>
                            </Grid>
                        </Grid>
                        <div className={classes.infoContent} style={{ paddingTop: "3%" }}>
                            {proposal.subjectId ?
                                this._showSubject(proposal.subjectId)
                                : "NO RELATED SUBJECT"
                            }
                        </div>
                    </Grid>

                    <br/>
                    <br/>

                    <Grid item xs={12}>
                        <div className={classes.infoHeader} style={{ marginBottom: 0 }}>Change Status</div>
                    </Grid>

                    <Grid item xs={12}>
                        <StatusChangeModal
                            proposal={proposal}
                            subjects={subjects}
                        />
                    </Grid>

                </Grid>

            </div>
        );
    }

    _showSubject = (subjectId) => {
        const {subjects} = this.props;
        let subjectName = "NO RELATED SUBJECT";
        subjects.forEach(sb => {
            if (sb._id === subjectId)
                subjectName = sb.code + " " + sb.name;
        });
        return subjectName;
    };

    _determineStatusButtonColour(status) {
        if (status === "new") {
            return amber[500];
        } else if (status === "approved") {
            return green[500];
        } else {
            return red[500];
        }
    }

    _capitalize(str) {
        if (str === "new") {
            return "New";
        } else if (str === "approved") {
            return "Approved";
        } else {
            return "Rejected";
        }
    }
}

export default withStyles(styles)(ProposalInfo);
