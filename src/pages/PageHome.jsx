import { useEffect, useState } from "react";
import { appTitle } from "../globals/globalVariables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlay as outlinePlay } from "@fortawesome/free-regular-svg-icons";
import { faCirclePlay as solidPlay } from "@fortawesome/free-solid-svg-icons";
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
  searchMovies,
  fetchMovieGenres,
  fetchTrailerUrl,
  fetchBannerUrl,
} from "../data/tmdb-data";
import MovieThumbnail from "../components/MovieThumbnail";
import TrailerModal from "../components/TrailerModal";
import TopMoviesCarousel from "../components/TopMoviesCarousel";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

function PageHome() {
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayCount, setDisplayCount] = useState(12);
  const [totalMoviesCount, setTotalMoviesCount] = useState(0);
  const [previousCategory, setPreviousCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");
  const categories = ["popular", "topRated", "nowPlaying", "upcoming"];
  const [remainingCategories, setRemainingCategories] = useState([]);
  const [sliders, setSliders] = useState({});

  //const [selectedYear, setSelectedYear] = useState("2022");

  //const years = ["2023", "2022", "2021", "2020", "2019"]; // Example years, populate as needed

  document.title = `${appTitle} - Home`;

  useEffect(() => {
    const getMovies = async () => {
      let moviesToFetch = [];
      let fetchedMovies = [];

      if (searchQuery) {
        fetchedMovies = await searchMovies(searchQuery);
        setTotalMoviesCount(fetchedMovies.length);
        moviesToFetch = fetchedMovies.slice(0, displayCount);
      } else {
        if (selectedCategory === "popular") {
          fetchedMovies = await fetchPopularMovies();
        } else if (selectedCategory === "topRated") {
          fetchedMovies = await fetchTopRatedMovies();
        } else if (selectedCategory === "nowPlaying") {
          fetchedMovies = await fetchNowPlayingMovies();
        } else if (selectedCategory === "upcoming") {
          fetchedMovies = await fetchUpcomingMovies();
        }
        setTotalMoviesCount(fetchedMovies.length);
        moviesToFetch = fetchedMovies.slice(0, displayCount);
      }

      if (selectedCategory !== previousCategory) {
        // Reset movies back to 12 when the category changes
        setDisplayCount(12);
        moviesToFetch = moviesToFetch.slice(0, displayCount);
        setPreviousCategory(selectedCategory); // Update the previous category
      }

      // Fetch banner URLs for each movie
      const moviesWithBanners = await Promise.all(
        moviesToFetch.map(async (movie) => {
          const bannerUrl = await fetchBannerUrl(movie.id);
          return { ...movie, bannerUrl };
        })
      );

      setMovies(moviesWithBanners);
    };

    getMovies();
  }, [selectedCategory, searchQuery, displayCount, previousCategory]);

  useEffect(() => {
    const remaining = categories.filter(
      (category) => category !== selectedCategory
    );
    setRemainingCategories(remaining);
  }, [selectedCategory]);

  useEffect(() => {
    const generateSliders = async () => {
      const slidersData = {};
      for (const category of remainingCategories) {
        let movies = [];
        switch (category) {
          case "popular":
            movies = await fetchPopularMovies();
            break;
          case "topRated":
            movies = await fetchTopRatedMovies();
            break;
          case "nowPlaying":
            movies = await fetchNowPlayingMovies();
            break;
          case "upcoming":
            movies = await fetchUpcomingMovies();
            break;
          default:
            break;
        }
        slidersData[category] = movies;
      }
      setSliders(slidersData);
    };

    generateSliders();
  }, [remainingCategories]);

  const handleDisplayMore = () => {
    // Increment the display count to show more movies
    setDisplayCount(displayCount + 12);
  };

  const displayMoreButton =
    totalMoviesCount > displayCount ? (
      <div className="centered">
        <button onClick={handleDisplayMore} className="display-more-btn">
          Display More
        </button>
      </div>
    ) : null;

  const categoryDropDownMenu = (
    <div className="filters">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="popular">Popular</option>
        <option value="topRated">Top Rated</option>
        <option value="nowPlaying">Now Playing</option>
        <option value="upcoming">Upcoming</option>
      </select>
    </div>
  );

  const movieList = (
    <div className="responsive-movies-grid">
      {movies.map((movieObj) => (
        <div key={movieObj.id} className="movie-card">
          <MovieThumbnail movieObj={movieObj} />
        </div>
      ))}
    </div>
  );

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <FontAwesomeIcon
        icon={faAngleLeft}
        onClick={onClick}
        className="slider-arrow prev"
      />
    );
  }
  function NextArrow(props) {
    const { onClick } = props;
    return (
      <FontAwesomeIcon
        icon={faAngleRight}
        onClick={onClick}
        className="slider-arrow next"
      />
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Function to format category names with separate words and capitalize first letter of every word
  const formatCategoryName = (category) => {
    return category
      .split(/(?=[A-Z])/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <main>
      <section>
        <div className="top-movies-carousel">
          <TopMoviesCarousel movies={movies} />
        </div>
        <div className="search-dropdown-container">
          <h2 className="homepage-category-name">
            {formatCategoryName(selectedCategory)}
          </h2>
          {categoryDropDownMenu}
        </div>
        {movieList}
        {displayMoreButton}
        <TrailerModal
          trailerUrl={trailerUrl}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </section>
      <section className="homepage-sliders">
        {Object.keys(sliders).map((category) => (
          <div key={category}>
            <h2 className="homepage-category-name">
              {formatCategoryName(category)}
            </h2>
            <Slider {...settings}>
              {sliders[category].map((movie) => (
                <div key={movie.id} className="movie-card">
                  <MovieThumbnail movieObj={movie} />
                </div>
              ))}
            </Slider>
          </div>
        ))}
      </section>
    </main>
  );
}

export default PageHome;
