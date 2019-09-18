import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";

const styles = {
  card: {
    margin: 10,
  },
  link: {
    float: "left",
    width: "100%",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: grey[200],
      textDecoration: "none",
    },
    "&:active": {
      backgroundColor: grey[300]
    }
  },
  avatar: {
    backgroundColor: red[500]
  },
  cardHeader: {
    paddingBottom: 0
  },
  cardContent: {
    paddingTop: 12,
    paddingBottom: 0
  }
};

class ProjectCard extends React.Component {
  render() {
    const { classes, id, project } = this.props;

    return (
      <Card className={classes.card}>
        <Link to={`/dashboard/projects/${id}`} className={classes.link}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>
                {project.projectName.slice(0, 1).toUpperCase()}
              </Avatar>
            }
            title={project.projectName}
            subheader={project.industry}
            component="div"
            className={classes.cardHeader}
          />
          <CardContent component="div" className={classes.cardContent}>
            <Typography
              variant="overline"
              align="left"
              style={{ marginBottom: 5 }}
            >
              Client: {project.client}
            </Typography>
            <Divider component="li" paddingTop="20" />
            <Typography
              component="p"
              variant="overline"
              style={{ marginTop: 5 }}
            >
              Supervisor: {project.supervisorID}
            </Typography>
          </CardContent>
        </Link>
      </Card>
    );
  }
}

ProjectCard.propTypes = {
  classes: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectCard);
