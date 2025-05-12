import { useState } from 'react';
import '../styles/Header.css';
import logo from '../assets/bike-logo.svg'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="BikeFinder Logo" className="logo-img" />
            <span className="logo-text">BikeFinder</span>
          </a>
        </div>
        <button 
          className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><a href="/" onClick={() => setIsMenuOpen(false)}>Home</a></li>
            <li><a href="/compare" onClick={() => setIsMenuOpen(false)}>Compare</a></li>
            <li><a href="/launches" onClick={() => setIsMenuOpen(false)}>Launches</a></li>
            <li><a href="/brands" onClick={() => setIsMenuOpen(false)}>Brands</a></li>
            <li><a href="/about" onClick={() => setIsMenuOpen(false)}>About</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
