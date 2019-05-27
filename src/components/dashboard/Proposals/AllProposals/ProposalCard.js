import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import red from "@material-ui/core/colors/red";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const styles = theme => ({
  card: {
    // maxWidth: 400,
    width: 350,
    height: 170,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  },
  avatar: {
    backgroundColor: red[500]
  },
  link: {
    float: "left",
    width: "100%",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: "#f5f5f5"
    },
    "&:active": {
      backgroundColor: "#ADB8C1"
    }
  }
});

class ProposalCard extends React.Component {
  render() {
    const { classes, id } = this.props;
    return (
      <Card className={classes.card}>
        <Link
          to={`/dashboard/proposals/${id}`}
          id={this.props.id}
          className={classes.link}
        >
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>{this.props.initial}</Avatar>
            }
            title={this.props.title}
            subheader={this.props.organisation}
          />
          <CardContent>
            <Typography variant="overline" align="left">
              Client: {this.props.client}
            </Typography>

            <Divider component="li" paddingTop="20" />

            <Typography component="p" variant="overline">
              Supervisor: {this.props.supervisor}
            </Typography>
          </CardContent>
        </Link>
      </Card>
    );
  }
}
export default withStyles(styles)(ProposalCard);
