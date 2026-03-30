import React, { useState } from 'react';
import './App.css';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import ContactButton from './components/ContactButton';
import About from './components/About';
import Nav from './components/Nav';
import ParticleBackground from './components/ParticleBackground';

function App() {
  const [page, setPage] = useState('Work');

  return (
    <div className="App">
      <ParticleBackground />
      <Nav activePage={page} onPageChange={setPage} />
      <Hero />
      {page === 'Work' && <Gallery />}
      {page === 'About' && <About />}
      {page === 'Contact' && <ContactButton />}
    </div>
  );
}

export default App;
