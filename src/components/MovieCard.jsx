import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faInfoCircle, faClock, faHeart } from '@fortawesome/free-solid-svg-icons';
import TrailerModal from './TrailerModal'; // Import your TrailerModal component
import { fetchTrailerUrl } from '../data/tmdb-data';


function MovieCard({ movie }) {
  const [showModal, setShowModal] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState(null); // Initialize trailerUrl with null

  const handlePlayTrailer = async () => {
    try {
      const url = await fetchTrailerUrl(movie.id);
      setTrailerUrl(url);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching trailer:', error);
    }
  };

  const handleWatchLater = () => {
    // Add logic to add movie to watch later list
  };

  const handleFavorite = () => {
    // Add logic to add movie to favorites list
  };

  const getTrailer = async (movieId) => {
    if (movieId) {
      const url = await fetchTrailerUrl(movieId);
      setTrailerUrl(url);
    }
  };

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-link">
        <img src={movie.bannerUrl} alt={movie.title} />
        <div className="movie-details">
          <h3>{movie.title}</h3>
          <p>{movie.description}</p>
          <div className="buttons">
            <button onClick={handlePlayTrailer}><FontAwesomeIcon icon={faPlay} /> Play Trailer</button>
            <button onClick={handleWatchLater}><FontAwesomeIcon icon={faClock} /> Watch Later</button>
            <button onClick={handleFavorite}><FontAwesomeIcon icon={faHeart} /> Favorite</button>
          </div>
        </div>
      </Link>
      {trailerUrl && ( // Conditionally render TrailerModal only if trailerUrl is not null
        <TrailerModal
          trailerUrl={trailerUrl}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}

export default MovieCard;
