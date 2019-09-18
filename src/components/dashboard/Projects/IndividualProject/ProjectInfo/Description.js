import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
    description: {
        overflow: "auto",
        textAlign: "justify",
        padding: 10,
        height: 170,
        marginRight: 10,
        marginBottom: "1%",
        color: "#000000",
        [theme.breakpoints.down("sm")]: {
            marginRight: 30
        },
    }
});

class Description extends React.Component {

    render() {
        const {classes, description} = this.props;

        return (
            <div>
                <Typography align="left" color="textSecondary" variant="h6" style={{ fontWeight: "bold"}}>  
                    Description:
                </Typography>
                <Paper className={classes.description}> 
                    {description}
                </Paper>
            </div>
        );
    }

}

Description.propTypes = {
    classes: PropTypes.object.isRequired,
    description: PropTypes.string.isRequired
};

export default withStyles(styles)(Description);
