import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 200);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-glow"></div>
      <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
        <h1 className="hero-name">Luka Cianfarani</h1>
        <p className="hero-subtitle">Creative Director & Visual Artist</p>
        <p className="hero-intro">Crafting timeless visual narratives through minimal design</p>
      </div>
    </section>
  );
};

export default Hero;