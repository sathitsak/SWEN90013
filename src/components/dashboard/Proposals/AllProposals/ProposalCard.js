import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import ClientChip from "../../ClientChip";
import Divider from "@material-ui/core/Divider";
import red from "@material-ui/core/colors/red";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

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
    const { classes, id } = this.props;
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
            <Link to={`/dashboard/proposals/${id}`}>
              <Button>View</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }
}
export default withStyles(styles)(ProposalCard);
