import React, { useState, useEffect, useRef } from 'react';
import { portfolioProjects } from '../mock';

const Gallery = () => {
  const [isVisible, setIsVisible] = useState(false);
  const galleryRef = useRef(null);

  useEffect(() => {
    const currentRef = galleryRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  return (
    <section ref={galleryRef} className="gallery-section">
      <h2 className="section-label">Selected Work</h2>
      <div className={`gallery-grid-two ${isVisible ? 'fade-in' : ''}`}>
        {portfolioProjects.map((project, index) => (
          <div
            key={project.id}
            className="work-card"
            style={{ animationDelay: `${index * 0.12}s` }}
            onClick={() => project.splineUrl && window.open(project.splineUrl, '_blank')}
          >
            <div className="work-image-wrapper">
              {project.splineUrl ? (
                <iframe
                  src={project.splineUrl}
                  title={project.title}
                  className="work-image spline-frame"
                  frameBorder="0"
                  loading="lazy"
                  style={{ pointerEvents: 'none' }}
                />
              ) : (
                <div className="work-image coming-soon-card" />
              )}
              <div className="work-text-overlay">
                <h3 className="work-title">{project.title}</h3>
                <p className="work-category">{project.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
