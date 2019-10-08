import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import {Link} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";

const styles = {
    card: {
        margin: 10,
    },
    link: {
        float: "left",
        width: "100%",
        textDecoration: "none",
        "&:hover": {
            backgroundColor: grey[200],
            textDecoration: "none",
        },
        "&:active": {
            backgroundColor: grey[300]
        },
        color: "#000000"
    },
    avatar: {
        backgroundColor: red[500]
    },
    cardHeader: {
        paddingBottom: 0
    },
    cardContent: {
        paddingTop: 12,
        paddingBottom: 0
    }
};

class ProjectCard extends React.Component {
    render() {
        const {classes, _id, project} = this.props;

        return (
            <Card className={classes.card}>
                <Link to={`/dashboard/projects/${_id}`}
                      className={classes.link}>
                    <CardHeader
                        avatar={
                            <Avatar className={classes.avatar}>
                                {project.name.slice(0, 1).toUpperCase()}
                            </Avatar>
                        }
                        title={project.name}
                        subheader={project.industryType ? project.industryType : " "}
                        component="div"
                        className={classes.cardHeader}
                    />
                    <CardContent component="div"
                                 className={classes.cardContent}>
                        <Typography
                            variant="overline"
                            align="left"
                            style={{marginBottom: 5}}
                        >
                            Client: {project.proposal.client.firstName + " " + project.proposal.client.lastName}
                        </Typography>
                        <Divider/>
                        <Typography
                            component="p"
                            variant="overline"
                            style={{marginTop: 5}}
                        >
                            Supervisor: {this._showSupervisor(project.supervisorId)}
                        </Typography>
                        <Typography
                            component="p"
                            variant="overline"
                        >
                            Subject: {this._showSubject(project.proposal.subjectId)}
                        </Typography>
                    </CardContent>
                </Link>
            </Card>
        );
    }

    _showSubject = (subjectId) => {
        const {subjects} = this.props;
        let subjectName = "NO RELATED SUBJECT";
        subjects.forEach(sb => {
            if (sb._id === subjectId)
                subjectName = sb.name;
        });
        return subjectName;
    };

    _showSupervisor = (supervisorId) => {
        const {supervisors} = this.props;
        let supervisorName = "NO SUPERVISOR ASSIGNED";
        supervisors.forEach(sp => {
            if (sp._id === supervisorId) {
                // supervisorName = sp.firstName + " " + sp.lastName;
                supervisorName = sp.firstName;
            }
        });
        return supervisorName;
    };
}

ProjectCard.propTypes = {
    classes: PropTypes.object.isRequired,
    _id: PropTypes.string.isRequired,
    project: PropTypes.object.isRequired,
    supervisors: PropTypes.array.isRequired,
    subjects: PropTypes.array.isRequired,
};

export default withStyles(styles)(ProjectCard);
