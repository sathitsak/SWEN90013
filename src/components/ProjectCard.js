import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import teal from '@material-ui/core/colors/teal';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Link} from 'react-router-dom';

const styles = ({
    card: {
        margin: 10,
    },
    link: {
        float: 'left',
        width: '100%',
        textDecoration: 'none',
        '&:hover': {
            backgroundColor: teal[200],
        },
        '&:active': {
            backgroundColor: teal[300],
        },
    },
});

class ProjectCard extends React.Component {
    render() {
        const {classes, project} = this.props;

        return (
            <Card className={classes.card}>
                <Link
                    to={'#'}
                    className={classes.link}
                >
                    <CardHeader
                        action={
                            <IconButton>
                                <MoreVertIcon/>
                            </IconButton>
                        }
                        title={project.id}
                    />
                </Link>
            </Card>
        );
    }
}

ProjectCard.propTypes = {
    classes: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectCard);
