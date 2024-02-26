import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '../../public/assets/styles/main-nav.css';

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSideBarActive, setIsSideBarActive] = useState(false);
  const [isNavActive, setIsNavActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const search = () => {
    const query = searchQuery.trim();
    if (query) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    } else {
      navigate(`/search?query=`);
    }
  };

  useEffect(() => {
    if (searchQuery && location.pathname === '/search') {
      console.log('searchQuery', searchQuery);
      search();
    }
  }, [searchQuery, location.pathname]);

  const checkEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      search();
    }
  };

  const searchSection = (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          onKeyDown={checkEnterKeyPress}
          placeholder="Search movie titles"
        />

        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="search-icon"
          onClick={search}
        />
      </div>
    </div>
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsNavActive(window.scrollY >= 10);
    };

    const handleResize = () => {
      if (window.innerWidth <= 786) {
        setIsSideBarActive(false); // Remove active class if window width is less than or equal to 786px
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize); // Remove resize event listener on component unmount
    };
  }, []);

  function toggleNav() {
    setIsSideBarActive(!isSideBarActive);
    setSearchQuery('');
  }

  return (
    <div className={`main-nav ${isNavActive ? 'active' : ''}`}>
      <div className="nav-container">
        <div className="icons">
          <NavLink to="/">
            <img src="../../assets/images/MovieLogo.png" alt="Movie Logo" />
          </NavLink>
          {searchSection}
        </div>
        <div>
          <button className="menu-open-btn" onClick={toggleNav}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <nav className={`navbar ${isSideBarActive ? 'active' : ''}`}>
            <div className="navbar-top">
              <img src="../../assets/images/MovieLogo.png" alt="Movie Logo" />
              <button className="menu-close-btn" onClick={toggleNav}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <ul className="navbar-list">
              <li>
                <NavLink className="navbar-link" to="/" onClick={toggleNav}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="navbar-link"
                  to="/about"
                  onClick={toggleNav}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink className="navbar-link" to="/favs" onClick={toggleNav}>
                  Favourites
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="navbar-link watch-later-link"
                  to="/watchlist"
                  onClick={toggleNav}
                >
                  Watchlist
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Nav;
