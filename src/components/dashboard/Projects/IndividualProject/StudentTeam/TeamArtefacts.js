import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "react-bootstrap/Tab";
import TabContainer from "react-bootstrap/TabContainer";
import TabContent from "react-bootstrap/TabContent";
import TabPane from "react-bootstrap/TabPane";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";

class TeamArtefacts extends React.Component {
  render() {
    return (
      <div>
        <TabContainer id="right-tabs-example" defaultActiveKey="first">
          <Row>
            <Col xs>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Tab 1</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col xs>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="second">Tab 2</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
          <Row>
            <Col sm={9}>
              <TabContent>
                <TabPane eventKey="first">fdafdafsaf</TabPane>
                <TabPane eventKey="second">fdafsf</TabPane>
              </TabContent>
            </Col>
          </Row>
        </TabContainer>
      </div>
    );
  }
}

export default TeamArtefacts;
