import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MovieDetail from '../components/MovieDetail';
import { appTitle } from '../globals/globalVariables';
import {
  fetchPopularMovies,
  fetchTrailerUrl,
  fetchBannerUrl
} from '../data/tmdb-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCirclePlay as outlinePlay } from '@fortawesome/free-regular-svg-icons';


function PageMovieDetails() {
  const { id } = useParams();
  const [movieObj, setMovieObj] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [playTrailer, setPlayTrailer] = useState(false);


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
    getBanner(id);
  }, [id]);

  const getTrailer = async (id) => {
    const url = await fetchTrailerUrl(id);
    setTrailerUrl(url);
  };

  const getBanner = async (id) => {
    const url = await fetchBannerUrl(id);
    setBannerUrl(url);
  };

  const getTrailerComponent = () => {
    if (playTrailer && trailerUrl) {
      return (
        <iframe
          className="detail-page-trailer"
          src={trailerUrl}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    } else if (bannerUrl) {
      return (
        <div className="banner-container">
          <img className={'banner'} src={bannerUrl} />
          <FontAwesomeIcon icon={outlinePlay} className="circle-play-icon" />
        </div>
      );
    } else {
      return '';
    }
  };


  return (
    <main>
      {getTrailerComponent()}
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
