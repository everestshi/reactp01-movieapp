import { useEffect, useState } from "react";
import { appTitle } from "../globals/globalVariables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlay as outlinePlay } from "@fortawesome/free-regular-svg-icons";
import { faCirclePlay as solidPlay } from "@fortawesome/free-solid-svg-icons";
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
  searchMovies,
  fetchMovieGenres,
  fetchTrailerUrl,
  fetchBannerUrl,
} from "../data/tmdb-data";
import MovieThumbnail from "../components/MovieThumbnail";
import TrailerModal from "../components/TrailerModal";
import TopMoviesCarousel from "../components/TopMoviesCarousel";

function PageHome() {
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayCount, setDisplayCount] = useState(12);
  const [totalMoviesCount, setTotalMoviesCount] = useState(0);
  const [previousCategory, setPreviousCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");

  const handleSearch = async () => {
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults); // Update the movies state with search results
    } catch (error) {
      console.error("Error performing search:", error);
    }
  };

  //const [selectedYear, setSelectedYear] = useState("2022");

  //const years = ["2023", "2022", "2021", "2020", "2019"]; // Example years, populate as needed

  document.title = `${appTitle} - Home`;

  useEffect(() => {
    const getMovies = async () => {
      let moviesToFetch = [];
      let fetchedMovies = [];

      if (searchQuery) {
        fetchedMovies = await searchMovies(searchQuery);
        setTotalMoviesCount(fetchedMovies.length);
        moviesToFetch = fetchedMovies.slice(0, displayCount);
      } else {
        if (selectedCategory === "popular") {
          fetchedMovies = await fetchPopularMovies();
        } else if (selectedCategory === "topRated") {
          fetchedMovies = await fetchTopRatedMovies();
        } else if (selectedCategory === "nowPlaying") {
          fetchedMovies = await fetchNowPlayingMovies();
        } else if (selectedCategory === "upcoming") {
          fetchedMovies = await fetchUpcomingMovies();
        }
        setTotalMoviesCount(fetchedMovies.length);
        moviesToFetch = fetchedMovies.slice(0, displayCount);
      }

      if (selectedCategory !== previousCategory) {
        // Reset movies back to 12 when the category changes
        setDisplayCount(12);
        moviesToFetch = moviesToFetch.slice(0, displayCount);
        setPreviousCategory(selectedCategory); // Update the previous category
      }

      // Fetch banner URLs for each movie
      const moviesWithBanners = await Promise.all(
        moviesToFetch.map(async (movie) => {
          const bannerUrl = await fetchBannerUrl(movie.id);
          return { ...movie, bannerUrl };
        })
      );

      setMovies(moviesWithBanners);
    };

    getMovies();
  }, [selectedCategory, searchQuery, displayCount, previousCategory]);

  const handleDisplayMore = () => {
    // Increment the display count to show more movies
    setDisplayCount(displayCount + 12);
  };

  const displayMoreButton =
    totalMoviesCount > displayCount ? (
      <button onClick={handleDisplayMore}>Display More</button>
    ) : null;

  const categoryDropDownMenu = (
    <div className="filters">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="popular">Popular</option>
        <option value="topRated">Top Rated</option>
        <option value="nowPlaying">Now Playing</option>
        <option value="upcoming">Upcoming</option>
      </select>
    </div>
  );

  const movieList = (
    <div className="movies-grid">
      {movies.map((movieObj) => (
        <div key={movieObj.id} className="movie-card">
          <MovieThumbnail movieObj={movieObj} />
          <button
            className="watch-trailer-btn"
            onClick={async () => {
              await getTrailer(movieObj.id);
              setShowModal(true);
            }}
          >
            <FontAwesomeIcon icon={outlinePlay} className="circle-play-icon" />
            <span>Watch Trailer</span>
          </button>
        </div>
      ))}
    </div>
  );

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

  const getTrailer = async (movieId) => {
    if (movieId) {
      const url = await fetchTrailerUrl(movieId);
      setTrailerUrl(url);
    }
  };

  return (
    <main>
      <section>
        <h2>Top Movies</h2>
        <TopMoviesCarousel movies={movies} />
        {searchSection}
        {categoryDropDownMenu}
        {movieList}
        {displayMoreButton}
        <TrailerModal
          trailerUrl={trailerUrl}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </section>
    </main>
  );
}

export default PageHome;
