import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Demo } from './footer.demo';
import ReactDOM from 'react-dom';
import React from 'react';

export const Root = () => {
    return (
        <Demo />
    );
};

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/" render={() => <Root />} />
        </Switch>
    </Router>,
    document.querySelector('.example-app'),
);
