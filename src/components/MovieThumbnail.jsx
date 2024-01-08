import { useDispatch } from 'react-redux';
import { addFav, deleteFav } from '../features/favs/favsSlice';

import { movieImgBasePath } from '../globals/globalVariables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as outlineHeart } from '@fortawesome/free-regular-svg-icons';

function MovieThumbnail({ movie, isFav }) {
  const dispatch = useDispatch();

  const handleFavClick = (isFav) => {
    if (isFav === true) {
      dispatch(deleteFav(movie));
    } else {
      dispatch(addFav(movie));
    }
  };

  const favIcon = isFav ? (
    <FontAwesomeIcon
      icon={solidHeart}
      className="solid-heart"
      size="2x"
      onClick={handleFavClick}
    />
  ) : (
    <FontAwesomeIcon
      icon={outlineHeart}
      className="outline-heart"
      size="2x"
      onClick={handleFavClick}
    />
  );

  return (
    <div className="movie-thumbnail">
      {favIcon}
      <img
        src={movieImgBasePath + movie.poster_path}
        alt={movie.title}
        className="movie"
      ></img>
    </div>
  );
}

MovieThumbnail.defaultProps = {
  isFav: false
};

export default MovieThumbnail;
