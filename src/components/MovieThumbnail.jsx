import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { addFav, deleteFav } from '../features/favs/favsSlice';
import {
  addWatchlistItem,
  deleteWatchlistItem
} from '../features/favs/watchlistSlice';
import { movieImgBasePath } from '../globals/globalVariables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as outlineHeart } from '@fortawesome/free-regular-svg-icons';

function MovieThumbnail({ movie }) {
  const favs = useSelector((state) => state.favs.items);
  const isFav = favs.some((favMovie) => {
    return favMovie.id == movie.id;
  });

  const dispatch = useDispatch();

  const handleFavClick = () => {
    if (isFav === true) {
      dispatch(deleteFav(movie));
    } else {
      dispatch(addFav(movie));
    }
  };

  function handleWatchlistClick(addToWatchlist, obj) {
    if (addToWatchlist === true) {
      dispatch(addWatchlistItem(obj));
    } else {
      dispatch(deleteWatchlistItem(obj));
    }
  }

  const favIcon = isFav ? (
    <FontAwesomeIcon
      icon={solidHeart}
      className="heart solid-heart"
      onClick={handleFavClick}
    />
  ) : (
    <FontAwesomeIcon
      icon={outlineHeart}
      className="heart outline-heart"
      onClick={handleFavClick}
    />
  );

  const movieImage = (
    <img
      src={movieImgBasePath + movie.poster_path}
      alt={movie.title}
      className="movie"
    ></img>
  );

  //if we are in the movie detail page, display plain image else make image redirect-able
  const moviePoster = useLocation().pathname.includes('movie-details') ? (
    movieImage
  ) : (
    <Link to={`/movie-details/${movie.id}`}>{movieImage}</Link>
  );

  return (
    <div className="movie-thumbnail">
      {favIcon}
      {moviePoster}
    </div>
  );
}

export default MovieThumbnail;
