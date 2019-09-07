import React from "react";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PersonIcon from "@material-ui/icons/Person";
import ListItemText from "@material-ui/core/ListItemText";
import TabContainer from "react-bootstrap/TabContainer";
import TabContent from "react-bootstrap/TabContent";
import TabPane from "react-bootstrap/TabPane";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import classNames from 'classnames';

//npm install --save clsx

const styles = theme => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
});

const TeamCard = props => {
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }
  return (
    <Card style={{ margin: 10, raised: true }}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={styles.avatar}>
            {/* Team name always begins at index 6 */}
            {props.name.slice(5, 6).toUpperCase()}
          </Avatar>
        }
        title={props.name}
        action={
          <IconButton
            className={clsx(styles.expand, {
              [styles.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        }
      >
      </CardHeader>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <TeamArtefacts students={props.students} />
        </CardContent>
      </Collapse>
    </Card>
  );
};

function TeamArtefacts(props) {
  return (
    <div>
      <TabContainer id="right-tabs-example" defaultActiveKey="first">
        <Row>
          <Col xs>
            <Nav variant="pills" className="flex-column" >
              <Nav.Item >
                <Nav.Link eventKey="first">Students</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col xs>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="second">Artefacts</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col xs>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="third">Technologies</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col sm={9}>
            <TabContent>
              <TabPane eventKey="first">
                {" "}
                <List dense={true}>
                  {props.students.map(p => (
                    <ListItem>
                      <ListItemIcon>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText primary={p} />
                    </ListItem>
                  ))}
                </List>
              </TabPane>
            </TabContent>
            <TabContent>
              <TabPane eventKey="second">Artefacts go here </TabPane>
            </TabContent>
            <TabContent>
              <TabPane eventKey="third">Technologies go here</TabPane>
            </TabContent>
          </Col>
        </Row>
      </TabContainer>
    </div>
  );
}

export default TeamCard;
