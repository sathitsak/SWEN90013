import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ViewProjectPage from "./components/ViewProjectPage";

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path='/projects' component={ViewProjectPage}/>
        </Switch>
    </Router>
);

export default Routes;
