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
      <button className="modal-close-btn" onClick={onClose} aria-label="Close">
        <X size={20} strokeWidth={2} />
      </button>
      
      <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <p className="modal-category">{project.category}</p>
          <h2 className="modal-title">{project.title}</h2>
          <p className="modal-description">{project.description}</p>
        </div>

        <div className="modal-images">
          {project.images.map((image, index) => (
            <div key={index} className="modal-image-container">
              <img
                src={image}
                alt={`${project.title} - ${index + 1}`}
                loading="lazy"
                className="modal-image"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;