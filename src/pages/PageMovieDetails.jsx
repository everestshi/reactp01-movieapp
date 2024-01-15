import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MovieDetail from '../components/MovieDetail';
import { appTitle } from '../globals/globalVariables';
import { useSelector } from 'react-redux';
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
  searchMovies,
  fetchMovieGenres
} from '../data/tmdb-data';

function PageMovieDetails() {
  const favs = useSelector((state) => state.favs.items);
  const watchlist = useSelector((state) => state.watchlist.items);
  const { id } = useParams();
  const [movieObj, setMovieObj] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      const movieData = await fetchPopularMovies(); // Fetch movie data
      const foundMovie = movieData.find((movie) => String(movie.id) === id);
      if (foundMovie) {
        setMovieObj(foundMovie);
        document.title = `${appTitle} - Movie Details: ${foundMovie.title}`;
      } else {
        document.title = `${appTitle} - Movie Details`;
      }
    };
    getMovie();
  }, [id]);

  return (
    <main>
      <section>
        <h2>Movie Details</h2>
        {!movieObj ? (
          <p>
            Movie not found. <Link to="/">Return to home page</Link>.
          </p>
        ) : (
          <div className="movie-single">
            <MovieDetail movieObj={movieObj} />
          </div>
        )}
      </section>
    </main>
  );
}

export default PageMovieDetails;
