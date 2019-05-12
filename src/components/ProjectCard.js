import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {Link} from 'react-router-dom';

const styles = ({
    card: {
        margin: 10,
    },
});

class ProjectCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hover: false,
        }
    }

    _toggleHover = () => {
        this.setState({hover: !this.state.hover})
    };

    render() {
        const {classes, project} = this.props;
        const {hover} = this.state;

        let linkStyle = hover ? {
            backgroundColor: 'red',
        } : {
            backgroundColor: 'blue',
            textDecoration: 'none',
        };

        return (
            <Card className={classes.card}>
                <Link
                    to={'#'}
                    style={linkStyle}
                    onMouseEnter={this._toggleHover}
                    onMouseLeave={this._toggleHover}
                >
                    <CardHeader
                        action={
                            <IconButton>
                                <MoreVertIcon/>
                            </IconButton>
                        }
                        title={project.id}
                        // subheader="September 14, 2016"
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
