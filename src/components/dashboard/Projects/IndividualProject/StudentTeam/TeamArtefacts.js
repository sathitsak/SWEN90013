import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import PersonIcon from "@material-ui/icons/Person";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TabContainer from "react-bootstrap/TabContainer";
import TabContent from "react-bootstrap/TabContent";
import TabPane from "react-bootstrap/TabPane";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";

class TeamArtefacts extends React.Component {
    render() {
        const {students, productLinks, technologies} = this.props;

        return (
            <div>
                <TabContainer id="right-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col xs>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey="first">Students</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col xs>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey="second">Artefacts</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col xs>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey="third">Technologies</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={9}>
                            <TabContent>
                                <TabPane eventKey="first">
                                    <List dense={true}>
                                        {students.map(p => (
                                            <ListItem key={p.name}>
                                                <ListItemIcon>
                                                    <PersonIcon/>
                                                </ListItemIcon>
                                                <ListItemText primary={p.name}/>
                                            </ListItem>
                                        ))}
                                    </List>
                                </TabPane>
                            </TabContent>
                            <TabContent>
                                <TabPane eventKey="second">
                                    {/* Only display products if they exist */}
                                    {productLinks ?
                                        <List dense={true}>
                                            {productLinks.map(link => (
                                                <ListItem>
                                                    <ListItemText
                                                        primary={link}/>
                                                </ListItem>
                                            ))}
                                        </List>
                                        : <div/>
                                    }
                                </TabPane>
                            </TabContent>
                            <TabContent>
                                <TabPane eventKey="third">
                                    {/* Only display technologies if they exist */}
                                    {technologies ?
                                        <List dense={true}>
                                            {technologies.map(tech => (
                                                <ListItem>
                                                    <ListItemText
                                                        primary={tech}/>
                                                </ListItem>
                                            ))}
                                        </List>
                                        : <div/>
                                    }
                                </TabPane>
                            </TabContent>
                        </Col>
                    </Row>
                </TabContainer>
            </div>
        );
    }
}

TeamArtefacts.propTypes = {
    students: PropTypes.array.isRequired,
    productLinks: PropTypes.array.isRequired,
    technologies: PropTypes.array.isRequired,
};

export default TeamArtefacts;
