import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ isLoading }) => {
    return (
        <div className={`loading-screen ${!isLoading ? 'loading-screen-exit' : ''}`}>
            <div className="loading-content">
                <div className="loading-spinner">
                    <div className="spinner-ring"></div>
                    <div className="spinner-ring"></div>
                    <div className="spinner-ring"></div>
                </div>
                <div className="loading-text">
                    <span className="loading-letter">B</span>
                    <span className="loading-letter">U</span>
                    <span className="loading-letter">R</span>
                    <span className="loading-letter">A</span>
                    <span className="loading-letter">K</span>
                    <span className="loading-slash"> </span>
                    <span className="loading-slash">İ</span>
                    <span className="loading-slash">T</span>
                    <span className="loading-slash">İ</span>
                    <span className="loading-slash">K</span>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;