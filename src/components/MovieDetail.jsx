import FavButton from './FavButton';
import { useDispatch } from 'react-redux';
import { addFav, deleteFav } from '../features/favs/favsSlice';
import MoviePanel from '../components/MoviePanel';

function MovieDetail({ movieObj, isFav }) {
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
      <MoviePanel key={movieObj.id} movie={movieObj} isFav={isFav} />
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

export default MovieDetail;
