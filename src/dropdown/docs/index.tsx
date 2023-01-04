import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Dropdown } from '../dropdown.r';
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

createRoot(document.querySelector('.example-app')).render(
    <Router>
        <Routes>
            <Route path="*" element={<Root />} />
        </Routes>
    </Router>
);
