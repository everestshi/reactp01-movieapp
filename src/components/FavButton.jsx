import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as outlineHeart } from '@fortawesome/free-regular-svg-icons';
import { addFav, deleteFav } from '../features/favs/favsSlice';

function FavButton({ movieObj, isFav }) {
  const dispatch = useDispatch();

  const handleFavClick = () => {
    if (isFav === true) {
      dispatch(deleteFav(movieObj));
    } else {
      dispatch(addFav(movieObj));
    }
  };

  const favBtn = isFav ? (
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

  return <>{favBtn}</>;
}

FavButton.defaultProps = {
  remove: false
};

export default FavButton;
