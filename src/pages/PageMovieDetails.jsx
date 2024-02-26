import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MovieDetail from "../components/MovieDetail";
import ThumbnailCarousel from "../components/ThumbnailCarousel";
import { appTitle } from "../globals/globalVariables";
import {
  fetchMovie,
  fetchTrailerUrl,
  fetchBannerUrl,
  fetchRecommendedMovies,
} from "../data/tmdb-data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCirclePlay as outlinePlay } from "@fortawesome/free-regular-svg-icons";

function PageMovieDetails() {
  const { id } = useParams();
  const [movieDetailObj, setMovieDetailObj] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [playTrailer, setPlayTrailer] = useState(false);
  const [recommendedMovies, setRecommendedMovies] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      const movie = await fetchMovie(id); // Fetch movie data
      setMovieDetailObj(movie);
    };

    const getTrailerUrl = async (id) => {
      const url = await fetchTrailerUrl(id);
      setTrailerUrl(url);
    };

    const getBannerUrl = async (id) => {
      const url = await fetchBannerUrl(id);
      setBannerUrl(url);
    };

    const getRecommendedMovies = async () => {
      const movies = await fetchRecommendedMovies(id);
      setRecommendedMovies(movies);
    };

    getRecommendedMovies();
    getMovie();
    getTrailerUrl(id);
    getBannerUrl(id);
  }, [id]);

  const getTrailerComponent = () => {
    if (playTrailer && trailerUrl) {
      return (
        <div className="video-container">
          <iframe
            className="detail-page-trailer"
            src={trailerUrl}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <button
            className="btn"
            onClick={() => {
              setPlayTrailer(false);
            }}
          >
            Close
          </button>
        </div>
      );
    } else if (bannerUrl) {
      return (
        <div className={"banner-container"}>
          <img className={"banner"} src={bannerUrl} />
          <FontAwesomeIcon
            icon={outlinePlay}
            className="circle-play-icon"
            onClick={() => {
              setPlayTrailer(true);
            }}
          />
        </div>
      );
    } else {
      return "";
    }
  };

  return (
    <main>
      <div className={`banner-section ${playTrailer ? "play-trailer" : ""}`}>
        {getTrailerComponent()}
      </div>

      <section id="movie-detail-section">
        <h2>Movie Details</h2>
        {!movieDetailObj ? (
          <p>
            Movie not found. <Link to="/">Return to home page</Link>.
          </p>
        ) : (
          <>
            <MovieDetail movieDetailObj={movieDetailObj} />
          </>
        )}
      </section>
      <section>
        <h2>Recomended Movies:</h2>
        <div className="recommended-carousel">
          <ThumbnailCarousel movieObjList={recommendedMovies} />
        </div>
      </section>
    </main>
  );
}

export default PageMovieDetails;
