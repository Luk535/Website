import React from 'react';
import './App.css';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import ContactButton from './components/ContactButton';

function App() {
  return (
    <div className="App">
      <Hero />
      <Gallery />
      <ContactButton />
    </div>
  );
}

export default App;