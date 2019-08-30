// import React from "react";
// import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
// import Drawer from "@material-ui/core/Drawer";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import List from "@material-ui/core/List";
// import Typography from "@material-ui/core/Typography";
// import Divider from "@material-ui/core/Divider";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
// import AssignmentIcon from "@material-ui/icons/Assignment";
// import GavelIcon from "@material-ui/icons/Gavel";
// import PersonIcon from "@material-ui/icons/Person";
// import Grid from "@material-ui/core/Grid";
// import Avatar from "@material-ui/core/Avatar";

// const drawerWidth = 240;

// const styles = theme => ({
//   root: {
//     display: "flex"
//   },
//   appBar: {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: drawerWidth,
//     background: "#304E64"
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0
//   },
//   drawerPaper: {
//     width: drawerWidth
//   },
//   toolbar: theme.mixins.toolbar,
//   content: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.default,
//     padding: theme.spacing.unit * 3
//   },
//   avatar: {
//     margin: 20,
//     width: 60,
//     height: 60
//   }
// });

// class Dasboard extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       pageRef: 1
//     };
//   }

//   render() {
//     const { classes } = this.props;

//     return (
//       <div className={classes.root}>
//         <CssBaseline />
//         <AppBar position="fixed" className={classes.appBar}>
//           <Toolbar>
//             <Typography variant="h6" color="inherit" noWrap>
//               Name of open page
//             </Typography>
//           </Toolbar>
//         </AppBar>
//         <Drawer
//           className={classes.drawer}
//           variant="permanent"
//           classes={{
//             paper: classes.drawerPaper
//           }}
//           anchor="left"
//         >
//           <div style={styles.avatar}>
//             <Grid container spacing={12} justify="flex-start">
//               <Grid item xs={6}>
//                 <Avatar
//                   alt="Remy Sharp"
//                   src="https://www.w3schools.com/w3images/avatar2.png"
//                   className={classes.avatar}
//                 />
//               </Grid>
//               <Grid item xs={5}>
//                 <Typography style={avatarTitle} variant="h6" gutterBottom>
//                   User
//                 </Typography>
//               </Grid>
//             </Grid>
//           </div>
//           <div />
//           <Divider />
//           <List>
//             <ListItem button>
//               <ListItemIcon>
//                 <AssignmentIcon />
//               </ListItemIcon>
//               <ListItemText
//                 primary="View Proposals"
//                 onClick={this.props.buttonFunctionViewProposals}
//               />
//             </ListItem>

//             <ListItem button>
//               <ListItemIcon>
//                 <GavelIcon />
//               </ListItemIcon>
//               <ListItemText
//                 primary="View Projects"
//                 onClick={this.props.buttonFunctionViewProjects}
//               />
//             </ListItem>
//           </List>
//           <Divider />
//           <List>
//             <ListItem button>
//               <ListItemIcon>
//                 <PersonIcon />
//               </ListItemIcon>
//               <ListItemText primary="Log Out" />
//             </ListItem>
//           </List>
//         </Drawer>
//         <main className={classes.content}>
//           <div className={classes.toolbar} />
//           {this.props.main}
//         </main>
//       </div>
//     );
//   }
// }

// Dasboard.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// export default withStyles(styles)(Dasboard);
