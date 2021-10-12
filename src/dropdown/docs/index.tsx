import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Dropdown } from '../dropdown.r';
import ReactDOM from 'react-dom';
import React from 'react';

export const Root = () => {
    return (
        <Dropdown title="Awesome Dropdown">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
        </Dropdown>
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
