import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 200);
  }, []);

  return (
    <section className="hero-section">
      <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
        <h1 className="hero-name gradient-name">Luka Cianfarani</h1>
      </div>
    </section>
  );
};

export default Hero;