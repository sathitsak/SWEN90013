import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import teal from "@material-ui/core/colors/teal";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import red from "@material-ui/core/colors/red";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";

const styles = {
  card: {
    margin: 10
  },
  link: {
    float: "left",
    width: "100%",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: teal[200]
    },
    "&:active": {
      backgroundColor: teal[300]
    }
  },
  avatar: {
    backgroundColor: red[500]
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
            style={{ paddingBottom: 0 }}
          />
          <CardContent
            component="div"
            style={{ paddingTop: 0, paddingBottom: 5 }}
          >
            <Typography
              variant="overline"
              align="left"
              style={{ fontSize: 15 }}
            >
              Client: {project.client}
            </Typography>
            <Divider />
            <Typography
              component="p"
              variant="overline"
              style={{ fontSize: 15 }}
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
