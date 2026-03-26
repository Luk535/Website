import React, { useEffect, useRef, useState } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className={`about-section ${isVisible ? 'visible' : ''}`}>
      <div className="about-container">
        <div className="about-image-wrapper">
          <div className="glass-card">
            <img 
              src="https://images.unsplash.com/photo-1712425718855-5169714b3632" 
              alt="Luka Cianfarani"
              className="about-image"
            />
          </div>
        </div>
        
        <div className="about-text">
          <h2 className="about-title">About</h2>
          <div className="about-content">
            <p>
              Luka is a creative director and visual artist based in New York, 
              specializing in architectural photography, editorial design, and 
              brand identity.
            </p>
            <p>
              With a focus on minimalism and modern aesthetics, Luka's work 
              explores the intersection of space, light, and form—creating 
              visual narratives that are both timeless and contemporary.
            </p>
            <p>
              Clients include leading design studios, architectural firms, and 
              cultural institutions seeking distinctive visual storytelling.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;