import React, { useRef, useEffect, useState } from 'react';

const PAGES = ['Home', 'Page 1', 'Page 2', 'Page 3', 'Contact'];
const PAGE_LABELS = {
  Home: 'Luka Cianfarani',
  'Page 1': 'Page 1',
  'Page 2': 'Page 2',
  'Page 3': 'Page 3',
  Contact: 'Contact',
};

const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const Nav = ({ activePage, onPageChange, darkMode, onThemeToggle }) => {
  const activeIdx = PAGES.indexOf(activePage);
  const btnRefs = useRef([]);
  const toggleRef = useRef(null);
  const [pillStyle, setPillStyle] = useState({});

  useEffect(() => {
    const btn = btnRefs.current[activeIdx];
    if (btn) setPillStyle({ left: btn.offsetLeft, width: btn.offsetWidth });
  }, [activeIdx]);

  const handleToggleClick = () => {
    if (toggleRef.current) {
      const rect = toggleRef.current.getBoundingClientRect();
      onThemeToggle(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  };

  return (
    <nav className="nav-container">
      <div className="nav-glass">
        <div className="nav-pill" style={pillStyle} />
        {PAGES.map((page, i) => (
          <button
            key={page}
            ref={el => (btnRefs.current[i] = el)}
            className={`nav-item ${activePage === page ? 'nav-item-active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {PAGE_LABELS[page]}
          </button>
        ))}
      </div>
      <button ref={toggleRef} className="theme-toggle" onClick={handleToggleClick} aria-label="Toggle theme">
        {darkMode ? <SunIcon /> : <MoonIcon />}
      </button>
    </nav>
  );
};

export default Nav;
