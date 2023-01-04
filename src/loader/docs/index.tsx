import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import React from 'react';
import Loader from '..';

export const Root = () => <Loader text="Demo wird geladen..." />;

createRoot(document.querySelector('.example-app')).render(
    <Router>
        <Routes>
            <Route path="*" element={<Root />} />
        </Routes>
    </Router>
);
