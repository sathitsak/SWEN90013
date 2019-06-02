import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import DialogActions from '@material-ui/core/DialogActions';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        minWidth: 120,
    },
    showSup: {
        textAlign: 'left',
        paddingLeft: 10,
        marginLeft: 20,
        marginTop: 10,
        height: 30,
        width: 670,
        fontSize: 17,
    }
};

class AssignToSupervisor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            supervisors: [],
            currentSupervisor: "Kathryn Jesus",
            selectedSupervisor: "",
            open: false,
        };
    }

    componentDidMount() {
        axios
            .get(`https://5ce928eda8c1ee0014c7045b.mockapi.io/supervisors`)
            .then(results => {
                this.setState({supervisors: results.data});
            });
    }

    render() {
        const {classes} = this.props;
        const {open, currentSupervisor, supervisors} = this.state;

        return (
            <div>
                <Grid container>
                    <Grid item xs={2} style={{marginTop: 10}}>
                        <Typography align="left" variant="h6">
                            Supervisor:
                        </Typography>
                    </Grid>
                    <Grid item xs={2} style={{marginTop: 10,}} align="center">
                        <Button
                            onClick={this._handleClickOpen}
                            color='primary'
                            variant="contained"
                        >
                            (Re) Assign
                        </Button>
                    </Grid>
                </Grid>
                <Paper className={classes.showSup}>
                    {currentSupervisor}
                </Paper>
                <Dialog disableBackdropClick disableEscapeKeyDown
                        open={open} onClose={this._handleClose}>
                    <DialogTitle>
                        Choose one supervisor to assign to
                    </DialogTitle>
                    <DialogContent>
                        <form className={classes.container}>
                            <FormControl className={classes.formControl}>
                                <InputLabel
                                    htmlFor="sp-native-simple">Supervisor</InputLabel>
                                <Select
                                    native
                                    onChange={(e) => this._handleSelect(e)}
                                    input={<Input id="sp-native-simple"/>}
                                >
                                    <option value=""/>
                                    {supervisors.map((sp, index) => (
                                        <option
                                            key={index}
                                            value={sp.firstName + ' ' + sp.lastName}
                                        >
                                            {sp.firstName + ' ' + sp.lastName}
                                        </option>
                                    ))}
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

    _handleClickOpen = () => {
        this.setState({open: true});
    };

    _handleClose = () => {
        this.setState({open: false});
    };

    _handleSelect = (e) => {
        this.setState({selectedSupervisor: e.target.value});
    };

    _handleOK = () => {
        const {selectedSupervisor} = this.state;
        this.setState({
            currentSupervisor: selectedSupervisor,
            selectedSupervisor: '',
            open: false
        });
        if (selectedSupervisor !== '') {
            alert('This project is assigned to:\n' + selectedSupervisor);
        } else {
            alert('This project doesn\'t have responsible supervisor now.')
        }
    };
}

AssignToSupervisor.propTypes = {
    classes: PropTypes.object.isRequired,
    supervisorID: PropTypes.string.isRequired,
};

export default withStyles(styles)(AssignToSupervisor);
