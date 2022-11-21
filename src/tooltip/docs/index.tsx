import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Demo } from './demo';
import React from 'react';

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/" render={() => <Demo />} />
        </Switch>
    </Router>,
    document.querySelector('.example-app'),
);