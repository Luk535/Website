import React, { useRef } from 'react';

const PAGES = ['Work', 'About', 'Contact'];

const Nav = ({ activePage, onPageChange }) => {
  const activeIdx = PAGES.indexOf(activePage);
  const pillRef = useRef(null);

  return (
    <nav className="nav-container">
      <div className="nav-glass">
        <div
          className="nav-pill"
          ref={pillRef}
          style={{ transform: `translateX(${activeIdx * 100}%)`, width: `${100 / PAGES.length}%` }}
        />
        {PAGES.map((page) => (
          <button
            key={page}
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
