import React, { useState, useEffect } from 'react';
import { portfolioProjects } from '../mock';
import ProjectModal from './ProjectModal';

const Gallery = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
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
      <div className={`gallery-grid ${isVisible ? 'fade-in' : ''}`}>
        {portfolioProjects.map((project, index) => (
          <div
            key={project.id}
            className="gallery-item"
            onClick={() => openProject(project)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="gallery-item-inner">
              <img
                src={project.coverImage}
                alt={project.title}
                loading="lazy"
              />
              <div className="gallery-overlay">
                <h3 className="gallery-title">{project.title}</h3>
                <p className="gallery-category">{project.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeProject} />
      )}
    </>
  );
};

export default Gallery;