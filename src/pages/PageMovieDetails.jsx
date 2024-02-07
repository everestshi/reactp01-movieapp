import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MovieDetail from '../components/MovieDetail';
import { appTitle } from '../globals/globalVariables';
import { fetchPopularMovies, fetchTrailerUrl } from '../data/tmdb-data';

function PageMovieDetails() {
  const { id } = useParams();
  const [movieObj, setMovieObj] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState('');

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
    getTrailer(id);
  }, [id]);

  const getTrailer = async (id) => {
    const url = await fetchTrailerUrl(id);
    setTrailerUrl(url);
  };

  const trailerComponent = trailerUrl ? (
    <iframe
      className="detail-page-trailer"
      src={trailerUrl}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  ) : (
    ''
  );

  return (
    <main>
      {trailerComponent}
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
