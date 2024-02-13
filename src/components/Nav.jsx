import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../../public/assets/styles/main-nav.css';

const Nav = () => {
  const [isSideBarActive, setIsSideBarActive] = useState(false);
  const[isNavActive, setIsNavActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const mainNav = document.querySelector(".main-nav");
      setIsNavActive(window.scrollY >= 10);
      if (mainNav) {
        if (window.scrollY >= 10) {
          mainNav.classList.add("active");
        } else {
          mainNav.classList.remove("active");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function toggleNav() {
    setIsSideBarActive(!isSideBarActive);
  }

  return (
    <div className={`main-nav ${isNavActive ? 'active' : ''}`}>
      <div className="nav-container">
        <div className="overlay" onClick={toggleNav}></div>
        <img src="../../assets/images/MovieLogo.png" alt="Movie Logo" />
        <button className="menu-open-btn" onClick={toggleNav}>
          <ion-icon name="reorder-two"></ion-icon>
          <ion-icon name="reorder-two"></ion-icon>
        </button>
        <nav className={`navbar ${isSideBarActive ? 'active' : ''}`}>
          <div className="navbar-top">
            <img src="../../assets/images/MovieLogo.png" alt="Movie Logo" />
            <button className='menu-close-btn' onClick={toggleNav}>
              <ion-icon name="close-outline"></ion-icon>
            </button>
          </div>
          <ul className='navbar-list'>
            <li>
              <NavLink className="navbar-link" to="/" onClick={toggleNav}>Home</NavLink>
            </li>
            <li>
              <NavLink className="navbar-link" to="/about" onClick={toggleNav}>About</NavLink>
            </li>
            <li>
              <NavLink className="navbar-link" to="/favs" onClick={toggleNav}>Favourites</NavLink>
            </li>
            <li>
              <NavLink className="navbar-link" to="/watchlist" onClick={toggleNav}>Watch Later</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
