import React, { useState, useEffect } from 'react';
import './App.css';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import ContactButton from './components/ContactButton';
import About from './components/About';
import Nav from './components/Nav';
import ParticleBackground from './components/ParticleBackground';

function App() {
  const [page, setPage] = useState('All');

  useEffect(() => {
    const onVisibility = () => {
      document.title = document.hidden
        ? 'come back... 👀'
        : 'Luka Cianfarani | Website';
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const show = (p) => page === 'All' || page === p;

  return (
    <div className="App">
      <ParticleBackground />
      <Nav activePage={page} onPageChange={setPage} />
      <Hero />
      {show('Page 1') && <Gallery />}
      {(page === 'Page 2' || page === 'All') && (
        <section className="placeholder-section">
          <p className="section-label">Page 2</p>
          <p className="placeholder-text">Content coming soon</p>
        </section>
      )}
      {(page === 'Page 3') && (
        <section className="placeholder-section">
          <p className="section-label">Page 3</p>
          <p className="placeholder-text">Content coming soon</p>
        </section>
      )}
      {show('Contact') && <ContactButton />}
    </div>
  );
}

export default App;
