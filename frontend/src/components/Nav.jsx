import React from 'react';

const PAGES = ['All', 'Page 1', 'Page 2', 'Page 3', 'Contact'];

const Nav = ({ activePage, onPageChange }) => {
  const activeIdx = PAGES.indexOf(activePage);

  return (
    <nav className="nav-container">
      <div className="nav-glass">
        <div
          className="nav-pill"
          style={{
            transform: `translateX(${activeIdx * 100}%)`,
            width: `${100 / PAGES.length}%`,
          }}
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
