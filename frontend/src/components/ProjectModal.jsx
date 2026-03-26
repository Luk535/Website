import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    const modalElement = document.querySelector('.project-modal');
    const handleScroll = () => {
      if (modalElement) {
        setScrollY(modalElement.scrollTop);
      }
    };

    if (modalElement) {
      modalElement.addEventListener('scroll', handleScroll);
      return () => modalElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="project-modal glass-modal" onClick={onClose}>
      <div className="modal-glass-bg"></div>
      
      <button className="modal-close glass-button" onClick={onClose} aria-label="Close">
        <X size={20} />
      </button>
      
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div 
          className="modal-header"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
            opacity: Math.max(0.3, 1 - scrollY / 400)
          }}
        >
          <h2 className="modal-title">{project.title}</h2>
          <p className="modal-category">{project.category}</p>
          <p className="modal-description">{project.description}</p>
        </div>

        <div className="modal-images">
          {project.images.map((image, index) => (
            <div key={index} className="modal-image-wrapper">
              <div className="image-glass-frame">
                <img
                  src={image}
                  alt={`${project.title} - ${index + 1}`}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;