/**
 * This component renders the information on the right hand side of the individual proposal page.
 * It is accessed via the view all proposals page after selecting an individual proposal.
 * Author: Chamira Balasuriya
 */

import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { blue, amber } from "@material-ui/core/colors";
import ClientPageModal from "./ClientPageModal";
import StatusChangeModal from "./StatusChangeModal";

class ProposalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  determineStatusButtonColour(status) {
    if (status === "new") {
      return blue[500];
    } else {
      return amber[500];
    }
  }

  handleClientClick() {
    alert("You clicked the client");
  }

  render() {
    const { classes } = this.props;
    console.log("proposalinfo");
    console.log(this.props);
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={6} style={{ marginTop: 50 }}>
            <Typography align="center" variant="h5">
              Status
            </Typography>
          </Grid>
          <Grid item xs={6} style={{ marginTop: 30 }} align="center">
            <Button
              variant="contained"
              color="primary"
              style={{
                backgroundColor: this.determineStatusButtonColour(
                  this.props.status
                ),
                marginTop: 18
              }}
            >
              {this.props.status}
            </Button>
          </Grid>

          <Grid item xs={6} style={{ marginTop: 30 }}>
            <Typography variant="h5" align="center">
              Client
            </Typography>
          </Grid>
          <Grid item xs={6} style={{ marginTop: 30 }} align="center">
            <ClientPageModal client={this.props.client} />
          </Grid>
          <Grid item xs={6} style={{ marginTop: 30 }}>
            <Typography variant="h5" align="center">
              Organisation {this.props.name}
            </Typography>
          </Grid>
          <Grid item xs={6} style={{ marginTop: 30 }}>
            <Typography variant="h5" align="center">
              {this.props.organisation}
            </Typography>
          </Grid>
          <StatusChangeModal id={this.props.id} />
        </Grid>
      </div>
    );
  }
}

export default ProposalInfo;
