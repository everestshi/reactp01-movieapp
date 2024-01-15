import React, { useEffect, useState } from 'react';
import FavButton from './FavButton';
import WatchlistButton from './WatchlistButton';
import { useDispatch } from 'react-redux';
import MovieThumbnail from './MovieThumbnail';
import { fetchMovieGenres } from '../data/tmdb-data';

function MovieDetail({ movieObj }) {
  const dispatch = useDispatch();
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getMovieGenres = async () => {
      const fetchedGenres = await fetchMovieGenres();
      setGenres(fetchedGenres);
    };

    getMovieGenres();
  }, []);

  const genreNames = genres
    .filter((genre) => movieObj.genre_ids.includes(genre.id))
    .map((genre) => genre.name)
    .join(', ');

  function handleWatchlistClick(addToWatchlist, obj) {
    if (addToWatchlist === true) {
      dispatch(addWatchlistItem(obj));
    } else {
      dispatch(deleteWatchlistItem(obj));
    }
  }

  return (
    <div className="movie-detail">
      <div className="movie-detail-panel">
        <MovieThumbnail key={movieObj.id} movieObj={movieObj} />
        <div className="movie-description">
          <p>{movieObj.title}</p>
          <p>{movieObj.vote_average}</p>
          <p>{movieObj.release_date}</p>
          <p>{genreNames}</p>
          <p>{movieObj.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
