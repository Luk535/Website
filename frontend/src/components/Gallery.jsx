import React, { useState, useEffect, useRef, useCallback } from 'react';
import { portfolioProjects } from '../mock';

// Load Spline viewer script
if (typeof window !== 'undefined' && !window.splineViewerLoaded) {
  const script = document.createElement('script');
  script.type = 'module';
  script.src = 'https://unpkg.com/@splinetool/viewer@1.12.81/build/spline-viewer.js';
  document.head.appendChild(script);
  window.splineViewerLoaded = true;
}

const CARD_GRADIENTS_DARK = [
  'linear-gradient(145deg, #00102e 0%, #0035aa 50%, #000c22 100%)',
  'linear-gradient(145deg, #000e3d 0%, #1e40af 50%, #000933 100%)',
  'linear-gradient(145deg, #000b32 0%, #003db3 50%, #000822 100%)',
  'linear-gradient(145deg, #000f38 0%, #003db3 50%, #000933 100%)',
  'linear-gradient(145deg, #00102e 0%, #1e40af 50%, #000a1e 100%)',
  'linear-gradient(145deg, #00081a 0%, #001e7a 50%, #00040f 100%)',
  'linear-gradient(145deg, #000e28 0%, #0040a0 50%, #000920 100%)',
  'linear-gradient(145deg, #000f2e 0%, #2563eb 50%, #000920 100%)',
];

const CARD_GRADIENTS_LIGHT = [
  'linear-gradient(145deg, #1e40af 0%, #3b82f6 50%, #1d4ed8 100%)',
  'linear-gradient(145deg, #1d4ed8 0%, #3b82f6 50%, #2563eb 100%)',
  'linear-gradient(145deg, #1d4ed8 0%, #60a5fa 50%, #2563eb 100%)',
  'linear-gradient(145deg, #1540b0 0%, #3b82f6 50%, #1e40af 100%)',
  'linear-gradient(145deg, #1e40af 0%, #60a5fa 50%, #1d4ed8 100%)',
  'linear-gradient(145deg, #1d4ed8 0%, #93c5fd 50%, #2563eb 100%)',
  'linear-gradient(145deg, #1540b0 0%, #60a5fa 50%, #1d4ed8 100%)',
  'linear-gradient(145deg, #1e40af 0%, #2563eb 50%, #1540b0 100%)',
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
  const [isLoading, setIsLoading] = useState(false);
  const galleryRef = useRef(null);

  const closePreview = useCallback(() => {
    setActiveProject(null);
    onPreviewChange?.(false);
  }, [onPreviewChange]);

  const openPreview = useCallback((project) => {
    setActiveProject(project);
    setIsLoading(true);
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
                    <p className="work-description">{project.description}</p>
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
            {isLoading && (
              <div className="spline-modal-loader">
                <div className="spline-spinner" />
              </div>
            )}
            {activeProject.viewerUrl ? (
              <div className="spline-viewer-container">
                <spline-viewer url={activeProject.viewerUrl} onLoad={() => setIsLoading(false)} />
              </div>
            ) : (
              <iframe
                src={activeProject.splineUrl}
                title={activeProject.title}
                className="spline-modal-frame"
                frameBorder="0"
                allowFullScreen
                onLoad={() => setIsLoading(false)}
              />
            )}
            <div className="spline-modal-label">
              <div className="spline-modal-info">
                <span className="spline-modal-title">{activeProject.title}</span>
                <span className="spline-modal-category">{activeProject.category}</span>
              </div>
              <a
                href={activeProject.viewerUrl || activeProject.splineUrl}
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
