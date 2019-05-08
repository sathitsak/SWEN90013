import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import submitPage from './components/submitPage'

import Home from './components/home'
class App extends React.Component {
  render() {
    return (
    <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link"> Home </Link></li>
            <li><Link to={'/submitPage'} className="nav-link">submitPage</Link></li>

          </ul>
          </nav>
          <hr />
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/submitPage' component={submitPage} />

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;