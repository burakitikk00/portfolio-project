import React, { useEffect, useState, useRef } from 'react';
import './ProjectsSection.css';

const ProjectsSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [projectStates, setProjectStates] = useState([]);
    const sectionRef = useRef(null);
    const projectRefs = useRef([]);

    // Örnek projeler verisi
    const projects = [
        {
            id: 1,
            title: "E-Ticaret Web Sitesi",
            description: "Modern ve kullanıcı dostu e-ticaret platformu. React, Node.js ve MongoDB teknolojileri kullanılarak geliştirildi.",
            image: "/src/assets/PP.png",
            technologies: ["React", "Node.js", "MongoDB", "Stripe"],
            demoLink: "#",
            codeLink: "#"
        },
        {
            id: 2,
            title: "Portföy Web Sitesi",
            description: "Kişisel portföy web sitesi. Modern tasarım ve smooth animasyonlar ile kullanıcı deneyimi odaklı geliştirildi.",
            image: "/src/assets/PP.png",
            technologies: ["React", "CSS3", "JavaScript", "Vite"],
            demoLink: "#",
            codeLink: "#"
        },
        {
            id: 3,
            title: "Blog Uygulaması",
            description: "Responsive tasarım ve admin paneli olan blog platformu. SEO optimizasyonu ve yüksek performans odaklı.",
            image: "/src/assets/PP.png",
            technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
            demoLink: "#",
            codeLink: "#"
        },
        {
            id: 4,
            title: "Görev Yönetim Uygulaması",
            description: "Takım çalışması için geliştirilmiş görev yönetim platformu. Real-time güncellemeler ve kullanıcı yetkilendirme sistemi.",
            image: "/src/assets/PP.png",
            technologies: ["Vue.js", "Firebase", "Socket.io", "Tailwind"],
            demoLink: "#",
            codeLink: "#"
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.2
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

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current && projectRefs.current.length > 0) {
                const sectionRect = sectionRef.current.getBoundingClientRect();
                const sectionTop = sectionRect.top;
                const windowHeight = window.innerHeight;

                const newStates = projectRefs.current.map((ref, index) => {
                    if (!ref) return {
                        blur: 0,
                        scale: 1,
                        opacity: 1,
                        zIndex: projects.length - index,
                        translateY: 0,
                        isStacked: false
                    };

                    const rect = ref.getBoundingClientRect();
                    const cardTop = rect.top;
                    const cardHeight = rect.height;

                    // Kart stack pozisyonu (100px sticky top pozisyonu)
                    const stackPosition = 100;

                    // Kartın stack pozisyonuna yakınlığı
                    const distanceToStack = cardTop - stackPosition;

                    // Stack efekti için gerekli değerler
                    let zIndex = projects.length - index;
                    let blur = 0;
                    let opacity = 1;
                    let scale = 1;
                    let translateY = 0;
                    let isStacked = false;

                    // Eğer kart stack pozisyonuna gelmiş ya da geçmişse
                    if (cardTop <= stackPosition) {
                        isStacked = true;

                        // Sonraki kartlar için z-index ayarla (üstteki kartlar en üstte)
                        zIndex = projects.length + index;

                        // Karta göre blur ve opacity hesapla
                        const stackDepth = Math.abs(distanceToStack) / 200; // blur artışı

                        // Stack'te altta kalan kartlar için blur ve opacity
                        const nextCards = projectRefs.current.slice(index + 1);
                        let behindCards = 0;

                        nextCards.forEach((nextRef) => {
                            if (nextRef && nextRef.getBoundingClientRect().top <= stackPosition) {
                                behindCards++;
                            }
                        });

                        if (behindCards > 0) {
                            blur = Math.min(behindCards * 3, 15); // Her kart için 3px blur
                            opacity = Math.max(1 - (behindCards * 0.2), 0.3); // Her kart için %20 opacity azalışı
                            scale = Math.max(1 - (behindCards * 0.02), 0.94); // Hafif küçülme
                            translateY = -behindCards * 2; // Hafif yukarı kaydırma
                        }
                    }

                    // Çok uzakta olan kartlar için blur
                    if (cardTop > windowHeight + 200 || cardTop < -cardHeight - 200) {
                        blur = Math.max(blur, 8);
                        opacity = Math.min(opacity, 0.5);
                    }

                    return {
                        blur,
                        scale,
                        opacity,
                        zIndex,
                        translateY,
                        isStacked
                    };
                });

                setProjectStates(newStates);
                setScrollY(window.scrollY);
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [isVisible]);

    return (
        <section ref={sectionRef} className="projects-section">
            <div className="projects-container">
                <div className="projects-header">
                    <div className={`projects-title-wrapper ${isVisible ? 'animate-slide' : ''}`}>
                        <h2 className="projects-title">
                            <span className="sliding-text">PROJELERİM</span>

                        </h2>
                    </div>
                </div>

                <div className="projects-list">
                    {projects.map((project, index) => {
                        const state = projectStates[index] || { blur: 0, scale: 1, opacity: 1, isSticking: false };

                        return (
                            <div
                                key={project.id}
                                ref={el => projectRefs.current[index] = el}
                                className={`project-card ${isVisible ? `fade-in-up delay-${index}` : ''}`}
                                style={{
                                    filter: `blur(${state.blur}px)`,
                                    transform: `scale(${state.scale}) translateY(${state.translateY}px)`,
                                    opacity: state.opacity,
                                    zIndex: state.zIndex,
                                    position: state.isStacked ? 'sticky' : 'relative',
                                    top: state.isStacked ? '100px' : 'auto',
                                    transition: 'filter 0.3s ease, transform 0.3s ease, opacity 0.3s ease'
                                }}
                            >
                                <div className="project-image">
                                    <img src={project.image} alt={project.title} />
                                    <div className="project-overlay">
                                        <div className="project-links">
                                            <a href={project.demoLink} className="project-link demo-link">
                                                <span>Proje Ayrıntıları</span>
                                            </a>
                                            <a href={project.codeLink} className="project-link code-link">
                                                <span>Github'da incele</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="project-content">
                                    <h3 className="project-title">{project.title}</h3>
                                    <p className="project-description">{project.description}</p>

                                    <div className="project-technologies">
                                        {project.technologies.map((tech, techIndex) => (
                                            <span key={techIndex} className="tech-tag">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
