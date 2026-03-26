import React, { useState, useEffect, useRef } from 'react';
import { portfolioProjects } from '../mock';
import ProjectModal from './ProjectModal';

const Gallery = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const galleryRef = useRef(null);

  useEffect(() => {
    const currentRef = galleryRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
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

  return (
    <>
      <section ref={galleryRef} className="gallery-section">
        <h2 className="section-label">Selected Work</h2>
        <div className={`gallery-grid ${isVisible ? 'fade-in' : ''}`}>
          {portfolioProjects.map((project, index) => (
            <div
              key={project.id}
              className="project-card"
              onClick={() => openProject(project)}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="card-image-wrapper">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  loading="lazy"
                  className="card-image"
                />
                <div className="card-overlay">
                  <div className="card-info">
                    <h3 className="card-title">{project.title}</h3>
                    <p className="card-category">{project.category}</p>
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