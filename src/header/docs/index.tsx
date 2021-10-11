import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header, Topbar } from '../index.r';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

export const Root = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (<>
        <div className="wrapper wrapper--large">
            <Header
                version="Header mit Topbar Demo"
                toggleNav={(e) => { e.preventDefault(); setOpen(!open) }}
            />
        </div>
        <Topbar
            name="Phoenix Demo App"
            backUrl="https://www.phoenixreisen.com"
            toggleNav={(e) => { e.preventDefault(); setOpen(!open) }}
            toggleAvatar={(e) => { e.preventDefault(); setOpen(!open) }}
        />
    </>);
};

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/" render={() => <Root />} />
        </Switch>
    </Router>,
    document.querySelector('.example-app'),
);