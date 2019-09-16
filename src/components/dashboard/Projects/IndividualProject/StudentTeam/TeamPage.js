import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import TeamCard from "./TeamCard";
import CreateStudentTeamModal from '../StudentTeam/CreateStudentTeamModal';
import store from "../../../../../store";

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

class TeamPage extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = store.getState();
    this.setState({open: false});

    this._handleStoreChange = this._handleStoreChange.bind(this);
    store.subscribe(this._handleStoreChange);
  }

  _handleStoreChange() {
    this.setState(store.getState());
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

        {/* Only display teams if they exist */}
        {this.props.products ? this.props.products.map(product => (
          <TeamCard 
            name={product.name} 
            key={product._id} 
            students={product.students}
            artefacts={product.productLinks}
            technologies={product.technologies}
          />
        ))
          : <div/>
        }

        <CreateStudentTeamModal />
      </div>
    );
  }
}

export default withStyles(styles)(TeamPage);
