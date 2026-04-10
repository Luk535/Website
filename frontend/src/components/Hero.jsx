import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 200);
  }, []);

  const letters = 'Luka Cianfarani'.split('');
  const total = letters.filter(c => c !== ' ').length - 1;
  let idx = 0;

  return (
    <section className="hero-section">
      <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
        <h1 className="hero-name">
          {letters.map((char, i) => {
            if (char === ' ') return <span key={i} className="hero-space">&nbsp;</span>;
            const letterIdx = idx++;
            return (
              <span
                key={i}
                className="hero-letter"
                style={{ '--idx': letterIdx, '--total': total }}
              >
                {char}
              </span>
            );
          })}
        </h1>
      </div>
    </section>
  );
};

export default Hero;
