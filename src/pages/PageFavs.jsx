import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieDetail from '../components/MovieDetail';
import { appTitle } from '../globals/globalVariables';
import { useSelector } from 'react-redux';

function PageFavs() {
  const favs = useSelector((state) => state.favs.items);

  useEffect(() => {
    document.title = `${appTitle} - Favourite Movies`;
  }, []);

  return (
    <main>
      <section>
        <h2>Favourite Movies</h2>
        {favs.length < 1 ? (
          <p>
            No favourite movies. Return to the <Link to="/">home</Link> page to
            add some favourite movies.
          </p>
        ) : (
          <div className="movie-grid">
            {favs.map((movie) => {
              return (
                <MovieDetail key={movie.id} movieObj={movie} isFav={true} />
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default PageFavs;
