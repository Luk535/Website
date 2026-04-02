import React, { useState, useEffect, useRef, useCallback } from 'react';
import { portfolioProjects } from '../mock';

const CARD_GRADIENTS_DARK = [
  'linear-gradient(145deg, #0f2044 0%, #1a3a6b 50%, #0d2d5c 100%)',
  'linear-gradient(145deg, #0a1a5c 0%, #1e40af 50%, #0a1540 100%)',
  'linear-gradient(145deg, #0c1a4a 0%, #1a4fa8 50%, #091a3d 100%)',
  'linear-gradient(145deg, #0d1b4e 0%, #1a4fa8 50%, #0a1440 100%)',
  'linear-gradient(145deg, #0f2044 0%, #1e40af 50%, #091d33 100%)',
  'linear-gradient(145deg, #060d2e 0%, #0e2070 50%, #040a1f 100%)',
  'linear-gradient(145deg, #0a2040 0%, #1d5ba6 50%, #071530 100%)',
  'linear-gradient(145deg, #122b50 0%, #2563eb 50%, #0c1e3d 100%)',
];

const CARD_GRADIENTS_LIGHT = [
  'linear-gradient(145deg, #1e40af 0%, #3b82f6 50%, #1d4ed8 100%)',
  'linear-gradient(145deg, #1d4ed8 0%, #3b82f6 50%, #2563eb 100%)',
  'linear-gradient(145deg, #1d4ed8 0%, #60a5fa 50%, #2563eb 100%)',
  'linear-gradient(145deg, #1e3a8a 0%, #3b82f6 50%, #1e40af 100%)',
  'linear-gradient(145deg, #1e40af 0%, #60a5fa 50%, #1d4ed8 100%)',
  'linear-gradient(145deg, #1d4ed8 0%, #93c5fd 50%, #2563eb 100%)',
  'linear-gradient(145deg, #1e3a8a 0%, #60a5fa 50%, #1d4ed8 100%)',
  'linear-gradient(145deg, #1e40af 0%, #2563eb 50%, #1e3a8a 100%)',
];

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15,3 21,3 21,9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const Gallery = ({ startIndex = 0, count = 4, darkMode = true, onPreviewChange }) => {
  const CARD_GRADIENTS = darkMode ? CARD_GRADIENTS_DARK : CARD_GRADIENTS_LIGHT;
  const projects = portfolioProjects.slice(startIndex, startIndex + count);
  const [isVisible, setIsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const galleryRef = useRef(null);

  const closePreview = useCallback(() => {
    setActiveProject(null);
    onPreviewChange?.(false);
  }, [onPreviewChange]);

  const openPreview = useCallback((project) => {
    setActiveProject(project);
    onPreviewChange?.(true);
  }, [onPreviewChange]);

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
    const onKey = (e) => { if (e.key === 'Escape') closePreview(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closePreview]);

  useEffect(() => {
    document.body.style.overflow = activeProject ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeProject]);

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
          {projects.map((project, index) => {
            const gradientIndex = (startIndex + index) % CARD_GRADIENTS.length;
            return (
              <div
                key={project.id}
                className="work-card"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => openPreview(project)}
              >
                <div className="work-image-wrapper">
                  <div
                    className="work-preview-bg"
                    style={{ background: CARD_GRADIENTS[gradientIndex] }}
                  >
                    <div className="work-preview-orb" />
                  </div>
                  <div className="work-text-overlay">
                    <h3 className="work-title">{project.title}</h3>
                    <p className="work-category">{project.category}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {activeProject && (
        <div className="spline-modal" onClick={closePreview}>
          <button className="spline-modal-close" onClick={closePreview}>×</button>
          <div className="spline-modal-content" onClick={e => e.stopPropagation()}>
            <iframe
              src={activeProject.splineUrl}
              title={activeProject.title}
              className="spline-modal-frame"
              frameBorder="0"
              allowFullScreen
            />
            <div className="spline-modal-label">
              <div className="spline-modal-info">
                <span className="spline-modal-title">{activeProject.title}</span>
                <span className="spline-modal-category">{activeProject.category}</span>
              </div>
              <a
                href={activeProject.splineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="spline-modal-link"
                onClick={e => e.stopPropagation()}
                title="Open project"
              >
                <ExternalLinkIcon />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
