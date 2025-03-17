import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">Blog</span>
          <span className="logo-accent">App</span>
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`hamburger ${isOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={toggleMenu}>
              <span className="nav-link-text">Home</span>
              <span className="nav-link-underline"></span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/newblog" className="nav-link" onClick={toggleMenu}>
              <span className="nav-link-text">Create Blog</span>
              <span className="nav-link-underline"></span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link" onClick={toggleMenu}>
              <span className="nav-link-text">Profile</span>
              <span className="nav-link-underline"></span>
            </Link>
          </li>
          <li className="nav-item">
          <Link to="/user" className="nav-link" onClick={toggleMenu}>User</Link>

          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
