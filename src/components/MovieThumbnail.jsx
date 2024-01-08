import { movieImgBasePath, imageFolderPath } from '../globals/globalVariables';

function MovieThumbnail({ movie, isFav, isOnWatchlist }) {
  const favIcon = isFav ? (
    <img src={`${imageFolderPath}heart.png`} alt="Heart" className="heart" />
  ) : null;

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
  isFav: false,
  isOnWatchlist: false
};

export default MovieThumbnail;
