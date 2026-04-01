import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import ContactButton from './components/ContactButton';
import About from './components/About';
import Nav from './components/Nav';
import ParticleBackground from './components/ParticleBackground';

function App() {
  const [page, setPage] = useState('Home');
  const [darkMode, setDarkMode] = useState(true);
  const [overlay, setOverlay] = useState(null);

  useEffect(() => {
    document.body.classList.toggle('light', !darkMode);
  }, [darkMode]);

  const handleThemeToggle = useCallback((originX, originY) => {
    const newDark = !darkMode;
    const color = newDark ? '#0D1B2E' : '#E8F1FF';
    setOverlay({ x: originX, y: originY, color, active: false });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setOverlay(prev => prev ? { ...prev, active: true } : null);
      });
    });
    setTimeout(() => {
      setDarkMode(newDark);
      setOverlay(null);
    }, 680);
  }, [darkMode]);

  return (
    <div className="App">
      {overlay && (
        <div
          className={`theme-overlay${overlay.active ? ' theme-overlay--active' : ''}`}
          style={{ '--ox': `${overlay.x}px`, '--oy': `${overlay.y}px`, background: overlay.color }}
        />
      )}
      <ParticleBackground />
      <Nav activePage={page} onPageChange={setPage} darkMode={darkMode} onThemeToggle={handleThemeToggle} />
      {page === 'Home' && <Hero />}
      {page === 'Page 1' && <Gallery startIndex={0} count={4} darkMode={darkMode} />}
      {page === 'Page 2' && <Gallery startIndex={4} count={4} darkMode={darkMode} />}
      {page === 'Page 3' && (
        <section className="placeholder-section">
          <p className="section-label">Page 3</p>
          <p className="placeholder-text">Content coming soon</p>
        </section>
      )}
      {page === 'Contact' && <ContactButton />}
    </div>
  );
}

export default App;
