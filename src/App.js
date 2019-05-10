import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './css/uom.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

import LandingPage from './components/landingPage'

library.add(faLightbulb, fas)

class App extends Component {
  render() {
    return (
        <Router>
            <div className="uomcontent">
                <div className="page-inner">
                    <div role="main">
                        <Switch>
                            <Route exact path='/' component={LandingPage} />
                        </Switch>
                    </div>
                </div>
            </div>

        </Router>
    );
  }
}

export default App;
