import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

const styles = {};

class ChangeStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStatus: "",
            open: false
        };
    }

    _handleClickOpen = () => {
        this.setState({open: true});
    };

    _handleClose = () => {
        this.setState({open: false});
    };

    _handleSelect = e => {
        this.setState({selectedStatus: e.target.value});
    };

    _handleOK = () => {
        const {selectedState} = this.state;
        this.setState({open: false});
        //alert("you change the state");
        console.log(this.state.selectedStatus);

        // NEED BACKEND FUNCTIONALITY
    };

    render() {
        const {classes, status} = this.props;
        const {open} = this.state;

        return (
            <div>
                <Grid container>
                    <Grid item style={{marginTop: 10, marginRight: 80}}>
                        <Typography align="left" variant="h6">
                            Status:
                        </Typography>
                    </Grid>
                    <Grid item style={{marginTop: 10}} align="center">
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={this._handleClickOpen}
                        >
                            {this.props.status}
                        </Button>
                    </Grid>
                </Grid>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={open}
                    onClose={this._handleClose}
                >
                    <DialogTitle>Choose a new status</DialogTitle>
                    <DialogContent>
                        <form className={classes.container}>
                            <FormControl className={classes.formControl}>
                                <InputLabel
                                    htmlFor="sp-native-simple">Status</InputLabel>
                                <Select
                                    native
                                    onChange={e => this._handleSelect(e)}
                                    input={<Input id="sp-native-simple"/>}
                                >
                                    <option value="New">New</option>
                                    <option value="In Progress">In Progress
                                    </option>
                                    <option value="Completed">Completed</option>
                                </Select>
                            </FormControl>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this._handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this._handleOK} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

ChangeStatus.propTypes = {
    classes: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired
};

export default withStyles(styles)(ChangeStatus);
