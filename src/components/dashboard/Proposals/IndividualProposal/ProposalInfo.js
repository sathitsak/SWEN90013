import React from "react";
import Grid from "@material-ui/core/Grid";
import ClientPageModal from "./ClientPageModal";
import StatusChangeModal from "./StatusChangeModal";
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
      return "#7CBDCE";
    } else {
      return "#98D6C3";
    }
  }

  _capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    const { classes } = this.props;
    console.log('proposalinfo')
    console.log(this.props)
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Grid container spacing={3}  className={classes.row}>
              <Grid item xs={5}>
                <div className={classes.infoHeader}>Status</div>
              </Grid>
              <Grid item xs={7}>
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
            </Grid>

            <br/>

            <Grid container spacing={3}  className={classes.row}>
              <Grid item xs={5}>
                <div className={classes.infoHeader}>Client</div>
              </Grid>
              <Grid item xs={7}>
                <ClientPageModal client={this.props.client}></ClientPageModal>
              </Grid>
            </Grid>

            <br/>

            <Grid container spacing={3}  className={classes.row}>
              <Grid item xs={5} wrap="wrap">
                <div className={classes.infoHeader}>Organisation</div>
              </Grid>
              <Grid item xs={7}>
                <div className={classes.infoContent}>{this.props.organisation}</div>
              </Grid>
            </Grid>
            
            <br/>

            
                  
          </Grid>
        </Grid>

        <StatusChangeModal id={this.props.id} />
      </div>
    );
  }
}

export default withStyles(styles)(ProposalInfo);
