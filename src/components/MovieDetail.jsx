import FavButton from './FavButton';
import { useDispatch } from 'react-redux';
import { addFav, deleteFav } from '../features/favs/favsSlice';
import MovieThumbnail from './MovieThumbnail';

function MovieDetail({ movie }) {
  return (
    <div className="movie-detail">
      <div className="movie-detail-panel">
        <MovieThumbnail key={movie.id} movie={movie} />
        <div className="movie-description">
          <p>{movie.title}</p>
          <p>{movie.vote_average}</p>
          <p>{movie.release_date}</p>
          <p>{movie.genre_ids}</p>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
