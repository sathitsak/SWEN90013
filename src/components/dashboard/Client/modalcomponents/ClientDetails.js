/**
 * This component contains all contact details for a specific client. It sits within a ClientPageModal. 
 * Authors: Chamira Balasuriya, Reyna Tan
 * Date: 01/05/2019
 */

import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MobileStepper from "@material-ui/core/MobileStepper";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import BusinessIcon from "@material-ui/icons/Business";
import PersonIcon from "@material-ui/icons/Person";
import ErrorOutlinedIcon from '@material-ui/icons/ErrorOutlined';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import {red, grey} from "@material-ui/core/colors";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    root: {
        maxWidth: 400,
        flexGrow: 1
    },
    icon: {
        verticalAlign: 'middle',
        fontSize: 30,
        paddingRight: 10,
        color: grey[500]
    },
    iconFalse: {
        marginLeft: 20,
        marginBottom: 10,
        color: grey[500],
        '&:hover': {
            color: red[500],
        },
        fontSize: 35,
        verticalAlign: 'middle',
    },
    iconTrue: {
        marginLeft: 20,
        marginBottom: 10,
        '&:hover': {
            color: grey[500],
        },
        fontSize: 35,
        verticalAlign: 'middle',
        color: red[500]
    },
    infoRow: {
        marginBottom: 10,
        color: "#000000"
    },
    infoHeading: {
        marginTop: 30,
        marginBottom: 5,
        fontWeight: "bold",
        color: "#094183"
    },
    technicalAbility: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
        disabled: true,
    }
});

class ClientDetails extends React.Component {
    state = {
        hasFlag: false
    };

    _handleClientFlagUpdate = () => {
        let currentFlag = this.state.hasFlag
        this.setState({hasFlag: !currentFlag})
    };

    render() {
        const { classes } = this.props;
        const hasFlag = this.state.hasFlag;
        let flagIcon;

        if (hasFlag) {
            flagIcon = <ErrorOutlinedIcon className={classes.iconTrue}
                                          onClick={this._handleClientFlagUpdate}/>
        } else {
            flagIcon = <ErrorOutlineOutlinedIcon className={classes.iconFalse}
                                                 onClick={this._handleClientFlagUpdate}/>
        }
        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <h1 style={{ color: "#094183" }}>{this.props.clientName}{flagIcon}</h1>
                        <Grid item xs={6} className={classes.infoRow}>
                            <EmailIcon
                                className={classes.icon}/>{this.props.email}
                        </Grid>
                        <Grid item xs={6} className={classes.infoRow}>
                            <PhoneIcon className={classes.icon}/>{this.props.contactNumber}
                        </Grid>
                        <Grid item xs={6} className={classes.infoRow}>
                            <BusinessIcon className={classes.icon}/>{this.props.orgNumber}
                        </Grid>

                        <h5 className={classes.infoHeading}>Technical Ability</h5>
                        <Grid item xs={6} className={classes.infoRow}>
                            <MobileStepper
                                variant="progress"
                                steps={10}
                                position="static"
                                activeStep={this.props.technicalAbility}
                                style={{backgroundColor: grey[50], width: 400}}
                                nextButton={
                                    <Button className={classes.technicalAbility}
                                            size="small">
                                        Strong
                                    </Button>
                                }
                                backButton={
                                    <Button className={classes.technicalAbility}
                                            size="small">
                                        Weak
                                    </Button>
                                }
                            />
                        </Grid>

                        <h5 className={classes.infoHeading}>Secondary Contact</h5>
                        <Grid item xs={6} className={classes.infoRow}>
                            <PersonIcon className={classes.icon}/>{this.props.secondaryContactName}
                        </Grid>
                        <Grid item xs={6} className={classes.infoRow}>
                            <EmailIcon
                                className={classes.icon}/>{this.props.secondaryContactEmail}
                        </Grid>
                        <Grid item xs={6} className={classes.infoRow}>
                            <PhoneIcon className={classes.icon}/>{this.props.secondaryContactNumber}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(ClientDetails);
