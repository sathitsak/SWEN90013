import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import TeamCard from "./TeamCard";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { tsConstructorType } from "@babel/types";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import Fab from "@material-ui/core/Fab";
import EmailIcon from "@material-ui/icons/Email";
//import AddCircleIcon from "@material-ui/icons/add_circle";
import CreateStudentTeamModal from '../StudentTeam/CreateStudentTeamModal';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "900px",
    width: "400px"
  },
  title: {
    paddingBottom: "20px"
  },
  card: {
    paddingBottom: "30px",
    marginBottom: "40px",
    width: "30px"
  },
  button: {
    marginBottom: "60px",
    marginLeft: "38px"
  },
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 100
  },
  teamTitle: {
    textAlign: "center",
    paddingLeft: "3%",
    paddingBottom: "3%",
    fontWeight: "bold",
    color: "#094183"
  }
});

//dummy data --> now getting from axios
const teams = [
  {
    name: "Emu",
    id: "24",
    students: [
      "Vanessa Little",
      "Frieda Towne III",
      "Marcelle Parisian",
      "Dominic Swift",
      "Jarred Ortiz",
      "Shirley Labadie",
      "Nina Toy",
      "Rogers Kutch"
    ]
  },
  {
    name: "Goanna",
    id: "12",
    students: [
      " Pamela Lindgren",
      "Darron O'Hara",
      "Alessia Schoen",
      "Cruz Hudson",
      "Clotilde Haley",
      " Darien Wunsch"
    ]
  }
];

class TeamPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      open: false
    };
  }

  componentDidMount() {
    axios
      .get("http://5ce79b719f2c390014dba00f.mockapi.io/teams")
      .then(response => {
        console.log(response.data);
        this.setState({ teams: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  _handleClickOpen = () => {
    this.setState({ open: true });
  };

  _handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography variant="h5" className={classes.teamTitle}>
          STUDENT TEAM        
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12}>

            <div>
              <List
                style={{ height: 454, maxHeight: 470, overflow: "auto" }}
                dense={true}
              >
                {this.state.teams.map(p => (
                  <TeamCard name={p.name} students={p.students} />
                ))}
              </List>
            </div>

            <div align="right">
              <CreateStudentTeamModal />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(TeamPage);
