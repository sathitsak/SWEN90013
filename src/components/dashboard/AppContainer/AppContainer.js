import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Link } from "react-router-dom";
import GavelIcon from "@material-ui/icons/Gavel";
import PersonIcon from "@material-ui/icons/Person";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import appContainerStyles from "./appContainerStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = theme => appContainerStyles(theme);

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  _handleClickOpen = () => {
    this.setState({ open: true });
  };

  _handleClose = () => {
    this.setState({ open: false });
  };

  _handleLogOut = () => {
    // <Link to="/dashboard/proposals" className={classes.link} />;
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar />
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          anchor="left"
        >
          <div style={styles.avatar}>
            <Grid container spacing={8} justify="flex-start">
              <Grid item xs={5}>
                <Typography
                  variant="h6"
                  align="center"
                  gutterBottom
                  className={classes.userTitle}
                >
                  User
                </Typography>
              </Grid>
            </Grid>
          </div>
          <div />
          <Divider />
          <List>
            <Link to="/dashboard" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>

                <ListItemText primary="View Proposals" />
              </ListItem>
            </Link>
            <Link to="/dashboard/projects" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <GavelIcon />
                </ListItemIcon>

                <ListItemText primary="View Projects" />
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Log Out" onClick={this._handleClickOpen} />
            </ListItem>
          </List>
        </Drawer>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this._handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Are you sure you want to log out?"}
          </DialogTitle>
          <DialogContent />
          <DialogActions>
            <Link to="/" className={classes.link}>
              <Button onClick={this._handleLogOut} color="primary">
                Yes
              </Button>
            </Link>

            <Button color="primary" onClick={this._handleClose}>
              No
            </Button>
          </DialogActions>
        </Dialog>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
    );
  }
}

AppContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppContainer);
