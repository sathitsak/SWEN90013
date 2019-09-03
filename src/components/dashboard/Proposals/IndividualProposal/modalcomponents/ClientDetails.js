/**
 * This component contains all contact details for a specific client. It sits within a ClientPageModal. 
 * Authors: Chamira Balasuriya, Reyna Tan
 * Date: 01/05/2019
 */

import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MobileStepper from "@material-ui/core/MobileStepper";
import grey from "@material-ui/core/colors/grey";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import BusinessIcon from "@material-ui/icons/Business";
import PersonIcon from "@material-ui/icons/Person";

const styles = {
  root: {
    maxWidth: 400,
    flexGrow: 1
  }
};

class ClientDetails extends React.Component {

  render() {

    const { classes, theme } = this.props;

    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1>{this.props.client}</h1>
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

export default ClientDetails;
