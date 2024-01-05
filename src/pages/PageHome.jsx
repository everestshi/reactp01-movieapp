import React, { useEffect, useState } from "react";
import Movie from "../components/Movie";
import { appTitle } from "../globals/globalVariables";
import {fetchPopularMovies,
        fetchTopRatedMovies,
        fetchNowPlayingMovies,
        fetchUpcomingMovies,
        searchMovies,
        fetchMovieGenres,} from "../data/tmdb-data";
import isFav from "../utilities/isFav";
import { useSelector } from "react-redux";

function PageHome() {
  const favs = useSelector((state) => state.favs.items);
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("popular");
  //const [selectedYear, setSelectedYear] = useState("2022");

  //const years = ["2023", "2022", "2021", "2020", "2019"]; // Example years, populate as needed


  useEffect(() => {
    document.title = `${appTitle} - Home`;

    // Fetch movies when the component mounts
    const getMovies = async () => {
      let moviesToFetch = [];

      // Determine which set of movies to fetch based on selectedCategory and selectedYear
      if (selectedCategory === "popular") {
        moviesToFetch = await fetchPopularMovies();
      } else if (selectedCategory === "topRated") {
        moviesToFetch = await fetchTopRatedMovies();
      } else if (selectedCategory === "nowPlaying") {
        moviesToFetch = await fetchNowPlayingMovies();
      } else if (selectedCategory === "upcoming") {
        moviesToFetch = await fetchUpcomingMovies();
      }

      setMovies(moviesToFetch);
    };

    getMovies();
  }, [selectedCategory]);

  return (
    <main>
      <section>
        <h2>Top Movies</h2>
        <div className="filters">
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="popular">Popular</option>
            <option value="topRated">Top Rated</option>
            <option value="nowPlaying">Now Playing</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>
        <div className="movies-grid">
          {movies.map((singleMovie, i) => (
            <Movie
              key={i}
              movieObj={singleMovie}
              isFav={isFav(favs, null, singleMovie.id)}
            />
          ))}
        </div>
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