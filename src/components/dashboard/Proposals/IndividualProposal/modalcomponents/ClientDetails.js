import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import BusinessIcon from "@material-ui/icons/Business";
import MobileStepper from "@material-ui/core/MobileStepper";
import grey from "@material-ui/core/colors/grey";
import PersonIcon from "@material-ui/icons/Person";
import ErrorOutlinedIcon from '@material-ui/icons/ErrorOutlined';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import { red } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1
  },
  iconFalse: {
    marginLeft: 50,
    '&:hover': {
      color: red[500],
    },
    fontSize: 35,
    verticalAlign: 'middle',
  },
  iconTrue: {
    marginLeft: 50,
    '&:hover': {
      color: grey[500],
    },
    fontSize: 35,
    verticalAlign: 'middle',
    color: red[500]
  },
});

class ClientDetails extends React.Component {
  state = {
    hasFlag : false
  };

  _handleClientFlagUpdate = () => {
    let currentFlag = this.state.hasFlag
    this.setState({ hasFlag: !currentFlag })
  };

  render() {
    const { classes } = this.props;
    const hasFlag = this.state.hasFlag;
    let flagIcon;
    
    if (hasFlag) {
      flagIcon = <ErrorOutlinedIcon className={classes.iconTrue} onClick={this._handleClientFlagUpdate}/>
    } else {
      flagIcon = <ErrorOutlineOutlinedIcon className={classes.iconFalse} onClick={this._handleClientFlagUpdate}/>
    }
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1>{this.props.client} {flagIcon}</h1>
            <Button variant="contained">Client</Button>
          </Grid>
          <Grid item xs={6}>
            <EmailIcon /> s.armther@hamper.com.au
            <br />
            <PhoneIcon /> 0429 305 713
            <br />
            <BusinessIcon /> (03) 888 6543
          </Grid>
          <Grid item xs={6}>
            <h3> Technical Ability</h3>
            <MobileStepper
              variant="progress"
              steps={10}
              position="static"
              activeStep={2}
              style={{ backgroundColor: grey[50] }}
            />
          </Grid>
          <Grid item xs={6}>
            <h3>Secondary Contact</h3>
            <PersonIcon /> Bob Bobbins
            <br />
            <EmailIcon /> b.bobbins@hamper.com
            <br />
            <PhoneIcon /> 0472 473 653
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(ClientDetails);
