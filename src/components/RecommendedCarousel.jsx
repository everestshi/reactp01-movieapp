import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { fetchRecommendedMovies } from '../data/tmdb-data';
import MovieThumbnail from './MovieThumbnail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

export default function RecommendedCarousel({ movieId }) {
  const [recommendedMovies, setRecommendedMovies] = useState(null);

  useEffect(() => {
    const getRecommendedMovies = async () => {
      const movies = await fetchRecommendedMovies(movieId);

      setRecommendedMovies(movies);
    };

    getRecommendedMovies();
  }, []);

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <FontAwesomeIcon
        icon={faAngleRight}
        className={className}
        style={{ ...style }}
        onClick={onClick}
      />
    );
  }
  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <FontAwesomeIcon
        icon={faAngleRight}
        onClick={onClick}
        className="next-arrow"
      />
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 8,
    initialSlide: 0,
    // prevArrow: <PrevArrow />,
    // nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 7
        }
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Slider {...settings} className="recommended-carousel">
      {!recommendedMovies
        ? null
        : recommendedMovies.map((movie) => {
            return <MovieThumbnail key={movie.id} movieObj={movie} />;
          })}
    </Slider>
  );
}
