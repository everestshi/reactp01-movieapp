import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { movieImgBasePath } from '../globals/globalVariables';
import FavButton from './FavButton';
import WatchlistButton from './WatchlistButton';

function MovieThumbnail({ movieObj }) {
  const favs = useSelector((state) => state.favs.items);
  const watchlists = useSelector((state) => state.watchlist.items);

  const isFav = favs.some((favMovie) => {
    return favMovie.id == movieObj.id;
  });

  const isOnWatchlist = watchlists.some((watchlistMovie) => {
    return watchlistMovie.id == movieObj.id;
  });

  const movieImage = (
    <img
      src={movieImgBasePath + movieObj.poster_path}
      alt={movieObj.title}
      className="movie"
    ></img>
  );

  //if we are in the movie detail page, display plain image else make image redirect-able
  const moviePoster = useLocation().pathname.includes('movie-details') ? (
    movieImage
  ) : (
    <Link to={`/movie-details/${movieObj.id}`}>{movieImage}</Link>
  );

  return (
    <div className="movie-thumbnail">
      <div className="thumbnail-btns">
        {<FavButton movieObj={movieObj} isFav={isFav} />}
        {<WatchlistButton movieObj={movieObj} isOnWatchlist={isOnWatchlist} />}
      </div>
      {moviePoster}
    </div>
  );
}

export default MovieThumbnail;
