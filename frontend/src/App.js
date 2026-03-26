import React from 'react';
import './App.css';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import About from './components/About';
import { Mail, Instagram, Twitter, Linkedin } from 'lucide-react';
import { contactEmail } from './mock';

function App() {
  return (
    <div className="App">
      <Hero />
      <Gallery />
      <About />
      
      <footer className="portfolio-footer">
        <div className="footer-content">
          <a href={`mailto:${contactEmail}`} className="footer-email glass-button">
            <Mail size={18} />
            <span>{contactEmail}</span>
          </a>
          
          <div className="footer-social">
            <a href="#" className="social-link glass-button" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="#" className="social-link glass-button" aria-label="Twitter">
              <Twitter size={18} />
            </a>
            <a href="#" className="social-link glass-button" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
        
        <p className="footer-copyright">© 2025 Luka Cianfarani. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;