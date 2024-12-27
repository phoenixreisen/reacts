import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Demo } from './fuzzy.demo';
import React from 'react';

export const Root = () => {
    return (
        <Demo />
    );
};

createRoot(document.querySelector('.example-app')).render(
    <Router>
        <Routes>
            <Route path="*" element={<Root />} />
        </Routes>
    </Router>
);
