import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { movieImgBasePath } from "../globals/globalVariables";
import { fetchMovieGenres, fetchTrailerUrl } from "../data/tmdb-data";
import FavButton from "./FavButton";
import WatchlistButton from "./WatchlistButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay as outlinePlay } from "@fortawesome/free-regular-svg-icons";
import TrailerModal from "./TrailerModal";

function MovieThumbnail({ movieObj }) {
  const favs = useSelector((state) => state.favs.items);
  const watchlists = useSelector((state) => state.watchlist.items);

  const isFav = favs.some((favMovie) => {
    return favMovie.id == movieObj.id;
  });

  const isOnWatchlist = watchlists.some((watchlistMovie) => {
    return watchlistMovie.id == movieObj.id;
  });

  const [genres, setGenres] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showModal, setShowModal] = useState(false);

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
    .join(", ");

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Function to truncate excerpt if it's too long
  const truncateOverview = (overview, maxLength) => {
    return overview.length > maxLength
      ? overview.substring(0, maxLength) + "..."
      : overview;
  };

  const movieImage = (
    <img
      src={movieImgBasePath + movieObj.poster_path}
      alt={movieObj.title}
      className="movie"
    ></img>
  );

  // If we are in the movie detail page, display plain image else make image redirect-able
  const moviePoster = useLocation().pathname.includes("movie-details") ? (
    movieImage
  ) : (
    <Link to={`/movie-details/${movieObj.id}`}>{movieImage}</Link>
  );

  const getTrailer = async (movieId) => {
    if (movieId) {
      const url = await fetchTrailerUrl(movieId);
      setTrailerUrl(url);
    }
  };

  return (
    <div
      className="movie-thumbnail"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="thumbnail-image">
        <div className="poster-overlay">{moviePoster}</div>
        <p className={`thumbnail-image-title ${isHovered ? "hidden" : ""}`}>
          {movieObj.title}
        </p>
      </div>
      {isHovered && (
      <div className="thumbnail-overlay" style={{ backgroundImage: `url(${movieImgBasePath + movieObj.poster_path})`,backgroundSize: "cover",
      backgroundPosition: "center", }}>
      <div className="overlay-content">
            <div className="overlay-top">
              <h3>{movieObj.title}</h3>
              <p>Rating: {movieObj.vote_average}</p>
              <p>{genreNames}</p>
              <p className="overview">
                {truncateOverview(movieObj.overview, 150)}
              </p>
            </div>
            <div className="overlay-buttons">
              <FontAwesomeIcon
                icon={outlinePlay}
                className="circle-play-icon overlay-trailer-btn"
                onClick={async () => {
                  await getTrailer(movieObj.id);
                  setShowModal(true);
                }}
              />
              <FavButton movieObj={movieObj} isFav={isFav} />
              <WatchlistButton
                movieObj={movieObj}
                isOnWatchlist={isOnWatchlist}
              />
              <TrailerModal
                trailerUrl={trailerUrl}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieThumbnail;
