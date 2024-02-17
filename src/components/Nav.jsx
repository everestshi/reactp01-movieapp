import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../../public/assets/styles/main-nav.css";
import { searchMovies } from "../data/tmdb-data";

const Nav = () => {
  const [isSideBarActive, setIsSideBarActive] = useState(false);
  const [isNavActive, setIsNavActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults); // Update the movies state with search results
    } catch (error) {
      console.error("Error performing search:", error);
    }
  };

  const searchSection = (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search movie titles"
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="search-icon"
          onClick={handleSearch}
        />
      </div>
    </div>
  );

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
    <div className={`main-nav ${isNavActive ? "active" : ""}`}>
      <div className="nav-container">
        <div className="icons">
          {/* <div className="overlay" onClick={toggleNav}></div> */}
          <NavLink to="/" onClick={toggleNav}>
            <img src="../../assets/images/MovieLogo.png" alt="Movie Logo" />
          </NavLink>
          {searchSection}
        </div>
        <div>
          <button className="menu-open-btn" onClick={toggleNav}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <nav className={`navbar ${isSideBarActive ? "active" : ""}`}>
            <div className="navbar-top">
              <img src="../../assets/images/MovieLogo.png" alt="Movie Logo" />
              <button className="menu-close-btn" onClick={toggleNav}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <ul className="navbar-list">
              {/* <li>
              <NavLink className="navbar-link" to="/" onClick={toggleNav}>Home</NavLink>
            </li> */}
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
                  Watch Later
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
