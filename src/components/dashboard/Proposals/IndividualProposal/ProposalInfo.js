import React from "react";
import Grid from "@material-ui/core/Grid";
import ClientPageModal from "./ClientPageModal";
import StatusChangeModal from "./StatusChangeModal";
import { green, amber, red }from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";

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
    position: "relative"
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
  },
  row: {
    alignItems: "center",
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
    } else if (status === "accepted") {
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

  render() {
    const { classes } = this.props;
    console.log("proposalInfo");
    console.log(this.props.subjects);

    return (
      <div>
        <Typography variant="h5" className={classes.header}>
          INFO
        </Typography>
        <Grid
          container
          spacing={8}
          style={{ padding: 10, alignItems: "center" }}
        >
          <Grid item md={4} xs={12}>
            <div className={classes.infoHeader}>Status</div>
          </Grid>
          <Grid item md={8} xs={12}>
            <div
              className={classes.status}
              style={{
                backgroundColor: this._determineStatusButtonColour(
                  this.props.status
                )
              }}
            />
            <div className={classes.infoContent}>
              {this._capitalize(this.props.status)}
            </div>
          </Grid>

          <br />
          <br />

            <Grid container spacing={3}  className={classes.row}>
              <Grid item xs={5}>
                <div className={classes.infoHeader}>Client</div>
              </Grid>
              <Grid item xs={7}>
                <ClientPageModal client={this.props.client}></ClientPageModal>
              </Grid>
            </Grid>

          <br />
          <br />

          <Grid item xs={12} style={{ marginBottom: "3%" }}>
            <div className={classes.infoHeader}>Organisation</div>
            <div className={classes.infoContent}>
              {this.props.organisationName}
            </div>
          </Grid>

          <br />
          <br />

          <Grid item xs={12}>
            <div className={classes.infoHeader}>Change Status</div>
          </Grid>
        </Grid>

        <StatusChangeModal id={this.props.id} subjects={this.props.subjects} />
      </div>
    );
  }
}

export default withStyles(styles)(ProposalInfo);
