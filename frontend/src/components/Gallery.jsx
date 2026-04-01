import React, { useState, useEffect, useRef } from 'react';
import { portfolioProjects } from '../mock';

const Gallery = ({ startIndex = 0, count = 4 }) => {
  const projects = portfolioProjects.slice(startIndex, startIndex + count);
  const [isVisible, setIsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
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

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setActiveProject(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeProject ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeProject]);

  // Prevent browser zoom (ctrl+scroll) when modal is open
  useEffect(() => {
    if (!activeProject) return;
    const preventZoom = (e) => {
      if (e.ctrlKey || e.metaKey) e.preventDefault();
    };
    document.addEventListener('wheel', preventZoom, { passive: false });
    return () => document.removeEventListener('wheel', preventZoom);
  }, [activeProject]);

  return (
    <>
      <section ref={galleryRef} className="gallery-section">
        <h2 className="section-label">Gallery</h2>
        <div className={`gallery-grid-two ${isVisible ? 'fade-in' : ''}`}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="work-card"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setActiveProject(project)}
            >
              <div className="work-image-wrapper">
                <iframe
                  src={project.splineUrl}
                  title={project.title}
                  className="work-image spline-frame"
                  frameBorder="0"
                  loading="lazy"
                  style={{ pointerEvents: 'none' }}
                />
                <div className="work-text-overlay">
                  <h3 className="work-title">{project.title}</h3>
                  <p className="work-category">{project.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {activeProject && (
        <div className="spline-modal" onClick={() => setActiveProject(null)}>
          <button className="spline-modal-close" onClick={() => setActiveProject(null)}>×</button>
          <div className="spline-modal-content" onClick={e => e.stopPropagation()}>
            <iframe
              src={activeProject.splineUrl}
              title={activeProject.title}
              className="spline-modal-frame"
              frameBorder="0"
              allowFullScreen
            />
            <div className="spline-modal-label">
              <span className="spline-modal-title">{activeProject.title}</span>
              <span className="spline-modal-category">{activeProject.category}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
