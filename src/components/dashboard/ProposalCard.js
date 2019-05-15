import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import { withStyles } from "@material-ui/core/styles";
import ClientChip from "./ClientChip";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  card: {
    // maxWidth: 400,
    width: 350,
    height: 200,
    marginBottom: 10
  },
  avatar: {
    backgroundColor: red[500]
  }
});

class ProposalCard extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={<Avatar className={classes.avatar}>R</Avatar>}
            title={this.props.title}
            subheader={this.props.organisation}
          />
          <CardContent>
            <Typography variant="overline" align="left">
              Client
              <ClientChip clientName={this.props.client} />
            </Typography>
            <br />
            <Divider component="li" paddingTop="20" />

            <Typography component="p" variant="overline">
              Supervisor: {this.props.supervisor}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}
export default withStyles(styles)(ProposalCard);
