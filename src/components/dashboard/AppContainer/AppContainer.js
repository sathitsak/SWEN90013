import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import appContainerStyles from "./appContainerStyles";
import Slide from "@material-ui/core/Slide";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Link } from "react-router-dom";
import GavelIcon from "@material-ui/icons/Gavel";
import PersonIcon from "@material-ui/icons/Person";
import FaceIcon from "@material-ui/icons/Face";
import PeopleIcon from "@material-ui/icons/People";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import store from "../../../store"; 
import { LoginContext } from "../../admin/LoginProvider";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = theme => appContainerStyles(theme);

var valueOfContext;

class AppContainer extends React.Component { 
  static contextType = LoginContext;
  valueOfContext = this.context; 

  state = {
    mobileOpen: false, 
    open: false,
  };

  _handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  _handleClickOpen = () => {
    this.setState({ open: true });
  };

  _handleClose = () => {
    this.setState({ open: false });
  };

  _handleLogOut = () => {
    // <Link to="/dashboard/proposals" className={classes.link} />;
  };

  _handleChange = () => {
    this.setState({ page_title: store.getState().page_title });
  };

  unsubscribe = store.subscribe(this._handleChange);

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar}>
          <Toolbar>
          <LoginContext.Consumer>
            {(context) => (
 <Typography variant="h6" color="inherit" noWrap>
 {context.state.userName}
</Typography>
            )}
          
            </LoginContext.Consumer>
          </Toolbar>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            key="View Proposals"
            component={Link}
            to="/dashboard"
          >
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="View Proposals" />
          </ListItem>
          <ListItem
            button
            key="View Projects"
            component={Link}
            to="/dashboard/projects"
          >
            <ListItemIcon>
              <GavelIcon />
            </ListItemIcon>
            <ListItemText primary="View Projects" />
          </ListItem>
          <ListItem
            button
            key="View Student Teams"
            component={Link}
            to="/dashboard/teams"
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="View Student Teams" />
          </ListItem>
          <ListItem
            button
            key="View Clients"
            component={Link}
            to="/dashboard/clients"
          >
            <ListItemIcon>
              <FaceIcon />
            </ListItemIcon>
            <ListItemText primary="View Clients" />
          </ListItem>
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
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this._handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              {this.state.page_title}
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden mdUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.state.mobileOpen}
              onClose={this._handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
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
            <Link to="/" className={classes.link} style={{textDecoration: "none"}}>
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
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(AppContainer);
