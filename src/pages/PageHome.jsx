import { useEffect, useState } from 'react';
import { appTitle } from '../globals/globalVariables';

import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
  searchMovies,
  fetchMovieGenres
} from '../data/tmdb-data';
import MovieThumbnail from '../components/MovieThumbnail';

function PageHome() {
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(12);
  const [totalMoviesCount, setTotalMoviesCount] = useState(0);
  const [previousCategory, setPreviousCategory] = useState('');

  const handleSearch = async () => {
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults); // Update the movies state with search results
    } catch (error) {
      console.error('Error performing search:', error);
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
        if (selectedCategory === 'popular') {
          fetchedMovies = await fetchPopularMovies();
        } else if (selectedCategory === 'topRated') {
          fetchedMovies = await fetchTopRatedMovies();
        } else if (selectedCategory === 'nowPlaying') {
          fetchedMovies = await fetchNowPlayingMovies();
        } else if (selectedCategory === 'upcoming') {
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

      setMovies(moviesToFetch);
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
      {movies.map((movie) => (
        <MovieThumbnail key={movie.id} movie={movie} />
      ))}
    </div>
  );

  const searchSection = (
    <div className="search-bar">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search movie titles"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );

  return (
    <main>
      <section>
        {searchSection}
        <h2>Top Movies</h2>
        {categoryDropDownMenu}
        {movieList}
        {displayMoreButton}
      </section>
    </main>
  );
}

export default PageHome;

/*
<select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
{years.map((year) => (
  <option key={year} value={year}>
    {year}
  </option>
))}
</select>*/
