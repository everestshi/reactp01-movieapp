import MovieThumbnail from './MovieThumbnail';

function MovieDetail({ movieDetailObj }) {
  const genreNames = movieDetailObj.genres
    .map((genre) => genre.name)
    .join(', ');

  return (
    <div className="movie-detail">
      <div className="movie-detail-panel">
        <MovieThumbnail
          key={movieDetailObj.id}
          movieObj={movieDetailObj}
          allowRedirect={false}
        />
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
