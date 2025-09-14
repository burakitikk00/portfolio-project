import React, { useState, useEffect } from 'react'
import LoadingScreen from './components/LoadingScreen'
import PageTransition from './components/PageTransition'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showPageTransition, setShowPageTransition] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Loading duration: 3 seconds
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setShowPageTransition(true);
    }, 3000);

    // Page transition starts after loading ends
    const transitionTimer = setTimeout(() => {
      setShowPageTransition(false);
    }, 4200); // 3s loading + 1.2s transition

    // Content shows with animations after transition
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 4500); // Small delay after transition

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(transitionTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <div className="App">
      <LoadingScreen isLoading={isLoading} />
      <PageTransition isActive={showPageTransition} />

      <div className={`main-content ${showContent ? 'content-visible' : ''}`}>
        <Navbar />
        <HeroSection showAnimation={showContent} />
      </div>
    </div>
  )
}

export default App
