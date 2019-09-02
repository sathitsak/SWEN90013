import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: "flex",
        flexWrap: "wrap"
    },
});

class CreateStudentRow extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div>
        <TableRow>
            <TableCell component="th" scope="row">
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id={"firstName"+this.props.index}
                    className={classes.textField}
                    margin="dense"
                    inputProps={{ 'aria-label': 'First Name' }}
                    fullWidth
                  />
                </form>
            </TableCell>
            <TableCell align="left">
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id={"lastName"+this.props.index}
                  className={classes.textField}
                  margin="dense"
                  inputProps={{ 'aria-label': 'Last Name' }}
                  fullWidth
                />
              </form>
            </TableCell>
            <TableCell align="left">
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id={"emailAddress"+this.props.index}
                  className={classes.textField}
                  margin="dense"
                  inputProps={{ 'aria-label': 'Email Address' }}
                  fullWidth
                />
              </form>
            </TableCell>
          </TableRow>
      </div>
    );
  }
}

export default withStyles(styles)(CreateStudentRow);
