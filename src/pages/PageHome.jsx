import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { appTitle, movieImgBasePath } from '../globals/globalVariables';
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
  searchMovies,
  fetchMovieGenres
} from '../data/tmdb-data';

function PageHome() {
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('popular');
  //const [selectedYear, setSelectedYear] = useState("2022");

  //const years = ["2023", "2022", "2021", "2020", "2019"]; // Example years, populate as needed

  document.title = `${appTitle} - Home`;

  useEffect(() => {
    // Fetch movies when the component mounts
    const getMovies = async () => {
      let moviesToFetch = [];

      // Determine which set of movies to fetch based on selectedCategory and selectedYear
      if (selectedCategory === 'popular') {
        moviesToFetch = await fetchPopularMovies();
      } else if (selectedCategory === 'topRated') {
        moviesToFetch = await fetchTopRatedMovies();
      } else if (selectedCategory === 'nowPlaying') {
        moviesToFetch = await fetchNowPlayingMovies();
      } else if (selectedCategory === 'upcoming') {
        moviesToFetch = await fetchUpcomingMovies();
      }
      setMovies(moviesToFetch);
    };

    getMovies();
  }, [selectedCategory]);

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
        <Link key={`${movie.id}`} to={`/movie-details/${movie.id}`}>
          <img src={movieImgBasePath + movie.poster_path}></img>
        </Link>
      ))}
    </div>
  );

  return (
    <main>
      <section>
        <h2>Top Movies</h2>
        {categoryDropDownMenu}
        {movieList}
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
