import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 200);
  }, []);

  const letters = 'Luka Cianfarani'.split('');

  return (
    <section className="hero-section">
      <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
        <h1 className="hero-name">
          {letters.map((char, i) => {
            if (char === ' ') return <span key={i} className="hero-space">&nbsp;</span>;
            return (
              <a
                key={i}
                className="hero-letter"
                href={`https://en.wikipedia.org/wiki/${char}`}
                target="_blank"
                rel="noreferrer"
              >
                {char}
              </a>
            );
          })}
        </h1>
      </div>
    </section>
  );
};

export default Hero;
