import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-logo">
                    <div className="logo-container">
                        <span className="logo-name">
                            <span className="logo-first">BURAK</span>
                            <span className="logo-separator"> </span>
                            <span className="logo-last">İTİK</span>
                        </span>
                        <div className="logo-subtitle">JR. SOFTWARE DEVELOPER</div>
                    </div>
                </div>

                <div className={`nav-menu ${isMenuOpen ? 'nav-menu-active' : ''}`}>
                    <a href="#home" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                        HOME
                    </a>
                    <a href="#about" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                        ABOUT
                    </a>
                    <a href="#services" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                        SERVICES
                    </a>
                    <a href="#projects" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                        PROJECTS
                    </a>
                    <a href="#contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                        CONTACT
                    </a>
                </div>

                <div className="nav-toggle" onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;