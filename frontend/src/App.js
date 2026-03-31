import React, { useState } from 'react';
import './App.css';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import ContactButton from './components/ContactButton';
import About from './components/About';
import Nav from './components/Nav';
import ParticleBackground from './components/ParticleBackground';

function App() {
  const [page, setPage] = useState('Home');

  const show = (p) => page === 'Home' || page === p;

  return (
    <div className="App">
      <ParticleBackground />
      <Nav activePage={page} onPageChange={setPage} />
      <Hero />
      {(page === 'Home' || page === 'Page 1') && <Gallery startIndex={0} count={4} />}
      {page === 'Page 2' && <Gallery startIndex={4} count={4} />}
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
