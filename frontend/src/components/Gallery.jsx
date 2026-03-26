import React, { useState, useEffect, useRef } from 'react';
import { portfolioProjects } from '../mock';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
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

  const openImage = (image, title) => {
    setSelectedImage({ image, title });
    document.body.style.overflow = 'hidden';
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedImage) {
        closeImage();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedImage]);

  return (
    <>
      <section ref={galleryRef} className="gallery-section">
        <h2 className="section-label">Selected Work</h2>
        <div className={`gallery-grid-two ${isVisible ? 'fade-in' : ''}`}>
          {portfolioProjects.map((project, index) => (
            <div
              key={project.id}
              className="work-card"
              onClick={() => openImage(project.coverImage, project.title)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="work-image-wrapper">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  loading="lazy"
                  className="work-image"
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

      {selectedImage && (
        <div className="image-lightbox" onClick={closeImage}>
          <button className="lightbox-close" onClick={closeImage} aria-label="Close">
            ×
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="lightbox-image"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;