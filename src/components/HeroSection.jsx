import React, { useEffect, useState } from 'react';
import './HeroSection.css';
import PPImage from '../assets/PP.png';
const HeroSection = ({ showAnimation }) => {
    const [animationStarted, setAnimationStarted] = useState(false);

    useEffect(() => {
        if (showAnimation) {
            const timer = setTimeout(() => {
                setAnimationStarted(true);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [showAnimation]);

    return (
        <section className={`hero ${animationStarted ? 'hero-animated' : ''}`}>
            <div className="hero-container">
                <div className="hero-content">
                    <div className="hero-left">
                        <div className="hero-subtitle animate-slide-right">
                            BURAK İTİK
                        </div>
                        <h1 className="hero-title">
                            <span className="hero-title-line animate-slide-right delay-1">
                                HELLO! <span className="hero-italic">I'M</span> A
                            </span>
                            <span className="hero-title-line animate-slide-right delay-2">
                                JR. SOFTWARE
                            </span>
                            <span className="hero-title-line animate-slide-right delay-3">
                                <span className="hero-developer">DEVELOPER</span>
                            </span>
                        </h1>
                        <p className="hero-description animate-slide-right delay-4">
                            Web tasarımı ve geliştirme konularında tutkulu bir geliştiriciyim. Modern teknolojiler kullanarak kullanıcı dostu, responsive ve estetik web siteleri oluşturuyorum. Her projede yaratıcılık ve teknik becerilerimi birleştirerek dijital deneyimler yaratmayı seviyorum.
                        </p>
                        <div className="hero-buttons animate-slide-right delay-5">
                            <button className="btn-primary">PROJELERİ GÖRÜNTÜLE</button>
                            <button className="btn-secondary">İLETİŞİME GEÇ</button>
                        </div>
                    </div>
                    <div className="hero-right">
                        <div className="hero-image-container animate-fade-in delay-6">
                            <img
                                src={PPImage}
                                alt="Burak İtik"
                                className="hero-profile-image"
                                style={{
                                    width: '600px',
                                    height: '500px',
                                    objectFit: 'cover',
                                    borderRadius: '50%'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Background geometric elements */}
            <div className="hero-bg-elements">
                <div className="bg-line bg-line-1 animate-draw-line delay-7"></div>
                <div className="bg-line bg-line-2 animate-draw-line delay-8"></div>
                <div className="bg-circle bg-circle-1 animate-scale delay-9"></div>
                <div className="bg-circle bg-circle-2 animate-scale delay-10"></div>
            </div>
        </section>
    );
};

export default HeroSection;