import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Demo from './demo';
import React from 'react';

export const Root = () => <Demo />;

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/" render={() => <Root />} />
        </Switch>
    </Router>,
    document.querySelector('.example-app'),
);