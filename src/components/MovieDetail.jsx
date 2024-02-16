import MovieThumbnail from './MovieThumbnail';
import { movieImgBasePath } from '../globals/globalVariables';

function MovieDetail({ movieDetailObj }) {
  const genreNames = movieDetailObj.genres
    .map((genre) => genre.name)
    .join(', ');

  const movieImage = (
    <img
      src={movieImgBasePath + movieDetailObj.poster_path}
      alt={movieDetailObj.title}
      className="movie"
    ></img>
  );

  return (
    <div className="movie-detail">
      <div className="movie-detail-panel">
        {movieImage}
        <div className="movie-description">
          <p>{movieDetailObj.title}</p>
          <p>{movieDetailObj.vote_average}</p>
          <p>{movieDetailObj.release_date}</p>
          <p>{genreNames}</p>
          <p>{movieDetailObj.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
