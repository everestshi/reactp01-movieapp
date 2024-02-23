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
    <>
      <div className="movie-detail-panel">
        {movieImage}
        <div className="movie-description">
          <h3 className="movie-detail-title">{movieDetailObj.title}</h3>
          <p>Rating: {(movieDetailObj.vote_average.toFixed(1))}/10</p>
          <p>Release Date: {movieDetailObj.release_date}</p>
          <p>{genreNames}</p>
          <p>{movieDetailObj.overview}</p>
        </div>
      </div>
    </>
  );
}

export default MovieDetail;
