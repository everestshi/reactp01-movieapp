import FavButton from './FavButton';
import { useDispatch } from 'react-redux';
import { addFav, deleteFav } from '../features/favs/favsSlice';
import { movieImgBasePath } from '../globals/globalVariables';

const imageFolderPath = '/assets/images/';

function Movie({ movieObj, isFav }) {
  const dispatch = useDispatch();

  function handleFavClick(addToFav, obj) {
    if (addToFav === true) {
      dispatch(addFav(obj));
    } else {
      dispatch(deleteFav(obj));
    }
  }

  return (
    <div className="movie">
      {isFav && (
        <div className="heart">
          <img src={`${imageFolderPath}heart.png`} alt="Heart" />
        </div>
      )}
      <div className="poster">
        <img
          src={movieImgBasePath + movieObj.poster_path}
          alt={movieObj.title}
        />
      </div>
      <div className="title-and-details">
        <p>{movieObj.title}</p>
        <p>{movieObj.vote_average}</p>
        <p>{movieObj.release_date}</p>
        <p>{movieObj.genre_ids}</p>
        <p>{movieObj.overview}</p>
      </div>
      <div className="btn-favourite">
        {isFav ? (
          <FavButton
            characterObj={movieObj}
            remove={true}
            handleFavClick={handleFavClick}
          />
        ) : (
          <FavButton characterObj={movieObj} handleFavClick={handleFavClick} />
        )}
      </div>
    </div>
  );
}

export default Movie;
