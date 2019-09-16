import React from "react";
import Grid from "@material-ui/core/Grid";
import ClientPageModal from "../../Client/ClientPageModal";
import StatusChangeModal from "./StatusChangeModal";
import { green, amber, red, grey }from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

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
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  _determineStatusButtonColour(status) {
    if (status === "new") {
      return amber[500];
    } else if (status === "approved") {
      return green[500];
    } else {
      return red[500];
    }
  }

  _capitalize(str){
    if (str === "new") {
      return "New";
    } else if (str === "approved") {
      return "Approved";
    } else {
      return "Rejected"
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography variant="h5" className={classes.header}>
            INFO
        </Typography>
        <Grid container spacing={8} style={{ padding: 10, alignItems: "center" }}>
          <Grid item md={4} xs={12}>
            <div className={classes.infoHeader}>Status</div>
          </Grid>
          <Grid item md={8} xs={12}>
              <div 
                className={classes.status}
                style={{
                  backgroundColor: this._determineStatusButtonColour(
                    this.props.status
                  ),
                }} 
              />
              <div className={classes.infoContent}>{this._capitalize(this.props.status)}</div>
          </Grid>

          <br/><br/>

          <Grid item md={4} xs={12}>
            <div className={classes.infoHeader}>Client</div>
          </Grid>
          <Grid item md={8} xs={12}>
            <ClientPageModal client={this.props.client}></ClientPageModal>
          </Grid>

          <br/><br/>

          <Grid item xs={12} style={{ marginBottom: "3%" }}>
            <div className={classes.infoHeader}>Organisation</div>
            <div className={classes.infoContent}>{this.props.organisationName}</div>            
          </Grid>

          <br/><br />

          <Grid item xs={12}>
            <div className={classes.infoHeader}>Change Status</div>
          </Grid>
              
        </Grid>

        <StatusChangeModal id={this.props.id} />
      </div>
    );
  }
}

export default withStyles(styles)(ProposalInfo);
