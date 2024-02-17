import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MovieDetail from '../components/MovieDetail';
import RecommendedCarousel from '../components/RecommendedCarousel';
import { appTitle } from '../globals/globalVariables';
import { fetchMovie, fetchTrailerUrl, fetchBannerUrl } from '../data/tmdb-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCirclePlay as outlinePlay } from '@fortawesome/free-regular-svg-icons';

function PageMovieDetails() {
  const { id } = useParams();
  const [movieDetailObj, setMovieDetailObj] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [playTrailer, setPlayTrailer] = useState(false);

  useEffect(() => {
    const getMovie = async () => {
      const movie = await fetchMovie(id); // Fetch movie data
      setMovieDetailObj(movie);
    };
    getMovie();
    getTrailerUrl(id);
    getBannerUrl(id);
  }, [id]);

  const getTrailerUrl = async (id) => {
    const url = await fetchTrailerUrl(id);
    setTrailerUrl(url);
  };

  const getBannerUrl = async (id) => {
    const url = await fetchBannerUrl(id);
    setBannerUrl(url);
  };

  const getTrailerComponent = () => {
    if (playTrailer && trailerUrl) {
      return (
        <div className="video-container">
          <iframe
            className="detail-page-trailer"
            src={trailerUrl}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <button
            className="btn"
            onClick={() => {
              setPlayTrailer(false);
            }}
          >
            Close
          </button>
        </div>
      );
    } else if (bannerUrl) {
      return (
        <div className={'banner-container'}>
          <img className={'banner'} src={bannerUrl} />
          <FontAwesomeIcon
            icon={outlinePlay}
            className="circle-play-icon"
            onClick={() => {
              setPlayTrailer(true);
            }}
          />
        </div>
      );
    } else {
      return '';
    }
  };

  return (
    <main>
      <div className={`banner-section ${playTrailer ? 'play-trailer' : ''}`}>
        {getTrailerComponent()}
      </div>

      <section id="movie-detail-section">
        <h2>Movie Details</h2>
        {!movieDetailObj ? (
          <p>
            Movie not found. <Link to="/">Return to home page</Link>.
          </p>
        ) : (
          <>
            <MovieDetail movieDetailObj={movieDetailObj} />
          </>
        )}
      </section>
      <section>
        <div className="recommended-carousel">
          <RecommendedCarousel movieId={id} />
        </div>
      </section>
    </main>
  );
}

export default PageMovieDetails;
