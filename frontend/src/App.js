import React from 'react';
import './App.css';
import Gallery from './components/Gallery';
import { contactEmail } from './mock';

function App() {
  return (
    <div className="App">
      <header className="portfolio-header">
        <h1 className="portfolio-name">Luka Cianfarani</h1>
      </header>

      <main className="portfolio-main">
        <Gallery />
      </main>

      <footer className="portfolio-footer">
        <a href={`mailto:${contactEmail}`} className="footer-email">
          {contactEmail}
        </a>
      </footer>
    </div>
  );
}

export default App;