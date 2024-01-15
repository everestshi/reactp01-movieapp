import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieThumbnail from '../components/MovieThumbnail';
import { appTitle } from '../globals/globalVariables';
import { useSelector } from 'react-redux';

function PageWatchlist() {
  const watchlistItems = useSelector((state) => state.watchlist.items);

  useEffect(() => {
    document.title = `${appTitle} - Watchlist`;
  }, []);

  return (
    <main>
      <section>
        <h2>Watchlist</h2>
        {watchlistItems.length < 1 ? (
          <p>
            No movies have been added to the watchlist. Return to the{' '}
            <Link to="/">home</Link> page to add some movies.
          </p>
        ) : (
          <div className="movies-grid">
            {watchlistItems.map((movieObj) => {
              return <MovieThumbnail key={movieObj.id} movieObj={movieObj} />;
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default PageWatchlist;
