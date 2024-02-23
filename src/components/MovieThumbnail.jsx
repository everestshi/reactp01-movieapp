import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { movieImgBasePath } from '../globals/globalVariables';
import { fetchTrailerUrl } from '../data/tmdb-data';
import FavButton from './FavButton';
import WatchlistButton from './WatchlistButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay as outlinePlay } from '@fortawesome/free-regular-svg-icons';
import TrailerModal from './TrailerModal';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faClock as solidClock } from '@fortawesome/free-solid-svg-icons';

function MovieThumbnail({ movieObj, allowRedirect = true }) {
  const favs = useSelector((state) => state.favs.items);
  const watchlists = useSelector((state) => state.watchlist.items);

  const isFav = favs.some((favMovie) => {
    return favMovie.id == movieObj.id;
  });

  const isOnWatchlist = watchlists.some((watchlistMovie) => {
    return watchlistMovie.id == movieObj.id;
  });

  const [isHovered, setIsHovered] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Function to truncate excerpt if it's too long
  const truncateOverview = (overview, maxLength) => {
    return overview.length > maxLength
      ? overview.substring(0, maxLength) + '...'
      : overview;
  };

  const movieImage = (
    <img
    src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
    alt={movieObj.title}
      className="movie"
    ></img>
  );

  const getTrailer = async (movieId) => {
    if (movieId) {
      const url = await fetchTrailerUrl(movieId);
      setTrailerUrl(url);
    }
  };

  return (
    <div
      className="movie-thumbnail"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="thumbnail-image">
        <div className="poster-overlay">
          {movieImage}
          {(isFav || isOnWatchlist) && (
            <div className="icon-container">
              {isFav && <FontAwesomeIcon icon={solidHeart} />}
              {isOnWatchlist && <FontAwesomeIcon icon={solidClock} />}
            </div>
          )}
        </div>
        <p className={`thumbnail-image-title ${isHovered ? 'hidden' : ''}`}>
          {movieObj.title}
        </p>
      </div>
      {isHovered && (
        <div
          className="thumbnail-overlay"
          style={{
            backgroundImage: `url(${movieImgBasePath + movieObj.poster_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <Link
            to={`/movie-details/${movieObj.id}`}
            className="overlay-content"
          >
            <div className="overlay-top">
              <h3>{movieObj.title}</h3>
              <p className="thumbnail-rating">Rating: {(movieObj.vote_average.toFixed(1))}/10</p>
              <p className="thumbnail-release-date">Release Date: {movieObj.release_date}</p>
              <div className="thumbnail-overview-container">
              <p className="overview">
                {truncateOverview(movieObj.overview, 100)}
              </p>
              </div>
            </div>
          </Link>
          <div className="overlay-buttons">
            <FontAwesomeIcon
              icon={outlinePlay}
              className="circle-play-icon overlay-trailer-btn"
              onClick={async () => {
                await getTrailer(movieObj.id);
                setShowModal(true);
              }}
            />
            <FavButton movieObj={movieObj} isFav={isFav} />
            <WatchlistButton
              movieObj={movieObj}
              isOnWatchlist={isOnWatchlist}
            />
            <TrailerModal
              trailerUrl={trailerUrl}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieThumbnail;
