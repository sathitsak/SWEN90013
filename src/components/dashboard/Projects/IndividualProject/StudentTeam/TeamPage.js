import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import TeamCard from "./TeamCard";
import axios from "axios";
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
  },
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
      <div style={{ position: "relative", marginBottom: 10, overflow: "auto"}}>
        <Typography variant="h5" className={classes.teamTitle}>
          STUDENT TEAMS        
        </Typography>

        {this.state.teams.map(p => (
          <TeamCard name={p.name} key={p.id} students={p.students} />
        ))}

        <CreateStudentTeamModal />
      </div>
    );
  }
}

export default withStyles(styles)(TeamPage);
