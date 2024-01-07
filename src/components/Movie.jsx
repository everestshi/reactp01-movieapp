// Movie.jsx

import React from "react";
import { Link } from "react-router-dom";
import FavButton from "../components/FavButton";
import { useDispatch } from "react-redux";
import { addFav, deleteFav } from "../features/favs/favsSlice";

const imageFolderPath = "/assets/images/";

function Movie({ movieObj, profileLink, isFav }) {
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
          src={`https://image.tmdb.org/t/p/w200${movieObj.poster_path}`}
          alt={movieObj.title}
        />
      </div>
      <div className="title-and-details">
        <p>
          {movieObj.title}
        </p>
        <p>
          {movieObj.vote_average}
        </p>
        <p>
          {movieObj.release_date}
        </p>
        <p>
          {movieObj.genre_ids}
        </p>
        <p>
          {movieObj.overview}
        </p>
      </div>
      {profileLink && (
        <div className="link-details">
          <Link
            to={{
              pathname: `/movie-details/${movieObj.id}`,
              state: { movieObj },
            }}
          >
            View Details
          </Link>
        </div>
      )}
      <div className="btn-favourite">
        {isFav ? (
          <FavButton
          characterObj={movieObj}
            remove={true}
            handleFavClick={handleFavClick}
          />
        ) : (
          <FavButton
          characterObj={movieObj}
            handleFavClick={handleFavClick}
          />
        )}
      </div>
    </div>
  );
}

Movie.defaultProps = {
  profileLink: true,
};

export default Movie;
