import { Link } from 'react-router-dom';
import { movieImgBasePath, imageFolderPath } from '../globals/globalVariables';

function MoviePanel({ movie, isFav }) {
  const favIcon = isFav ? (
    <img src={`${imageFolderPath}heart.png`} alt="Heart" className="heart" />
  ) : null;

  return (
    <Link
      key={`${movie.id}`}
      to={`/movie-details/${movie.id}`}
      className="movie-panel"
    >
      {favIcon}
      <img src={movieImgBasePath + movie.poster_path} alt={movie.title}></img>
    </Link>
  );
}

MoviePanel.defaultProps = {
  isFav: false
};

export default MoviePanel;
