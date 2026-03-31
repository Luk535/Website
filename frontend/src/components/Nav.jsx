import React, { useRef, useEffect, useState } from 'react';

const PAGES = ['Home', 'Page 1', 'Page 2', 'Page 3', 'Contact'];

const Nav = ({ activePage, onPageChange }) => {
  const activeIdx = PAGES.indexOf(activePage);
  const btnRefs = useRef([]);
  const [pillStyle, setPillStyle] = useState({});

  useEffect(() => {
    const btn = btnRefs.current[activeIdx];
    if (btn) {
      setPillStyle({ left: btn.offsetLeft, width: btn.offsetWidth });
    }
  }, [activeIdx]);

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
            {page}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
