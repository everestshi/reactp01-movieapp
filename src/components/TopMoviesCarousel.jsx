import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay as outlinePlay } from "@fortawesome/free-regular-svg-icons";
import { fetchTrailerUrl } from "../data/tmdb-data"; // Import the fetchTrailerUrl function
import TrailerModal from "../components/TrailerModal"; // Import the TrailerModal component
import FavButton from "../components/FavButton"; // Import the FavButton component
import WatchlistButton from "../components/WatchlistButton"; // Import the WatchlistButton component


function TopMoviesCarousel({ movies }) {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
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

  const getTrailer = async (movieId) => {
    const url = await fetchTrailerUrl(movieId);
    setTrailerUrl(url);
  };

  const handlePlayTrailer = async (index) => {
    await getTrailer(movies[index].id);
    setShowModal(true);
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
          <div
            key={movieObj.id}
            className={`movie-slide ${
              index === currentMovieIndex ? "active" : ""
            }`}
          >
            <img src={movieObj.bannerUrl} alt={movieObj.title} />
            <div className="movie-overlay">
              <div className="movie-info">
                <h2>{movieObj.title}</h2>
                <p>{movieObj.overview}</p>
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
                    <button className="more-info-btn-carousel">More Info</button>
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
        ))}
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
