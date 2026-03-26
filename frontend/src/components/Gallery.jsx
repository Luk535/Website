import React, { useState, useEffect, useRef } from 'react';
import { portfolioProjects } from '../mock';
import ProjectModal from './ProjectModal';

const Gallery = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const galleryRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => {
      if (galleryRef.current) {
        observer.unobserve(galleryRef.current);
      }
    };
  }, []);

  const openProject = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProject = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  // Define grid placement for asymmetrical layout
  const gridPlacements = [
    { gridColumn: 'span 2', gridRow: 'span 2' }, // Large
    { gridColumn: 'span 1', gridRow: 'span 1' }, // Small
    { gridColumn: 'span 1', gridRow: 'span 2' }, // Tall
    { gridColumn: 'span 2', gridRow: 'span 1' }, // Wide
    { gridColumn: 'span 1', gridRow: 'span 1' }, // Small
    { gridColumn: 'span 1', gridRow: 'span 2' }, // Tall
    { gridColumn: 'span 2', gridRow: 'span 1' }, // Wide
    { gridColumn: 'span 1', gridRow: 'span 1' }, // Small
  ];

  return (
    <>
      <section ref={galleryRef} className="gallery-section">
        <h2 className="section-title">Selected Work</h2>
        <div className={`asymmetric-gallery ${isVisible ? 'fade-in' : ''}`}>
          {portfolioProjects.map((project, index) => (
            <div
              key={project.id}
              className="gallery-card"
              onClick={() => openProject(project)}
              style={{
                ...gridPlacements[index % gridPlacements.length],
                animationDelay: `${index * 0.1}s}`
              }}
            >
              <div className="gallery-card-inner">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  loading="lazy"
                  className="gallery-image"
                />
                <div className="glass-overlay">
                  <div className="glass-panel">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-category">{project.category}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeProject} />
      )}
    </>
  );
};

export default Gallery;