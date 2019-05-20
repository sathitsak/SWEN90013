import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import lightBlue from "@material-ui/core/colors/lightBlue";

const styles = {
  projectInfo: {
    backgroundColor: "white",
    width: "47%",
    height: 640,
    float: "left",
    padding: 10,
    margin: 20,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: "3%"
  },
  studentsInfo: {
    backgroundColor: "white",
    width: "47%",
    height: 640,
    float: "right",
    padding: 10,
    margin: 20,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: "3%"
  },
  notes: {
    backgroundColor: "white",
    width: "96%",
    height: 140,
    padding: 10,
    margin: 20,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black"
    // borderRadius: '10%',
  }
};

class ProjectDetail extends React.Component {
  render() {
    const { classes, project } = this.props;

    return (
      <Grid
        container
        direction="column"
        alignContent="center"
        justify="flex-end"
      >
        <Grid container direction="row">
          <Grid item className={classes.projectInfo}>
            {/* <List component="div">
              <ListItem>
                <Typography variant="body1">Status</Typography>
             <ListItemText primary={this.props.location.status} /> }
              </ListItem>
              <ListItem>
                <Typography variant="body1">Description</Typography>
                <ListItemText primary={this.props.location.query.projectName} />
              </ListItem>
              <ListItem>
                <Typography variant="body1">Detail(proposal)</Typography>
                <ListItemText primary={this.props.location.query.proposalID} />
              </ListItem>
              <ListItem>
                <Typography variant="body1">client</Typography>
                <ListItemText primary={this.props.location.query.client} />
              </ListItem>
              <ListItem>
                <Typography variant="body1">organization</Typography>
                <ListItemText primary={this.props.location.query.industry} />
              </ListItem>
              <ListItem>
                <Typography variant="body1">supervisor</Typography>
                <ListItemText
                  primary={this.props.location.query.supervisorID}
                />
              </ListItem>
            </List> */}
            Hello
          </Grid>
          <Grid item className={classes.studentsInfo} />
        </Grid>
        <Grid item className={classes.notes} />
      </Grid>
    );
  }
}

ProjectDetail.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectDetail);
