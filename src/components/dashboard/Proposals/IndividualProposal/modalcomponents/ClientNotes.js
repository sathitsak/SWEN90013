import React from "react";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    root: {
        width: 900
    },

});

class ClientNotes extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <SnackbarContent
                    className={classes.snackbar}
                    message="This is note 1 fkalfkdjgjalfkjdajdlsakjfkdjsflkjaskfjksjk"
                />
                <SnackbarContent
                    className={classes.snackbar}
                    message="This is note 2"
                />
            </div>
        );
    }
}

export default withStyles(styles)(ClientNotes);
