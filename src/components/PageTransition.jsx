import React from 'react';
import './PageTransition.css';

const PageTransition = ({ isActive }) => {
    return (
        <div className={`page-transition ${isActive ? 'page-transition-active' : ''}`}>
            <div className="transition-panel transition-panel-top"></div>
            <div className="transition-panel transition-panel-bottom"></div>
        </div>
    );
};

export default PageTransition;