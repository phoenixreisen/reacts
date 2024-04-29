import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Dropdown } from '../dropdown.r';
import React, { useState } from 'react';

export const Root = () => {
    const [ choice, setChoice ] = useState('');

    return (<>
        <Dropdown title="Awesome Dropdown">
            <a href="https://www.phoenixreisen.com"
                target="_blank" className="db">
                <i className="fas fa-link mr1" aria-hidden="true"></i>
                phoenixreisen.com
            </a>
            <a href="https://meinereise.phoenixreisen.com"
                target="_blank" className="db">
                <i className="fas fa-link mr1" aria-hidden="true"></i>
                Mein Phoenix
            </a>
            <a href="#" className="db" onClick={(e) => {
                e.preventDefault();
                setChoice('Bla');
            }}>
                View State setzen
            </a>
        </Dropdown>

        {choice && (
            <p className="mt3">View State: {choice}</p>
        )}
    </>);
};

createRoot(document.querySelector('.example-app')).render(
    <Router>
        <Routes>
            <Route path="*" element={<Root />} />
        </Routes>
    </Router>
);
