import React, { useEffect, useState, useRef } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const orbRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    pos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    target.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    setTimeout(() => setIsVisible(true), 200);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.07;
      pos.current.y += (target.current.y - pos.current.y) * 0.07;
      if (orbRef.current) {
        orbRef.current.style.left = pos.current.x + 'px';
        orbRef.current.style.top = pos.current.y + 'px';
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const letters = 'Luka Cianfarani'.split('');
  const total = letters.filter(c => c !== ' ').length - 1;
  let idx = 0;

  return (
    <section className="hero-section">
      <div ref={orbRef} className="hero-orb" />
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
