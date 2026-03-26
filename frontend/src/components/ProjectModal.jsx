import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="project-modal" onClick={onClose}>
      <button className="modal-close" onClick={onClose} aria-label="Close">
        <X size={24} />
      </button>
      
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{project.title}</h2>
          <p className="modal-description">{project.description}</p>
        </div>

        <div className="modal-images">
          {project.images.map((image, index) => (
            <div key={index} className="modal-image-wrapper">
              <img
                src={image}
                alt={`${project.title} - ${index + 1}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;