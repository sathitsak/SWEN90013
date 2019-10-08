import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import BuildingIcon from "@material-ui/icons/AccountBalance";

const styles = theme => ({
  margin: {
    marginLeft: 10,
    paddingLeft: 20
  }
});

class AddCoordinatorForm extends React.Component {
  render() {
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} style={{ paddingBottom: 30 }}>
            <FormControl className={styles.margin}>
              <InputLabel htmlFor="input-with-icon-adornment">
                First Name
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <br />
          <Grid item xs={12} style={{ paddingBottom: 30 }}>
            <FormControl className={styles.margin}>
              <InputLabel htmlFor="input-with-icon-adornment">
                Last Name
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <br />
          <Grid item xs={12} style={{ paddingBottom: 30 }}>
            <FormControl className={styles.margin}>
              <InputLabel htmlFor="input-with-icon-adornment">
                Email{" "}
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <br />
          <Grid item xs={12} style={{ paddingBottom: 30 }}>
            <FormControl className={styles.margin}>
              <InputLabel htmlFor="input-with-icon-adornment">
                Contact Number{" "}
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <br />
          <Grid item xs={12} style={{ paddingBottom: 30 }}>
            <FormControl className={styles.margin}>
              <InputLabel htmlFor="input-with-icon-adornment">
                Office Location{" "}
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <BuildingIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(AddCoordinatorForm);
