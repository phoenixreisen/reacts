import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import React, { useState } from 'react';
import { Header, Topbar } from '..';

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

createRoot(document.querySelector('.example-app')).render(
    <Router>
        <Routes>
            <Route path="*" element={<Root />} />
        </Routes>
    </Router>
);
