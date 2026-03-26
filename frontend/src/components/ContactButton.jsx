import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { contactEmail } from '../mock';

const ContactButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="contact-section">
      <a 
        href={`mailto:${contactEmail}`}
        className="contact-button"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="contact-text">Contact</span>
        <div className={`mail-icon-3d ${isHovered ? 'hovered' : ''}`}>
          <Mail size={48} strokeWidth={2} />
        </div>
      </a>
    </section>
  );
};

export default ContactButton;