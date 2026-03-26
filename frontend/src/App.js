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
      
      <footer className="site-footer">
        <div className="footer-content">
          <a href={`mailto:${contactEmail}`} className="footer-email-link">
            <Mail size={16} strokeWidth={2} />
            <span>{contactEmail}</span>
          </a>
          
          <div className="footer-social">
            <a href="#" className="social-link" aria-label="Instagram">
              <Instagram size={18} strokeWidth={2} />
            </a>
            <a href="#" className="social-link" aria-label="Twitter">
              <Twitter size={18} strokeWidth={2} />
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
              <Linkedin size={18} strokeWidth={2} />
            </a>
          </div>
        </div>
        
        <p className="footer-copyright">© 2025 Luka Cianfarani</p>
      </footer>
    </div>
  );
}

export default App;