import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import React from 'react';
import Loader from '..';

export const Root = () => <Loader text="Demo wird geladen..." />;

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/" render={() => <Root />} />
        </Switch>
    </Router>,
    document.querySelector('.example-app'),
);