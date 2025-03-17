import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
      toggleMenu();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

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
          
          {user ? (
            <>
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
                <span className="nav-link user-name">
                  <i className="fas fa-user"></i>
                  {user.displayName || user.email}
                </span>
              </li>
              <li className="nav-item" style={{ backgroundColor: 'black', height: '50px', width: '120px'}}>
                <Link className="nav-link" onClick={handleSignOut}>
                  <span className="nav-link-text">Sign Out</span>
                  <span className="nav-link-underline"></span>

                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/user" className="nav-link login-button" onClick={toggleMenu} target="_self" rel="opener">
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
