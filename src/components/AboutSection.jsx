import React, { useEffect, useState, useRef } from 'react';
import './AboutSection.css';

const AboutSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [typewriterText, setTypewriterText] = useState('');
    const [showCursor, setShowCursor] = useState(false);
    const [hasTypedOnce, setHasTypedOnce] = useState(false);
    const sectionRef = useRef(null);
    const cursorIntervalRef = useRef(null);

    const fullText = "Web tasarımı ve geliştirme konularında tutkulu bir geliştiriciyim. Modern teknolojiler kullanarak kullanıcı dostu, responsive ve estetik web siteleri oluşturuyorum.";

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.3
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [isVisible]);

    // Separate effect for typewriter when becomes visible
    useEffect(() => {
        if (isVisible && !hasTypedOnce) {
            setTimeout(() => {
                startTypewriter();
            }, 800);
        } else if (isVisible && hasTypedOnce) {
            // If already typed, show full text immediately
            setTypewriterText(fullText);
            setShowCursor(true);
            startCursorBlink();
        }
    }, [isVisible, hasTypedOnce]);

    const startTypewriter = () => {
        setHasTypedOnce(true);
        setShowCursor(true);
        let currentIndex = 0;

        const typeInterval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setTypewriterText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                    startCursorBlink();
                }, 500);
            }
        }, 50);
    };

    const startCursorBlink = () => {
        // Clear any existing cursor interval
        if (cursorIntervalRef.current) {
            clearInterval(cursorIntervalRef.current);
        }

        cursorIntervalRef.current = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 530);
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (cursorIntervalRef.current) {
                clearInterval(cursorIntervalRef.current);
            }
        };
    }, []);

    return (
        <section ref={sectionRef} className="about-section">
            <div className="about-container">
                <div className="about-content">
                    <div className="about-left">
                        <div className={`about-subtitle ${isVisible ? 'slide-from-left' : ''}`}>
                            BEN KİMİM
                        </div>
                        <h2 className={`about-title ${isVisible ? 'slide-from-left delay-1' : ''}`}>
                            web tasarımcısı & geliştiricisi
                        </h2>
                    </div>
                    <div className="about-right">
                        <p className="about-description typewriter-font">
                            {typewriterText}
                            <span className={`cursor ${showCursor ? 'visible' : ''}`}>|</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;