import React, { useState, useEffect } from 'react';

const Jumpscare = () => {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState('in'); // 'in' | 'out'

  useEffect(() => {
    if (Math.random() >= 0.1) return;
    const timer = setTimeout(() => {
      setActive(true);
      setPhase('in');
      const dismiss = setTimeout(() => {
        setPhase('out');
        setTimeout(() => setActive(false), 400);
      }, 1600);
      return () => clearTimeout(dismiss);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setPhase('out');
    setTimeout(() => setActive(false), 400);
  };

  if (!active) return null;

  return (
    <div className={`jumpscare jumpscare-${phase}`} onClick={close}>
      <img
        src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&h=900&fit=crop"
        alt="🍔"
        className="jumpscare-img"
      />
      <p className="jumpscare-label">🍔</p>
    </div>
  );
};

export default Jumpscare;
