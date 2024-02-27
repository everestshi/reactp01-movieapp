import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay as outlinePlay } from "@fortawesome/free-regular-svg-icons";
import { fetchTrailerUrl, fetchMovieGenres } from "../data/tmdb-data"; // Import the fetchTrailerUrl function
import TrailerModal from "../components/TrailerModal"; // Import the TrailerModal component
import FavButton from "../components/FavButton"; // Import the FavButton component
import WatchlistButton from "../components/WatchlistButton"; // Import the WatchlistButton component

function TopMoviesCarousel({ movies }) {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [useMovieImage, setUseMovieImage] = useState(false);
  const [genres, setGenres] = useState([]);
  const sliderRef = useRef(null);

  const favs = useSelector((state) => state.favs.items);
  const watchlists = useSelector((state) => state.watchlist.items);

  const isFav = (movieId) => {
    return favs.some((favMovie) => favMovie.id === movieId);
  };

  const isOnWatchlist = (movieId) => {
    return watchlists.some((watchlistMovie) => watchlistMovie.id === movieId);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        const newIndex = sliderRef.current.innerSlider.state.currentSlide + 1;
        sliderRef.current.slickGoTo(newIndex);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setUseMovieImage(window.innerWidth <= 786);
    };

    // Call handleResize initially and add event listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const genresData = await fetchMovieGenres();
        setGenres(genresData);
      } catch (error) {
        console.error("Error fetching movie genres:", error);
      }
    };

    fetchData();
  }, []);

  const getTrailer = async (movieId) => {
    const url = await fetchTrailerUrl(movieId);
    setTrailerUrl(url);
  };

  const handlePlayTrailer = async (index) => {
    await getTrailer(movies[index].id);
    setShowModal(true);
  };

  const truncateOverview = (overview, maxLength) => {
    return overview.length > maxLength
      ? overview.substring(0, maxLength) + "..."
      : overview;
  };

  const genreNames = (movieDetailObj) => {
    if (!genres || genres.length === 0) return "";
    const movieGenres = movieDetailObj.genre_ids.map((genreId) =>
      genres.find((genre) => genre.id === genreId)
    );
    return movieGenres.map((genre) => genre.name).join(" | ");
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    pauseOnHover: true,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentMovieIndex(newIndex);
    },
  };

  return (
    <>
      <Slider {...settings}>
        {movies.map((movieObj, index) => (
          // Check if the movie has a banner before rendering it
    movieObj.bannerUrl && (
          <div
            key={movieObj.id}
            className={`movie-slide ${
              index === currentMovieIndex ? "active" : ""
            }`}
          >
            {useMovieImage ? (
              <img
                src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                alt={movieObj.title}
                className="movie"
              />
            ) : (
              <img
                src={movieObj.bannerUrl}
                alt={movieObj.title}
                className="movie"
              />
            )}{" "}
            <div className="movie-overlay">
              <div className="movie-info">
                <h2>{movieObj.title}</h2>
                <p className="carousel-movie-genres">{genreNames(movieObj)}</p>
                <p className="carousel-movie-overview">
                  {truncateOverview(movieObj.overview, 200)}
                </p>
                <div className="buttons">
                  <button
                    className="watch-trailer-btn-carousel"
                    onClick={() => handlePlayTrailer(index)}
                  >
                    <FontAwesomeIcon
                      icon={outlinePlay}
                      className="circle-play-icon"
                    />
                    <span>Play Trailer</span>
                  </button>
                  <Link to={`/movie-details/${movieObj.id}`}>
                    <button className="more-info-btn-carousel">
                      More Info
                    </button>
                  </Link>
                  <FavButton movieObj={movieObj} isFav={isFav(movieObj.id)} />
                  <WatchlistButton
                    movieObj={movieObj}
                    isOnWatchlist={isOnWatchlist(movieObj.id)}
                  />
                </div>
              </div>
            </div>
          </div>
        )))}
      </Slider>
      <TrailerModal
        trailerUrl={trailerUrl}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
}

export default TopMoviesCarousel;
